# Magic Mirror Video Service - Docker Integration Guide

This directory contains the necessary configuration files to containerize and run the high-performance Remotion-based video rendering microservice in a Docker container.

---

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- A local `.env` file in the root of the project with required configurations.

---

## Configuration & Environment Variables

Since Docker runs in an isolated network, you need to configure the service properly:

### 1. The Local Callback URL Gotcha
If your FastAPI server is running on your host machine (e.g. `http://127.0.0.1:8000`), a container trying to request `127.0.0.1` will try to talk to itself, causing a connection failure.
- **For Windows & macOS:** Change the `FASTAPI_CALLBACK_URL` in your `.env` to:
  ```env
  FASTAPI_CALLBACK_URL=http://host.docker.internal:8000
  ```
  *This automatically resolves to the host machine's localhost.*

- **For Linux:** You can use `--add-host=host.docker.internal:host-gateway` during run commands or refer directly to your host's local bridge IP (typically `http://172.17.0.1:8000`).

### 2. Sample `.env` Template
```env
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=magic-mirror-prototype
CLOUDFRONT_DOMAIN=https://d34auvch2x824m.cloudfront.net
FASTAPI_CALLBACK_URL=http://host.docker.internal:8000
```

---

## Running with Docker Compose (Recommended)

Docker Compose is the easiest way to build and spin up the service, automatically injecting variables from your root `.env` file.

### Build and start the container
```bash
docker compose up --build -d
```

### View container logs
```bash
docker compose logs -f
```

### Stop the container
```bash
docker compose down
```

---

## Running with Vanilla Docker CLI

If you prefer using pure Docker commands:

### 1. Build the Docker Image
```bash
docker build -t magic-mirror-video-service .
```

### 2. Run the Container
Pass your local `.env` file to the container and map the Express port (`3000`):

#### On Windows (PowerShell/CMD) or macOS/Linux:
```bash
docker run -d \
  --name magic-mirror-video-service \
  -p 3000:3000 \
  --env-file .env \
  --add-host=host.docker.internal:host-gateway \
  magic-mirror-video-service
```

---

## Performance & Optimization Notes

- **Chromium Dependencies:** The `Dockerfile` uses a Debian-based slim Node image and installs `fontconfig`, `fonts-liberation`, and `fonts-noto-color-emoji` to guarantee emojis and standard fonts render crisp and clear without any missing characters.
- **Non-Root Execution:** The container automatically drops root privileges and runs as the standard `node` user to allow Chromium to execute in its sandbox securely without relying on `--no-sandbox` flags.
- **Pre-Caching:** The Webpack bundle caching (compiled in `server.js` startup) is fully supported inside the container, saving 2-4 seconds on every video render request.
