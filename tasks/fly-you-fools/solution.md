## Opis

Otrzymaliście animację zrobioną w scratchu, skompilowaną za pomocą [Turbowarpa](https://packager.turbowarp.org).

## Rozwiązanie

Aby poprawić wydajność animacji można użyć [rozpakowywacza](https://turbowarp.github.io/unpackager/) (tak to się chyba tłumaczy, prawda?) turbowarpa.
Problemem było to, że podmieniona została nazwa jednej funkcji - `decodeChunk` na `dc`. Sprawiło to, że nasz program nie radził sobie z grą.

Wystarczyło przywrócić jej nazwę, dzięki czemu dostajemy plik `.sb3`, który można zaimportować do Scratcha.

Głównym problemem wydajnościowym jest pisak - przerenderowanie sceny przy każdym powtórzeniu pętli mocno go spowolniło.
Animacja ma też błąd implementacyjny - liczy `ln(e^x) = x`, który jest zamieniany przez javascripta w `Infinity`.

Po tych dwóch poprawkach otrzymujemy `hack4KrakCTF{1587815024503859493813336131598}` - naszą flagę.

## AI

Nie poradziły sobie:
- ChatGPT Pro - Uznał że zadanie to test turinga i stwierdził że kocha [Jožina z bažin](https://www.youtube.com/watch?v=qCmRga2fIy0)
- DeepSeek v4 Flash Free (opencode)

## Informacje dodatkowe

Użyty soundtrack: [Benny Hill Theme](https://www.youtube.com/watch?v=MK6TXMsvgQg)
Mapa w tle: [OpenStreetMap](https://osm.org)

Oryginalny projekt na scratchu: https://scratch.mit.edu/projects/1319375512/
