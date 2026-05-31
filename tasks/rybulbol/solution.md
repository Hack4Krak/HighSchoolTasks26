## Opis

Mamy tutaj do czynienia z grą, której nie da się przejść.

Aby otrzymać flagę, należy zajrzeć do kodu gry i go zmodyfikować, np. za pomocą narzędzia [dnSpy](https://github.com/dnSpy/dnSpy/releases/).

## Rozwiązanie

1. Otwieramy `rybulból_Data\Managed\Assembly-CSharp.dll` w dnSpy.
2. Czytając kod, napotykamy zmienną o nietypowej nazwie. Jest ona obiektem `GameObject` i aktywuje się, gdy wynik osiągnie `-863437832`.
3. Modyfikujemy grę, aby aktywować tę zmienną. Po wejściu do gry ukazuje się flaga, ale gra od razu się zamyka.
4. Robimy zrzut ekranu albo odnajdujemy i modyfikujemy kod, który automatycznie zamyka grę, gdy `GameObject` z flagą jest aktywny.
5. Odczytujemy flagę z ekranu.
