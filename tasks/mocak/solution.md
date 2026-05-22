## Opis

Zadanie polega na analizie pliku PNG. Obraz wygląda zwyczajnie, ale format PNG składa się z kolejnych bloków danych nazywanych chunkami. Każdy chunk ma długość, czterobajtowy typ, dane oraz sumę kontrolną CRC.

Po wypisaniu chunków z `mocak.png` widać standardowe wpisy takie jak `IHDR`, `IDAT` i `IEND`, ale pojawia się też niestandardowy chunk o nazwie `ctFa`. Sama nazwa wygląda podejrzanie, bo przypomina skrót od CTF i sugeruje, że może być powiązana z Hack4Krak CTF.

W metadanych tekstowych PNG można znaleźć wpis `restoration-key=...`. Wartość jest zakodowana Base64 i po zdekodowaniu daje klucz potrzebny do odzyskania danych ukrytych w chunku `ctFa`.

## Rozwiązanie

1. Sprawdzamy strukturę pliku PNG i listę chunków, np. własnym skryptem albo narzędziami do analizy PNG.
2. W metadanych tekstowych znajdujemy wpis `restoration-key=emFrb3BhbmVfcG9kX3J5bmtpZW0=`.
3. Dekodujemy wartość z Base64 i otrzymujemy klucz:

```text
zakopane_pod_rynkiem
```

4. W pliku znajduje się niestandardowy chunk `ctFa`. Jego dane zaczynają się od magicznej wartości `XOR1`.
5. Pozostałą część danych chunku odszyfrowujemy XOR-em z powtarzanym kluczem `zakopane_pod_rynkiem`.

Przykładowy minimalny dekoder:

```python
def xor_bytes(data: bytes, key: bytes) -> bytes:
    return bytes(byte ^ key[i % len(key)] for i, byte in enumerate(data))
```

Po odszyfrowaniu danych z `ctFa` otrzymujemy flagę:

```text
hack4KrakCTF{pN8_tR7ma_W1e3ej_ni9z_ObR4z8k}
```

## AI

Organizatorom nie udało się w pełni autonomicznie rozwiązać tego zadania przy użyciu GPT-5.5 na platformie chatgpt.com. 
Podejrzewam, że większa liczba prób oraz uruchomienie w Codexie mogłyby dać lepsze rezultaty — mam wrażenie, że upload plików może wpływać na metadane i pogarszać skuteczność. 

Modele mocno fiksowały się na red herringach, takich jak pozorne szyfry i obrazy na ścianach, zamiast skupić się na właściwym kierunku analizy.
