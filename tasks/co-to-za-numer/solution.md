## Opis

Zadanie udaje klon `cotozahit.pl`: dla każdego dnia można odsłuchać krótki fragment piosenki i wysłać zgadywany tytuł. Flaga powstaje z pierwszych liter poprawnych tytułów ułożonych według numerów dni.

Jeśli ktoś zdobył flagę ręcznie, to gratuluję samozaparcia i współczuję psychice.

## Rozwiązanie

1. Otworzyć narzędzia deweloperskie (DevTools) i zidentyfikować endpointy API wykorzystywane przez aplikację.
2. Za pomocą endpointu `/api/search` pobrać pełną listę dostępnych tytułów utworów.
3. Zauważyć, że endpoint `/api/guess` nie posiada ograniczenia liczby prób.
4. Dla każdego dnia wykonywać atak słownikowy na endpoint /api/guess, wykorzystując wcześniej pobraną listę tytułów.
5. Z poprawnych odpowiedzi wyodrębnić pierwsze litery tytułów i połączyć je w odpowiedniej kolejności, uzyskując flagę.
6. Po połączeniu liter np. poprzez prosty skrypt w pythonie, otrzymujemy flagę `SSVMSJMAIŁWDŁBBAWGMPHAEWMNRWGDECCGBBŚPKAWSR"YMBCCDIJJJwkKTBMSVZAMDCAMDZPPBSCKZZTŻWSRWPPVKADKAMPCTBTT`
