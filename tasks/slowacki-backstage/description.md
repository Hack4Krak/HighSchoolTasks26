> System kontroli dostępu do zaplecza Teatru im. Juliusza Słowackiego w Krakowie działa na dziwnym, starym programie napisanym w C.
> 
> Udało ci się znaleźć identyczną wersję programu używanego przez autorów na ciemnej stronie internetu.
> Wiesz, że w teatrze uruchomiony jest dokładnie ten sam program — i że to jedyna rzecz blokująca ci wejście na scenę.

## Zadanie

W załączniku znajduje się program `slowacki-backstage`. Taki sam program działa na serwerze zadania:

```bash
nc slowacki-backstage.hack4krak.pl 31338
```

Flagi nie ma w pobranym pliku.
Zacznij od sprawdzenia, jak program weryfikuje kod dostępu. Następnie uważnie zobacz, co robi z danymi gościa.

## Podpowiedź

Ten task jest książkowym przykładem reverse engineeringu. Jeśli nie wiesz, od czego zacząć, poszukaj tutoriali online - znajdziesz ich dużo.
Polecajka od organizatorów: [Self-Learning Reverse Engineering in 2022 od @LiveOverflow](https://www.youtube.com/watch?v=gPsYkV7-yJk)
