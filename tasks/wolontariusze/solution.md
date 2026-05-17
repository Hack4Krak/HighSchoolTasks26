## Opis

Otrzymaliście aplikację na Androida, która zbiera odpowiedzi na pytania, a co 5 pytań ma szansę się scrashować.

Poza wieloma błędami aplikacja miała ważną funkcję: przesyłała odpowiedzi do serwera, w tym pole `total` oznaczające ilość pytań na które dana osoba odpowiedziała.

Modyfikując lub przesyłając samemu zestaw odpowiedzi można zmanipulować pole `total` tak, by ustawić w nim potrzebną ilość odpowiedzi, czyli `100`.

## Rozwiązanie

Kluczem do rozwiązania było przechwycenie komunikacji wykonywanej przez aplikację. Można do tego było wykorzystać przykładowo [HTTP Toolkit](https://httptoolkit.com/).

Po przechwyceniu komunikacji można zauważyć, że przesyła ona takie dane na `POST https://hack4krak.pl:4567/submit` (przykład):

```json
{
  "name": "Tomek",
  "age": "17",
  "city": "Kraków",
  "total": 5,
  "answers": [
    {
      "question": "Opisz sytuację, w której powiedziałeś\/aś „nie wiem — co Cię do tego doprowadziło, jak się czułeś\/aś i jak byś teraz odpowiedział\/a na to samo pytanie?",
      "answer": "Odpowiedź numer 1"
    },
    {
      "question": "Opisz jak by wyglądał Twój dzień z palcami jak marchewki — jak byś pisał\/a, jadł\/a, otwierał\/a drzwi i jak byś się adaptował\/a do nowej rzeczywistości?",
      "answer": "Odpowiedź numer 2"
    },
    {
      "question": "Opisz sytuację, w której powiedziałeś\/aś „o rany — co się działo, dlaczego tak zareagowałeś\/aś, co poczułeś\/aś i jak byś to opisał\/a teraz?",
      "answer": "Odpowiedź numer 3"
    },
    {
      "question": "Napisz dialog między Tobą a rośliną doniczkową — o czym byście rozmawiali, jakie pytania byś zadał\/a i co roślina by Ci odpowiedziała?",
      "answer": "Odpowiedź numer 4"
    },
    {
      "question": "Gdybyś stał\/a się meblem na tydzień — opisz każdy dzień tego doświadczenia, co byś czuł\/a, co byś obserwował\/a i jak byś reagował\/a na ludzi?",
      "answer": "Odpowiedź numer 5"
    }
  ]
}
```

Gdy jednak wyśle się żądanie na ten adres z `total` >= 100, co aplikacja zrobiłaby po odpowiedzeniu na 100 pytań w odpowiedzi od serwera dostajemy naszą flagę.
