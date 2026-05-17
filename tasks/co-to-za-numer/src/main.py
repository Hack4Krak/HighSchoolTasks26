import sqlite3

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

DB = "songs.db"

app.mount("/audio", StaticFiles(directory="audio"), name="audio")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn


def get_song(day: int):
    conn = db()
    song = conn.execute("SELECT * FROM songs WHERE day = ?", (day,)).fetchone()
    conn.close()
    return song


@app.get("/api/health")
def root():
    return {"ok": True}


@app.get("/api/day/{day}")
def day(day: int):
    song = get_song(day)

    if not song:
        raise HTTPException(404, "not found")

    return {"day": day, "preview": f"/audio/{day}.mp3"}


@app.get("/api/search")
def search():
    conn = db()

    rows = conn.execute("""
        SELECT title
        FROM songs
        ORDER BY title ASC
    """).fetchall()

    result = [r["title"] for r in rows]

    conn.close()

    return result


@app.post("/api/guess")
def guess(payload: dict):
    day = payload["day"]
    guess = payload["guess"]

    song = get_song(day)

    if not song:
        raise HTTPException(404)

    return {"correct": guess == song["title"]}


# @app.get("/api/flag")
# def flag():
#     conn = db()
#
#     rows = conn.execute("""
#         SELECT title FROM songs ORDER BY day ASC
#     """).fetchall()
#
#     conn.close()
#
#     letters = [r["title"][0].upper() for r in rows]
#
#     return {
#         "flag": "".join(letters)
#     }
class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except HTTPException as ex:
            if ex.status_code == 404:
                if path.startswith("api/") or path.startswith("audio/"):
                    raise
                return await super().get_response("index.html", scope)
            raise


app.mount("/", SPAStaticFiles(directory="public", html=True), name="public")
