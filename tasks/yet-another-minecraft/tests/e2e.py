import json
import os
import socket
import struct

MC_ADDRESS = os.getenv(
    "MINECRAFT_HOST",
    "yet-another-minecraft.hack4krak.pl" if os.getenv("TASKS_TARGET") == "prod" else "127.0.0.1",
)
SERVICE_PORT = 25567
EXPECTED_MOTD = "yet another minecraft"


def ping_mc_server(ip, port=25565):
    """Ping a Minecraft server and return server info."""

    def read_var_int(sock):
        i = 0
        j = 0
        while True:
            k = sock.recv(1)
            if not k:
                return 0
            k = k[0]
            i |= (k & 0x7F) << (j * 7)
            j += 1
            if j > 5:
                raise ValueError("var_int too big")
            if not (k & 0x80):
                return i

    sock = socket.create_connection((ip, port), timeout=5)
    sock.settimeout(5)
    try:
        host = ip.encode("utf-8")
        data = b""  # wiki.vg/Server_List_Ping
        data += b"\x00"  # packet ID
        data += b"\x04"  # protocol variant
        data += struct.pack(">b", len(host)) + host
        data += struct.pack(">H", port)
        data += b"\x01"  # next state
        data = struct.pack(">b", len(data)) + data
        sock.sendall(data + b"\x01\x00")  # handshake + status ping
        length = read_var_int(sock)
        if length < 10:
            raise ValueError(f"invalid response {sock.recv(length)}")

        sock.recv(1)  # packet type, 0 for pings
        length = read_var_int(sock)
        data = b""
        while len(data) != length:
            chunk = sock.recv(length - len(data))
            if not chunk:
                raise ValueError("connection aborted")
            data += chunk

        return json.loads(data)
    finally:
        sock.close()


def test_server_alive():
    server_data = ping_mc_server(MC_ADDRESS, SERVICE_PORT)
    assert "version" in server_data
    assert "players" in server_data
    assert "description" in server_data
    assert str(server_data["description"]).lower().find(EXPECTED_MOTD) != -1
