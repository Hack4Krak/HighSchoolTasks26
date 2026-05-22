FROM oven/bun:1
WORKDIR /app

USER root
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv ffmpeg && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1
ENV VIRTUAL_ENV=/app/.venv
RUN python3 -m venv "$VIRTUAL_ENV"
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/frontend/ ./frontend/
RUN cd frontend && bun install && bun run build
RUN cp -r frontend/.output/public ./public

COPY src/main.py src/seed.py ./
RUN chown -R bun:bun /app
USER bun

EXPOSE 8000
CMD python3 seed.py && exec uvicorn main:app --host 0.0.0.0 --port 8000
