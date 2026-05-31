## Opis

Serwery zadań były chronione przez Cloudflare WAF, które automatycznie blokowało
popularne ataki, ukrywało adres IP naszego głównego serwera oraz dodawało do każdego żądania
charakterystyczne nagłówki, m.in.:

- `cf-ray`
- `cf-connecting-ip`
- `cf-visitor`

Aplikacja zadania została skonfigurowana tak, aby odrzucać każde żądanie
zawierające którykolwiek z powyższych nagłówków lub nagłówek `User-Agent`.

## Rozwiązanie

Na początku należało ustalić adres IP naszego serwera. Najprościej
było to zrobić przez odczytanie rekordu używanego przez nasz serwer Minecraft `dratewka-simulator.hack4krak.pl`.

Po uzyskaniu prawdziwego adresu IP należało pominąć Cloudflare
i wysłać bezpośrednie żądanie HTTP do serwera:

Przykładowo przy użyciu curl:

```bash
curl -X OPTIONS http://46.224.160.55 \
-H "Host: czemu-nie-dziala.hack4krak.pl"
```

Kluczowe było wykonanie żądania bez nagłówków dodawanych przez
Cloudflare oraz bez nagłówka `User-Agent`, dzięki czemu aplikacja zaakceptowała żądanie.
