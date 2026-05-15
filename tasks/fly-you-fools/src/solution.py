import turtle
from math import floor

t = turtle.Turtle()
t.speed(0)
t.screen.screensize(480, 360)
turtle.tracer(0)

t.left(90)

t.right(5.4)
angle = 5.4

c = 0
i = 1
res = "hack4KrakCTF{"
numbers = [694202137, 1233211239635, 9182737465, 501827493764]

for v in numbers:
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
