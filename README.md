# 🚀 Trigger Fastify API — Async Jobs with Trigger.dev

This project is a production-ready **Fastify API** integrated with **Trigger.dev**, enabling background job orchestration with workers deployed separately.  
It’s designed to be fast, type-safe, containerized, and deployable to **Digital Ocean App Platform**.

---

## 🧱 Stack Overview

| Layer | Technology |
|-------|-------------|
| **Backend Framework** | [Fastify](https://fastify.dev) + [TypeScript](https://www.typescriptlang.org/) |
| **Async Jobs** | [Trigger.dev](https://trigger.dev) |
| **Validation** | [Zod](https://zod.dev) |
| **Logging** | [Pino](https://getpino.io) |
| **Containerization** | [Docker](https://www.docker.com/) |
| **Package Manager** | [pnpm](https://pnpm.io) |
| **Deployment** | [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform) |

---

## 📁 Project Structure
```
.
├── src/
│ ├── api/
│ │ ├── index.ts # Fastify server setup
│ │ ├── routes/ # HTTP routes
│ │ └── tasks/ # Trigger.dev task definitions
│ └── ...
│
├── trigger.config.ts # Trigger.dev project configuration
├── Dockerfile # Builds and runs the Fastify API
├── Dockerfile.triggers # Worker container for Trigger.dev jobs
├── entrypoint.triggers.sh # Worker startup script (with debug logs)
├── docker-compose.yml # Local multi-container setup
├── tsconfig.json
├── package.json
└── README.md
```

## ⚙️ Environment Variables

Create a `.env` file in the root folder or configure the variables directly in the Digital Ocean dashboard.

| Variable | Description |
|-----------|-------------|
| `NODE_ENV` | Environment mode (`development` or `production`) |
| `PORT` | API port (defaults to 3333) |
| `TRIGGER_SECRET_KEY` | Secret key from Trigger.dev project |
| `TRIGGER_ENV` | Environment for Trigger.dev (`development` or `production`) |
| `LOG_LEVEL` | Logging level (`info`, `debug`, etc.) |

Example `.env`:

```bash
NODE_ENV=development
PORT=3333
TRIGGER_SECRET_KEY=sk_test_xxxxxxxxxxxxx
TRIGGER_ENV=development
LOG_LEVEL=info
```

## 🧪 Running Locally

Make sure you have Docker and pnpm installed.
1. Install dependencies
    ```
    pnpm install
    ```

2. Start the API
    ```
    pnpm dev
    ```
    The server should be available at:
    ```
    http://localhost:3333
    ```

3. Run Trigger.dev Worker (optional local testing)
    ```
    pnpm dlx trigger.dev@latest start --log-level debug
    ```
    OBS: This starts the Trigger.dev runtime and connects your jobs defined in src/tasks/.


## 🐳 Running with Docker Compose (local containers)

You can simulate the full environment (API + Worker) with:
```
docker compose up --build
```

This uses:
 - Dockerfile → Fastify API container
 - Dockerfile.triggers → Trigger.dev worker container


## ☁️ Deploying to Digital Ocean App Platform

#### Step 1: Create a Web Service (API)

- Source: your GitHub repository
- Dockerfile path: Dockerfile
- Internal port: 3333
- Environment variables:
    ```
    NODE_ENV=production
    TRIGGER_ENV=production
    TRIGGER_SECRET_KEY=<your-key>
    LOG_LEVEL=info
    PORT=3333
    ```

#### Step 2: Create a Worker (Trigger.dev)

- Source: same repository
- Dockerfile path: Dockerfile.triggers
- Component type: Worker
- Run command: leave empty (so Dockerfile CMD runs)
- Environment variables:
    ```
    NODE_ENV=production
    TRIGGER_ENV=production
    TRIGGER_SECRET_KEY=<your-key>
    LOG_LEVEL=debug
    ```

#### Step 3: Deploy 🚀

The App Platform will build both services and start them automatically.
You should see logs similar to:
```
🔧 Node: v20.x
🟢 Ready: starting trigger.dev worker (debug logs ON)
✅ Connected to Trigger.dev — listening for jobs...
```

## 🧩 Testing the Workflow
1. Create a Task Run

    Send a POST request to the /tasks endpoint:
    ```bash
    curl -X POST https://<YOUR_API_URL>/tasks \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello Trigger!"}'
    ```
    You’ll receive:
    ```json
    { "runId": "run_cmhia6ziaa0qn3an1wrzfczz3" }
    ```
2. Query the Run Status
    ```bash
    curl https://<YOUR_API_URL>/runs/run_cmhia6ziaa0qn3an1wrzfczz3
    ```
    Response example:
    ```json
    {
        "id": "run_cmhia6ziaa0qn3an1wrzfczz3",
        "status": "COMPLETED",
        "duration": 1574,
        "output": "Task finished successfully!"
    }
    ```

#### 🧭 Debugging Tips

| Symptom | Likely Cause | Fix |
|----------|---------------|-----|
| ZodError: TRIGGER_SECRET_KEY undefined | Missing env variable | Set `TRIGGER_SECRET_KEY` in DO settings |
| failed to launch: determine start command | DO Worker misconfigured | Use Dockerfile or explicit run command |
| Worker logs show only “Progress resolved…” | That’s build, not runtime | Check deployment logs after container starts |
| No Trigger.dev worker started message | Worker didn’t reach runtime | Verify `CMD` or run command is correct; ensure `pnpm dlx trigger.dev@latest start` executes successfully |


#### 📘 Reference Commands
```bash
# Run build locally
pnpm build

# Run Fastify in prod mode
pnpm start

# Run Trigger.dev worker manually
pnpm dlx trigger.dev@latest start --log-level debug

# Docker build and run manually
docker build -t trigger-fastify-api .
docker run -p 3333:3333 trigger-fastify-api
```

#### 🧑‍💻 Author
##### Edson Barbosa Junior

## 🏁 License

This project is licensed under the MIT License — feel free to use and adapt it.