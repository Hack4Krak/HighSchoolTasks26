from wave import open

audio = open("../assets/900728.wav", "rb")
frames = audio.readframes(audio.getnframes())

bits = []


for frame in frames:
    bits.append(str(frame & 1))

textbits = "".join(bits)

text = "".join(chr(int(textbits[i : i + 8], 2)) for i in range(0, len(textbits), 8))


flag = text.split("hack4KrakCTF{")[1].split("}")[0]
print(flag)
