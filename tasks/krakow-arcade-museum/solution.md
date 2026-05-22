## Opis

Terminal wyświetla mapę salonu arcade, a na pasku stanu znajduje się licznik biletów:

```text
POS_X=2f POS_Y=03  BILETY=00000000000001f4
```

Gracz zaczyna z `500` biletami (`0x1f4`) przy maszynach. Po stronie kasyna widoczne są jackpoty i cooldowny, ale drzwi serwisowe wymagają "wszystkich punktów" — technicznie oznacza to prawie pełną wartość `u64`:

```text
ffffffffffffffe0
```

Kluczowym elementem jest zepsuty jednoręki bandyta. Za każdym razem zabiera `32` bilety, a następnie wchodzi w cooldown. Po odpowiedniej liczbie przegranych licznik `u64` przeskakuje do okolicy $2^{64}$ [(integer underflow)](https://en.wikipedia.org/wiki/Integer_overflow)

## Rozwiązanie

Ze spawnu idziemy do zepsutego bandyty:

```text
sssssssddddddd
```

Gramy 16 razy. Między grami odchodzimy i wracamy, by przeczekać cooldown:

```text
p
adad
```

Po ostatniej przegranej licznik biletów znajduje się w akceptowanym zakresie. Następnie przechodzimy labirynt serwisowy do zamkniętych drzwi. Unikamy ognia (`^`) — jeden zły krok zabiera wystarczająco dużo biletów, by spaść poniżej progu czytnika. Gdy czytnik zaakceptuje wartość, przenosi nas do znacznika flagi:

```text
sssssaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaasaaaaaaaassaaaaawa
```

Naciskamy spację na włazie, by odkryć:

```text
hack4KrakCTF{u64_ticket_jackpot_after_hours}
```
