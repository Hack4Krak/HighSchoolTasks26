FROM debian:bookworm-slim

WORKDIR /app
COPY --chmod=0555 assets/slowacki-backstage /app/slowacki-backstage
COPY --chmod=0444 src/flag.txt /flag.txt

USER 65534:65534
EXPOSE 31337

ENV LISTEN=1
CMD ["/app/slowacki-backstage"]
