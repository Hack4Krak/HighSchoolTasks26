## 🧩 Rozwiązanie zadania – obejście uwierzytelniania cookie-based
### Podsumowanie zadania
W tym zadaniu [cookie](https://pl.wikipedia.org/wiki/HTTP_cookie) było wykorzystywane do przechowywania informacji
o sesji użytkownika, co samo w sobie jest standardowym podejściem w 
aplikacjach webowych. Problem polegał jednak na sposobie jego implementacji.

Zamiast bezpiecznego rozwiązania, takiego jak 
losowy identyfikator sesji generowany po stronie serwera albo
podpisany token (np. JWT), cookie zawierało [obiekt JSON](https://www.w3schools.com/js/js_json_objects.asp) zakodowany w [Base64](https://pl.wikipedia.org/wiki/Base64).

W efekcie użytkownik mógł:

odczytać zawartość ciasteczka przez jego dekodowanie,
zmodyfikować dowolne pola (np. role, uprawnienia czy identyfikator użytkownika),
ponownie zakodować zmienione dane i wysłać je do serwera.

Serwer ufał zawartości cookie bez dodatkowej weryfikacji, co oznaczało,
że cała kontrola dostępu była de facto po stronie klienta. To klasyczny przykład błędu 
projektowego prowadzącego do łatwej eskalacji uprawnień i obejścia mechanizmów autoryzacji.
### 🍪 Zachowanie systemu

Po zalogowaniu aplikacja ustawia cookie, które zawiera informacje o użytkowniku, w formacie:

- login
- zmienną isAdmin (ustawioną domyślnie na false)

Dane te są przechowywaneprzecowywyane w formacie JSON, a następnie kodowane w Base64.


### Rozwiązanie zadania

Po zalogowaniu się do systemu przy użyciu danych logowania z zadania otrzymujemy następujące cookie:

```eyJ1c2VybmFtZSI6ImthbmFyenljYV9oYWxpbmEiLCJpc0FkbWluIjpmYWxzZX0%3D```

Ze względu na standardy przesyłania danych w sieci (HTTP) cookie jest kodowane w 
formacie URL, co oznacza że znak = jest przedstawiony jako %3D

Po odkodowaniu URL otrzymujemy:

```eyJ1c2VybmFtZSI6ImthbmFyenljYV9oYWxpbmEiLCJpc0FkbWluIjpmYWxzZX0=```

Następnie dekodujemy Base64, co daje nam:

```{"username":"kanarzyca_halina","isAdmin":false}```

Teraz wystarczy zmienić wartość pola isAdmin na true, i ponownie zakodować 
dane w Base64 (w większości przeglądarek nie trzeba ponownie kodować URL)

```eyJ1c2VybmFtZSI6ImthbmFyenljYV9oYWxpbmEiLCJpc0FkbWluIjp0cnVlfQ==```

Po odświeżeniu strony z tym zmodyfikowanym cookie, uzyskujemy dostęp do panelu 
administratora, gdzie znajduje się flaga zadania (na flagę należało zaczekać minutę
lub edytować plik JS).