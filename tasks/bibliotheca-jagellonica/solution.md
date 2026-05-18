# Bibliotheca Jagellonica - rozwiazanie

## Opis

Zadanie udaje nieskonczona biblioteke w duchu Borgesa. Pierwsze etapy sa krotkimi manuskryptami `.txt`, ktore ucza gracza, ze katalog nie pokazuje wszystkiego, a tekst trzeba czytac jako palimpsest.

Kluczowy mechanizm: `lorem.txt` ujawnia dwa odsylacze jednoczesnie — jeden do kontynuacji (`pi.txt`), drugi do zapieczetowanej notatki (`cipher.txt`). Klucz do odczytu (`BABEL`) jest zawarty w tym samym manuskrypcie.

`Range` jest mechanika finalna. Dopiero ostatnia ksiega deklaruje 37 TB i wymaga czytania malych fragmentow.

## Etap 1: prolog i Verulam

W katalogu widac `prolog.txt` oraz `buffalo.txt`. Prolog wspomina Buffalo i kanclerza z Verulamu. Verulam prowadzi do Francisa Bacona, a wiec do szyfru Bacona.

W `buffalo.txt` nalezy patrzec na warianty zapisu slow `Buffalo` i `buffalo`. Wielka litera odpowiada wariantowi `B`, mala litera wariantowi `A`. Po odczytaniu szyfru Bacona dostajemy:

```text
LOREM
```

To wskazuje ukryta ksiege w tym samym woluminie:

```text
/library/0123456789abcdef0123456789abcdef/wall/2/shelf/4/volume/17/book/lorem.txt
```

## Etap 2: palimpsest lorem — dwie sciezki

`lorem.txt` zawiera kanon oraz odpis. Porownujemy oba akapity. Roznice miedzy kanonem a odpisem daja:

```text
QI
```

Ten sam manuskrypt wspomina Babel jako klucz. Odszyfrowujemy `QI` Vigenere'em z kluczem `BABEL` i otrzymujemy:

```text
PI
```

To wskazuje pierwsza ukryta ksiege:

```text
/library/0123456789abcdef0123456789abcdef/wall/2/shelf/4/volume/17/book/pi.txt
```

Na marginesie `lorem.txt` widnieje rowniez bezposredni odsylacz do zapieczetowanej notatki:

```text
/library/0ddba11ad0ddba11ad0ddba11ad0ddba11ad/wall/1/shelf/2/volume/9/book/cipher.txt
```

## Etap 3: tablica pi i ksiega wedrowna

`pi.txt` wyglada jak dlugi zapis cyfr pi. Niektore znaki nie sa jednak cyframi. Wyciagniecie znakow spoza alfabetu dziesietnego z bloku liczby daje:

```text
POLYGLOTLINGUAROMAE
```

Czytamy to jako:

```text
POLYGLOT; LINGUA ROMAE
```

Nastepna ksiega to `polyglot.txt`, a jej odpowiedz ma byc w jezyku Rzymu. W HTTP naturalnym miejscem na preferowany jezyk odpowiedzi jest naglowek `Accept-Language`:

```bash
curl -H 'Accept-Language: la' 'https://bibliotheca-jagellonica.hack4krak.pl/library/0123456789abcdef0123456789abcdef/wall/2/shelf/4/volume/17/book/polyglot.txt'
```

Pojawia sie sciezka do `headers.txt`.

## Etap 4: karta bez tresci widzialnej

`headers.txt` mowi, ze odsylacz widzi tylko poslaniec niosacy odpowiedz. Trzeba sprawdzic naglowki HTTP:

```bash
curl -I 'https://bibliotheca-jagellonica.hack4krak.pl/library/0123456789abcdef0123456789abcdef/wall/2/shelf/4/volume/17/book/headers.txt'
```

Naglowek `Link` wskazuje bezposrednio finalna ksiege:

```text
/library/ffffffffffffffffffffffffffffffff/wall/4/shelf/5/volume/32/book/umbra.txt
```

## Etap 5: odszyfrowanie cipher.txt

Gracz wraca do `cipher.txt` z etapu 2. `lorem.txt` powiedzial, ze "Babel jest kluczem do obcego alfabetu", a `cipher.txt` mowi "zdejmij metaliczny atrament" (hex) i ze klucz jest wspolny z tym, ktory otwieral obcy alfabet.

Dekodowanie:

1. Hex zamieniamy na bajty.
2. XOR z powtarzajacym sie kluczem `babel`.

Otrzymujemy:

```text
FINAL /library/ffffffffffffffffffffffffffffffff/wall/4/shelf/5/volume/32/book/umbra.txt ; sufiks 512 ; potem czytaj karty z konca: BABEL 13371337:13, E 27182818:10, PI 31415926:9, FI 16180339:11, KRAKOW 42424242:13.
```

## Etap 6: ksiega 37 TB

To pierwszy moment, w ktorym potrzebny jest HTTP `Range`. Finalna ksiega deklaruje 37 TB i odmawia pelnego pobrania. Czytamy tylko koncowke:

```bash
curl -H 'Range: bytes=-512' 'https://bibliotheca-jagellonica.hack4krak.pl/library/ffffffffffffffffffffffffffffffff/wall/4/shelf/5/volume/32/book/umbra.txt'
```

Karta krancowa potwierdza format `POCZATEK:DLUGOSC`:

```text
BABEL 13371337:13
E 27182818:10
PI 31415926:9
FI 16180339:11
KRAKOW 42424242:13
```

Zamieniamy je na zakresy bajtow:

```text
13371337-13371349
27182818-27182827
31415926-31415934
16180339-16180349
42424242-42424254
```

Po zlozeniu fragmentow dostajemy flage.

## Flaga

```text
hack4KrakCTF{c4t4l0gu5_in_umbra_ranges_non_legunt_totum}
```

## Ocena logicznosci

Kazdy etap ma co najmniej dwa tropy: jeden fabularny i jeden techniczny. Klucz `BABEL` pojawia sie juz w `lorem.txt` — ten sam manuskrypt, ktory odsyla do `cipher.txt`, co sprawia ze gracz ma wszystko czego potrzebuje w jednym miejscu. Zadanie jest trudne, ale nie wymaga zgadywania.
