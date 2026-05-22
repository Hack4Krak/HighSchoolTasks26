import os
import socket
from pathlib import Path

task_path = Path(__file__).parent.parent

HOST = "krakow-arcade-museum.hack4krak.pl" if os.getenv("TASKS_TARGET") == "prod" else "127.0.0.1"
PORT = 2222


def test_ssh_port_open():
    sock = socket.create_connection((HOST, PORT), timeout=5)
    try:
        banner = sock.recv(1024)
        assert banner.startswith(b"SSH-"), f"Expected SSH banner, got: {banner[:50]}"
    finally:
        sock.close()
