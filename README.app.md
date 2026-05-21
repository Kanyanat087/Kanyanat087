# Simple Node LocalStorage App

Simple Node.js app that serves a browser UI for saving notes in `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:10000`.

## Run with Docker

```bash
docker build -t simple-node-local-storage-app .
docker run --rm -p 10000:10000 simple-node-local-storage-app
```

The app binds to `0.0.0.0` and exposes port `10000`.

## GitHub Actions deployment

Create these repository secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `RENDER_DEPLOY_HOOK_URL`

On push to `main`, GitHub Actions builds the Docker image, pushes it to Docker Hub, and then calls the Render Deploy Hook.
