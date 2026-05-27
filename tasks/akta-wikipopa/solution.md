## Opis

Ten task jest wieloetapowy, wykorzystuje zarówno metody kryptografii jak i reverse engineering.

Plik `WPA000002.pdf` zawiera wiadomość zaszyfrowaną przy użyciu szyfru podstawieniowego.

Archiwum `WielkiBrat.zip` zawiera aplikację WinForms skompilowaną dla platformy .NET, którą można stosunkowo łatwo zdekompilować i przeanalizować.

## Rozwiązanie

### Przygotowanie

Zapoznajemy sie z plikiem `ThePrawo.pdf` - dowiadujemy się, że przestępstwo może składać się z kilku czynów zabronionych jeżeli były wykonane w tym samym czasie, a długość kary możemy obliczyć programem `wielkiBrat.exe` natomiast nie jest on w stanie obliczyć przestępstwa składającego się z więcej niż 2 czynów zabronionych.

Dowiadujemy się również, że końcowa kara to iloczyn wszystkich przestępstw danej osoby

### `WPA000001.pdf`

PDF ten został ocenzurowany natomiast nie został spłaszczony co pozwala zwyczajnie skopiować treść tego dokumentu przekleić ją gdzie indziej i normalnie przeczytać.

Klikamy `ctrl + a` i `ctrl + c`, wklejamy treść i zapoznając się z nią wyciągamy id czynów zabronionych przestępstwa: 3 i 7 - liczymy lata programem `WielkiBrat.exe` i wychodzi nam 58936329 lat

### `WPA000002.pdf`

Odszyfrowujemy tekst pliku `WPA000002.pdf` za pomocą [analizy frekwencyjnej](https://en.wikipedia.org/wiki/Frequency_analysis)

Na podstawie częstości występowania znaków, powtarzalnych wzorców słów oraz kontekstu językowego (struktury zdań, nazw własnych i typowych wyrażeń urzędowych) odtworzono mapowanie alfabetu szyfrowego na litery języka polskiego.

Dzięki rekonstrukcji podstawień możliwe było stopniowe odszyfrowanie całego dokumentu oraz uzupełnienie brakujących fragmentów na podstawie kontekstu gramatycznego. Ostatecznie uzyskano pełną treść raportu sądowego dotyczącego działalności Wiktora Aleksandra Popiołka.

Z tekstu wynika, że sprawa dotyczy czynów zabronionych oznaczonych jako przestępstwo 1 i 2.

`WielkiBrat.exe`: 86304100 lat

### `WPA000003.pdf - WPA000005.pdf`

W plikach od `WPA000003.pdf` do `WPA000005.pdf` nie znajdują się żadne istotne informacje - zawierają jedynie zabawne obrazki.

### `WPA000006.pdf`

W pliku `WPA000006.pdf` odnajdujemy notatkę wskazującą, że rozpatrywane przestępstwo obejmuje czyny zabronione 1, 2, 6 oraz 7.

Z dokumentacji wynika, że program nie potrafi poprawnie obliczyć kary dla przestępstw obejmujących więcej niż dwa czyny jednocześnie, co sugeruje konieczność odtworzenia stosowanej przez aplikację formuły obliczeniowej dla większych zestawów czynów zabronionych.

Na podstawie analizy środowiska wykonawczego można ustalić, że aplikacja została napisana w technologii .NET (WinForms). Nawet bez bezpośredniej wiedzy programistycznej można to potwierdzić przy użyciu narzędzia `Binary Ninja`, które ujawnia strukturę aplikacji jako aplikację .NET.

W kolejnym kroku ekstraktujemy zawartość pliku wykonywalnego za pomocą narzędzia `sfextract`, uzyskując zestaw komponentów aplikacji, w tym główną bibliotekę `.dll`. Następnie analizujemy ją w narzędziu `JetBrains DotPeek`, które pozwala zdekompilować kod zarządzany .NET do czytelnej postaci zbliżonej do C#.

Analiza zdekompilowanej logiki wskazuje, że aplikacja korzysta ze słownika, w którym kluczem jest identyfikator czynu zabronionego, a wartością jego opis. Kluczowym elementem obliczeń jest suma wartości ASCII wszystkich znaków w opisie danego czynu.

Na tej podstawie rekonstruujemy wzór używany do obliczania kary dla dwóch czynów: `(słownik[id1]+slownik[id2])*(slownik[id1]+slownik[id2])`

Następnie rozszerzamy go na przypadek czterech czynów i obliczamy wynik za pomocą prostego skryptu w Pythonie:
```
slownik = (skopiowany slownik)

def ascii(n):
    suma = 0
    for i in n:
        suma += ord(i)
    return suma

print((ascii(slownik[1]) + ascii(slownik[2]) + ascii(slownik[6]) + ascii(slownik[7]))**2)
```
Wychodzi nam z tego - 415385161

### Końcówka zadania

Wyliczyliśmy osobne wartości kar za wszystkie przestępstwa `415385161, 86304100, 58936329`

Zatem liczymy iloczyn tych kar i dostajemy flagę: `2112834536082418221972900`
