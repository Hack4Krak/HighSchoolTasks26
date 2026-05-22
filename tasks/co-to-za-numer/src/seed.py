import os
import sqlite3
import subprocess
from concurrent.futures import ThreadPoolExecutor

import yt_dlp
from dotenv import load_dotenv

load_dotenv()

PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLcs0VN1OfDczn9yilG5WfpgYe_ykIWsZM"

AUDIO_DIR = "audio"
DB = "songs.db"

os.makedirs(AUDIO_DIR, exist_ok=True)


def db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = db()

    conn.execute("""
    CREATE TABLE IF NOT EXISTS songs (
        day INTEGER PRIMARY KEY,
        title TEXT NOT NULL
    )
    """)

    conn.commit()
    conn.close()


def insert_song(day, title):
    conn = db()

    conn.execute(
        """
        INSERT OR REPLACE INTO songs (day, title)
        VALUES (?, ?)
    """,
        (day, title),
    )

    conn.commit()
    conn.close()


def fetch_playlist(url):
    with yt_dlp.YoutubeDL({"extract_flat": True, "quiet": True}) as ydl:
        data = ydl.extract_info(url, download=False)
        return [e for e in data["entries"] if e]


def is_done(day):
    return os.path.exists(f"{AUDIO_DIR}/{day}.mp3")


def download_clip(video_id, day):
    if is_done(day):
        print(f"[SKIP AUDIO] {day}")
        return

    url = f"https://www.youtube.com/watch?v={video_id}"

    full_mp3 = f"{AUDIO_DIR}/full_{day}.mp3"
    clip_mp3 = f"{AUDIO_DIR}/{day}.mp3"

    try:
        subprocess.run(["yt-dlp", "-x", "--audio-format", "mp3", "-o", full_mp3, url], check=True)

        subprocess.run(["ffmpeg", "-y", "-i", full_mp3, "-ss", "00:00:00", "-t", "16", clip_mp3], check=True)

    finally:
        if os.path.exists(full_mp3):
            os.remove(full_mp3)


def process_song(item):
    day, video_id, title = item

    print(f"[{day}] {title}")

    insert_song(day, title)
    download_clip(video_id, day)


def main():
    init_db()

    entries = fetch_playlist(PLAYLIST_URL)
    total = len(entries)

    print(f"Playlist size: {total}")

    tasks = []

    for i, e in enumerate(entries, start=1):
        video_id = e["id"]
        title = e.get("title", f"song_{i}")

        tasks.append((i, video_id, title))

    with ThreadPoolExecutor(max_workers=10) as executor:
        executor.map(process_song, tasks)

    verify_integrity(total)


def verify_integrity(total):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM songs")
    db_count = cur.fetchone()[0]

    cur.execute("SELECT day FROM songs ORDER BY day")
    days = [row[0] for row in cur.fetchall()]

    conn.close()

    files = []
    for i in range(1, total + 1):
        if os.path.exists(f"{AUDIO_DIR}/{i}.mp3"):
            files.append(i)

    missing_db = set(range(1, total + 1)) - set(days)
    missing_audio = set(range(1, total + 1)) - set(files)

    print("\nINTEGRITY REPORT")
    print(f"DB songs: {db_count}/{total}")
    print(f"Audio files: {len(files)}/{total}")

    if missing_db:
        print(f"[DB MISSING] {sorted(missing_db)}")

    if missing_audio:
        print(f"[AUDIO MISSING] {sorted(missing_audio)}")

    if db_count == total and len(files) == total:
        print("OK: dataset complete")
        return True

    print("INCOMPLETE DATASET")
    return False


if __name__ == "__main__":
    main()
