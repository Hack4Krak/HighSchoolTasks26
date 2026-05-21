## Opis
Zadanie to było typowym przykładem LSB (Least Significant Bit) steganografii, czyli ukrywania informacji w najmniej znaczących bitach danych. W tym przypadku, flaga została ukryta w pliku audio `900728.wav`.


## Rozwiązanie

```
from wave import open

audio = open("../assets/900728.wav", "rb")
frames = audio.readframes(audio.getnframes())

bits = []


for frame in frames:
    bits.append(str(frame & 1))

textbits = ''.join(bits)

text = ''.join(
    chr(int(textbits[i:i+8], 2))
    for i in range(0, len(textbits), 8)
)


flag = text.split("hack4KrakCTF{")[1].split("}")[0]
print(flag)
```

Program ten odczytuje dane z pliku audio, a następnie wyciąga najmniej znaczące bity z każdego bajtu danych. Następnie łączy te bity w ciąg tekstowy, który jest dzielony na znaki ASCII. Ostatecznie, program wyszukuje flagę w formacie `hack4KrakCTF{...}` i wypisuje jej zawartość.

flaga, którą otrzymujemy po uruchomieniu tego programu, to: `hack4KrakCTF{t4c0_0p4n0wal_h4ck4kr4k}`