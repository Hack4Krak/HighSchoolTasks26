## Opis

Zadanie jest prostą grą terminalową uruchamianą przez SSH. Każda sesja ma osobny stan gry, a pasek statusu pokazuje aktualną pozycję gracza oraz liczbę biletów w zapisie szesnastkowym.

Na mapie znajduje się zamknięte przejście serwisowe, które wymaga „wszystkich punktów”. W praktyce oznacza to wartość bardzo bliską maksymalnej wartości 64-bitowego licznika.

Istotny jest zepsuty jednoręki bandyta oznaczony jako `X`. W przeciwieństwie do zwykłych automatów nie dodaje on biletów, tylko zawsze odejmuje stałą liczbę. Ponieważ licznik biletów zachowuje się jak liczba bez znaku, zejście poniżej zera powoduje zawinięcie do bardzo dużej wartości. Jest to klasyczny integer underflow.

## Rozwiązanie

Najpierw trzeba znaleźć zepsuty automat `X`. Po dojściu do niego należy używać go wielokrotnie, czekając między próbami na zakończenie cooldownu. Każda poprawna próba zmniejsza liczbę biletów o tę samą wartość.

Po odpowiedniej liczbie przegranych licznik biletów zawinie się z małej wartości do wartości bliskiej maksimum. Można to zauważyć na pasku statusu, bo liczba biletów nagle stanie się bardzo dużą wartością szesnastkową.

Z tak ustawionym licznikiem trzeba wrócić do przejścia serwisowego. Po drodze należy unikać ognia oznaczonego jako `^`, ponieważ odejmuje bilety i może zbić licznik poniżej wymaganego progu.

Jeśli licznik nadal jest wystarczająco wysoki, czytnik przy drzwiach zaakceptuje wartość i przeniesie gracza do klapy serwisowej. Sprawdzenie klapy spacją albo komendą `look` wypisuje flagę:

```text
hack4KrakCTF{u64_ticket_jackpot_after_hours}
```
