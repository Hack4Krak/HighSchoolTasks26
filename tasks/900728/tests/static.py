from wave import open
from toolbox.utils.test_utils import load_flag_hash, validate_flag_hash
from pathlib import Path

task_path = Path(__file__).parent.parent
audio_path = task_path / "assets" / "900728.wav"

def test_flag_in_wav_file():
    audio = open(str(audio_path), "rb")
    frames = audio.readframes(audio.getnframes())

    bits = []


    for frame in frames:
        bits.append(str(frame & 1))

    textbits = ''.join(bits)

    text = ''.join(
        chr(int(textbits[i:i+8], 2))
        for i in range(0, len(textbits), 8)
    )
    flag = ""
    try:
        flag = text.split("hack4KrakCTF{")[1].split("}")[0]
    except:
        pytest.fail("flag Not Found")

    flag_hash = load_flag_hash(task_path)
    validate_flag_hash(flag, flag_hash)
