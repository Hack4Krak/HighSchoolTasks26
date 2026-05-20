## Opis

W budynku za wieżą był ogrom chaotycznie ustawionych pomieszczeń. W jednym z nich mieściła się tabliczka z flagą.

Problemem było jednak to, że nie dało się tam wejść, ponieważ nikt nie wpadł na to, by zamontować drzwi wejściowe.

Serwer, na który weszliście nie był oficjalnym serwerem Minecrafta, tylko jego bardzo minimalistyczną implementacją - [CrabCraft](https://github.com/CrabCraftDev)

## Rozwiązanie

Aby odczytać flagę było kilka sposobów:
- Użyć moda takiego jak [Freecam](https://modrinth.com/mod/freecam)
- Zmodyfikować po stronie klienta `gamemode` na `spectator` - serwer nie weryfikuje poruszania się
- Zbadać pakiety wysyłane przez serwer za pomocą różnego rodzaju proxy/debuggera i odczytać jeden z nich (Block Entity Data) w którym wysyłana jest treść tabliczki.
