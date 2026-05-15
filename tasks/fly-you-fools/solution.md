## Opis

Animacja w Scratchu która była w zadaniu miała kilka wad implementacujnych:
1. ciągłe przerenderowywanie sceny
2. wielkie liczby w javascriptcie zamieniają się w pewnym momencie w `Infinity` lub tracą dokładność
3. liczenie ln(e^x) *potęgowało* ten problem (rozumiecie, potęgowało bo e^x).

## Rozwiązanie

Najprostszym rozwiązaniem było przepisać kod scratcha do Pythona.
Aby nie musieć ręcznie implementować za pomocą trygonometrii obrotów, można użyć biblioteki `turtle`.

Oto przykładowe rozwiązanie którego przetwarzanie trwa kilka sekund:
```python
from math import floor
import turtle

t = turtle.Turtle()
t.speed(0)
t.screen.screensize(480, 360)

# kluczowe przy wyliczaniu jest wyłączenie odświerzania,
# ponieważ to ono najbardziej opóźnia program
turtle.tracer(0)

t.left(90)

t.right(5.4)
angle = 5.4

c = 0
i = 1
res = "hack4KrakCTF{"
l = [694202137, 1233211239635, 9182737465, 501827493764]

for v in l:
    m = 8947112
    while not t.xcor() > m:
        t.forward(6)
        t.setx(max(-240, min(240, t.xcor())))
        t.sety(max(-180, min(180, t.ycor())))

        turn = angle * (t.xcor() + t.ycor())
        t.right(turn)
        angle = (angle + turn) % 360
        if angle > 180:
            angle = angle - 360

        m -= abs(t.xcor()) + abs(t.ycor())
        c += 1
    res += str(floor(v / c))
    turtle.update()
print(res + "}")
```

## AI

Nie poradziły sobie:
- ChatGPT Darmowy
- DeepSeek v4 Flash Free (opencode)
(Norbiros daj to jakiemuś bardziej kompetentnemu)

## Informacje dodatkowe

Użyty soundtrack: [Benny Hill Theme](https://www.youtube.com/watch?v=MK6TXMsvgQg)