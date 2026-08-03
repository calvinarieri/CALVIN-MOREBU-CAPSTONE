# This stage contains build tools that won't be included in the final image.
FROM python:3.12-slim AS builder

# Set the working directory inside the container.
WORKDIR /app

# Install system packages required to compile Python packages
# (for example mysqlclient and other packages with C extensions).
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc \
    pkg-config \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the dependency list first.
# This improves Docker layer caching because dependencies are only
# reinstalled when requirements.txt changes.
COPY requirements.txt .

# Upgrade pip and install all Python dependencies.
# --prefix=/install installs them into a temporary directory that
# will later be copied into the final runtime image.
RUN python -m pip install --upgrade pip && \
    pip install --prefix=/install -r requirements.txt

# Copy the rest of the Django project into the build stage.
COPY . .

# Start with a fresh Python image.
# This keeps the final image much smaller because it doesn't include
# compilers or other build tools.
FROM python:3.12-slim

# Set the working directory.
WORKDIR /app

# Install only the runtime libraries needed by the application.
# Notice we don't install gcc or build-essential here because
# they're only needed during the build stage.
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the installed Python packages from the builder image.
# This avoids reinstalling dependencies and keeps the image smaller.
COPY --from=builder /install /usr/local

# Copy the application source code.
COPY . .

# Document that the application listens on port 8000.
# This doesn't publish the port—it serves as metadata.
EXPOSE 8000

# Start the Django application using Gunicorn.
# Gunicorn is a production-ready WSGI server.
# 0.0.0.0 allows the application to accept connections from outside
# the container.
CMD ["gunicorn", "hims_kb.wsgi:application", "--bind", "0.0.0.0:8000"]