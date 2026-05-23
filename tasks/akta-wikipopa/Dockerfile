FROM rust:1.88.0

RUN rustup target add wasm32-unknown-unknown
RUN cargo install trunk --version 0.21.14
RUN cargo install wasm-bindgen-cli --version 0.2.121
RUN cargo install miniserve --version 0.29.0

WORKDIR /app
COPY src/ .
RUN trunk build --release

EXPOSE 3000
CMD ["miniserve", "/app/dist", "-p", "3000", "--index", "index.html", "--spa"]
