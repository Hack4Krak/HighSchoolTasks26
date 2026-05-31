## Opis

Zadanie OSINT polegało na połączeniu informacji ukrytych w gazetce, odnalezieniu właściwej działki oraz prześledzeniu historii edycji obiektu w OpenStreetMap.

## Rozwiązanie

W gazetce należało zauważyć pewne fakty:

- KN (numer 1) sugeruje, że szukamy okolicy Nowego Sącza, co potwierdzają nazwy miejscowości w wiadomościach (`126201_1` to identyfikator jednostki ewidencyjnej w Nowym Sączu, który przyda się później).
- Wspomniane odcinki OSTROŁĘKA—TŁUSZCZ oraz SŁUBICE—POŁUPIN to odpowiednio linia kolejowa i droga krajowa o numerze 29
- Po znalezieniu miejsca z domkiem widocznym na obrazku i lekkim przesunięciu widoku Street View zobaczymy **słupek** kilometrowy o wartości `144/0`.

Na samym końcu znajduje się napis `Auta - Kolejki i świnie - słupki`, sugerujący kolejność ułożenia wartości.

Po sklejeniu tych danych otrzymujemy numer działki: 126201_1.0029.144, który odpowiada Zespołowi Szkół Budowlanych w Nowym Sączu.
Znajdujemy obiekt na [OpenStreetMap](https://www.openstreetmap.org/way/332508627) i zauważamy, że ostatnia edycja została wykonana przez użytkownika `gotitim`.

W opisie profilu znajduje się napis `nowa-droga.hack4krak.pl`. Przyglądając się historii zmian profilu, można domyślić się, że chodzi o `obwodnica-zabierzowa.hack4krak.pl`.

Po otwarciu strony wpisujemy identyfikator działki. Strona generuje flagę.
