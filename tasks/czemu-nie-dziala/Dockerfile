FROM oven/bun:1

WORKDIR /app

RUN chown -R bun:bun /app

COPY --chown=bun:bun src/package.json src/bun.lock ./

USER bun

RUN bun install --frozen-lockfile

COPY --chown=bun:bun src/ .

EXPOSE 4567

CMD ["bun", "run", "start"]