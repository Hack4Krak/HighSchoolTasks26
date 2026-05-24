## Dlaczego zadanie jest niemożliwe

Zadanie ma dwa poziomy niemożliwości:

1. **Kryptografia (RSA-2048):** Flaga w kodzie źródłowym nie jest zapisana tekstem jawnym (plaintext). Została zaszyfrowana algorytmem AES-256-GCM, a klucz do jej odszyfrowania jest pochodną dwóch 1024-bitowych liczb pierwszych ($p$ i $q$), stanowiących czynniki dla wygenerowanego $N$. Faktoryzacja tak dużej liczby (N ma 2048 bitów) jest w obecnych warunkach całkowicie niewykonalna bez komputera kwantowego i algorytmu Shora.
2. **Problem Stopu:** Aplikacja wymaga algorytmu, który **zawsze poprawnie rozstrzyga**, czy dowolny program zatrzyma się dla podanego wejścia. To klasyczny problem nierozstrzygalny, udowodniony przez Alana Turinga.

Zadanie jest więc podwójnie "matematycznie" niemożliwe.
Flagi nie da się więc wydobyć z kodu za pomocą inżynierii wstecznej (reverse engineering), bo jedynym miejscem jej istnienia jest stan po udanym zdeszyfrowaniu.

## Flaga

```
hack4KrakCTF{cz4s4m1_trz3b4_zr0b1c_kr0k_w_tyl}
```
