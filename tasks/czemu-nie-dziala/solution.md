Problem był taki, że:
- SSL nie działało
- zadanie wymagało obejścia cloudflare.

## Rozwiązanie

46.224.160.55 to nasze ip - można je znaleźć np. z dratewka-simulator.hack4krak.pl (serwer minecraft)
Należało wykonać `OPTIONS 46.224.160.55` z headerem `Host: czemu-nie-dziala.hack4krak.pl`.