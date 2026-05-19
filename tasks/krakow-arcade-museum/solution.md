# Solution

The terminal redraws a normal arcade map, but the status line exposes the ticket register:

```text
POS_X=2f POS_Y=03  BILETY=00000000000001f4
```

You start with `500` tickets (`0x1f4`) next to the casino machines. The casino side has visible jackpots and cooldowns, but the service door says it requires all points. Technically, that means a near-full `u64`:

```text
ffffffffffffffe0
```

The important interaction is the broken one armed bandit. It always removes `32` tickets and then goes on cooldown. After enough fixed losses, the `u64` ticket counter underflows into the door's accepted range.

From spawn, walk to the broken bandit:

```text
sssssssddddddd
```

Play it 16 times. Between plays, move away and back to wait out the cooldown:

```text
p
adad
```

After the last loss the ticket counter is in the accepted high range. Then walk through the service maze to the locked door. Avoid the fire (`^`): one wrong step removes enough tickets to fall below the reader's threshold. When the reader accepts the value, it teleports you to the flag marker:

```text
sssssaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaasaaaaaaaassaaaaawa
```

Inspect the hatch with Space to reveal:

```text
hack4KrakCTF{u64_ticket_jackpot_after_hours}
```
