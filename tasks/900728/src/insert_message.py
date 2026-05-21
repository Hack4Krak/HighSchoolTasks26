from wave import open

message = "hack4KrakCTF{t4c0_0p4n0wal_h4ck4kr4k}"

bits = ''.join(format(ord(c), '08b') for c in message)

audio = open("../assets/900729.wav", "rb")

frames = bytearray(audio.readframes(audio.getnframes()))

offset = 1000000

if offset + len(bits) > len(frames):
    raise ValueError("Za mało miejsca w audio")

for i, bit in enumerate(bits):
    frames[i + offset] = (frames[i + offset] & 254) | int(bit)

out = open("../assets/900728.wav", "wb")
out.setparams(audio.getparams())
out.writeframes(frames)
out.close()
audio.close()