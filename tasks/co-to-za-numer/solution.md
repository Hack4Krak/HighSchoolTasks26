## Opis

Zadanie udaje klon `cotozahit.pl`: dla każdego dnia można odsłuchać krótki fragment piosenki i wysłać zgadywany tytuł. Flaga powstaje z pierwszych liter poprawnych tytułów ułożonych według numerów dni.

Jeśli ktoś zdobył flagę ręcznie, to gratuluję samozaparcia i współczuję psychice.

## Rozwiązanie

1. Otworzyć DevTools i znaleźć API używane przez stronę.
2. Pobrać pełną listę tytułów z endpointu `/api/search`.
3. Zauważyć, że endpoint `/api/guess` nie ma limitu prób.
4. Dla kolejnych dni bruteforce'ować tytuły z listy przez `/api/guess`.
5. Z poprawnych odpowiedzi wziąć pierwsze litery tytułów i połączyć je w flagę.
