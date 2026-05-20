## Opis
Zadnie polegało na odnalezieniu ukrytej strony w naszej domenie. 

Strona ta posiadała certyfikat SSL, z tego też powodu najprostszym sposobem na jej odnalezienie 
było sprawdzenie logów Certificate Transparency (CT). 

Każdy certyfikat wystawiony
np. przez Let’s Encrypt trafia do
publicznych rejestrów takich jak [crt.sh](https://crt.sh/)

## Rozwiązanie
Aby odnaleźć ukrytą stronę, wystarczyło skorzystać z wyszukiwarki certyfikatów SSL

Na stronie [crt.sh](https://crt.sh/) wpisujemy ```%.hack4krak.pl``` 
i otrzymujemy listę certyfikatów wystawionych dla tej domeny.

Na liście tej znajduje się certyfikat wystawiony dla subdomeny: 

```kompletnie-niepodejrzana-strona.hack4krak.pl```

Po wejściu na ten adres można było otrzymać flagę.
