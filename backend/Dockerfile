# Base Python image
FROM python:3.12

# Install Node.js 22 LTS for Prisma
RUN apt-get update && \
    apt-get install -y curl ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Install uv for Python dependency management
COPY --from=ghcr.io/astral-sh/uv:0.12.3 /uv /usr/local/bin/uv

# Set working directory
WORKDIR /app

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies from the lockfile
RUN uv sync --locked --no-dev --no-install-project

# Copy application source code
COPY . .

# Generate the Prisma Python client during the build
RUN uv run --no-sync prisma generate

# Expose the FastAPI port
EXPOSE 8080

# Start the application
CMD ["uv", "run", "--no-sync", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]