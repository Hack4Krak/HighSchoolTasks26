## Opis

Kontrola biletów odbywała się za pomocą czytnika.

Na otrzymanej karcie zapisano następujące dane w formacie [CBOR](https://cbor.io/), zakodowane za pomocą Base64:

```json
{
    "count": 1,
    "duration": 15,
    "duration_unit": "min",
    "activated_at": 1779457635
}
```

## Rozwiązanie

Należało zwiększyć liczbę biletów oraz czas ich ważności przez modyfikację pól `count`, `duration`, `duration_unit` lub `activated_at`, a następnie ponownie zapisać dane na otrzymanej karcie w odpowiednim formacie.

Do odczytania i zapisania danych można było wykorzystać aplikację na Androida obsługującą karty NFC oraz format NDEF, np. NFC Tools.
