FROM node:22-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY src/package.json src/package-lock.json ./

RUN npm install

COPY src/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]