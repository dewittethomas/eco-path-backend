FROM denoland/deno:2.0.0

WORKDIR /app

COPY deno.json* .
COPY src ./src
COPY config ./config

RUN deno cache src/Main/Main.ts

EXPOSE 8000

# 👇 IMPORTANT: replace start -> run
CMD ["deno", "task", "run"]
