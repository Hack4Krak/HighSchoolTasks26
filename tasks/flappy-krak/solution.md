## Opis

Mamy do czynienia z prostą grą na wzór `Flappy Bird` oraz informację, że po uzyskaniu 9999 punktów otrzymamy flagę.

Idealnym narzędziem do rozwiązania tego zadania jest [Cheat Engine](https://www.cheatengine.org/).

## Rozwiązanie

1. Uruchamiamy grę.
2. Otwieramy Cheat Engine.
3. Wybieramy proces gry.
4. Na początku gry sprawdzamy aktualny wynik (np. 0).
5. W Cheat Engine w polu Value wpisujemy aktualny score.
6. Wracamy do gry i zdobywamy kilka punktów (np. 1–3).
7. Ponownie wpisujemy nową wartość score w Cheat Engine.
8. Klikamy Next Scan.
9. Powtarzamy proces, aż zostanie od jednego do kilku adresów.
10. Po zawężeniu wyników:
    - zmieniamy ręcznie wartości podejrzanych adresów,
    - obserwujemy, który wpływa na wynik w grze.
11. Kiedy mamy już pewność co do poprawnego adresu komórki, zmieniamy wartość tego adresu na `9998`.
12. Wracamy do gry i zdobywamy ręcznie jeden punkt.
13. Na ekranie wyświetla się flaga.
