# Specify the base image
FROM python:3.12

# Install uv, which installs dependencies from the lockfile
COPY --from=ghcr.io/astral-sh/uv:0.12.3 /uv /usr/local/bin/uv

# Set the working directory inside the container
WORKDIR /app

# Copy the dependency manifest and lockfile to the working directory
COPY pyproject.toml uv.lock ./

# Install dependencies exactly as pinned in uv.lock (same versions CI checks).
# --no-install-project because the app runs from the source copied below, the
# same way `pip install .` only installed dependencies here.
RUN uv sync --locked --no-dev --no-install-project

# Copy the source code into the container
COPY . .
# Expose the port on which the application will run
EXPOSE 8080

# Define the command to run the application
CMD ["sh", "-c", "uv run --no-sync prisma generate ; uv run --no-sync uvicorn src.main:app --host 0.0.0.0 --port 8080"]
