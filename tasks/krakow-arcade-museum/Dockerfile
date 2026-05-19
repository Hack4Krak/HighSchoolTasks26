FROM docker.io/library/python:3.14-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --shell /bin/sh player \
    && passwd -d player \
    && mkdir -p /run/sshd /game \
    && ssh-keygen -A

COPY src/game.py /game/game.py
COPY src/sshd_config /etc/ssh/sshd_config

RUN chmod 755 /game/game.py

EXPOSE 2222
CMD ["/usr/sbin/sshd", "-D", "-e", "-f", "/etc/ssh/sshd_config"]
