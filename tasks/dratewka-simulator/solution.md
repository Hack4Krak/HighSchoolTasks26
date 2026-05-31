## Opis

Jeśli ktoś z was przeszedł grę, to gratulujemy!

## Rozwiązanie

Jest kilka sposobów na rozwiązanie problemu ze smokiem:

- Przejść grę na serwerze w pełni uczciwie, po czym przeczytać nasz własny [End Poem](https://minecraft.wiki/w/End_Poem).
- Wykorzystać fakt, że gra wysyła nam paczkę zasobów (resource pack), którą można odczytać od razu.

Haczyk jest taki, że spakowaliśmy naszą paczkę zasobów za pomocą [PackSquasha](https://github.com/ComunidadAylas/PackSquash).
Wykorzystuje on różne sposoby na utrudnienie odczytu pliku ZIP.

Wystarczy jednak przenieść serwerową paczkę z `downloads` do `resourcepacks` i aktywować ją. Następnie tworzymy świat w trybie kreatywnym i wpisujemy dwie komendy:

```mcfunction
execute in minecraft:the_end run tp 0 100 0
kill @e[type=ender_dragon]
```

Po wskoczeniu do portalu naszym oczom ukazuje się wątpliwej jakości opowieść, na końcu której jest flaga.

## AI

AI nie ma bezpośredniej kontroli nad grą, co mocno utrudnia pracę. Mimo kilku prób promptów z opisem kontekstu ChatGPT (w darmowej wersji na stronie) nie rozpoznał, że rozwiązanie wymaga analizy paczki zasobów.
