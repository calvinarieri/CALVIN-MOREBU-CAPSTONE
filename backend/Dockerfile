FROM python:3.12-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc \
    pkg-config \
    build-essential \
    && rm -rf /var/lib/apt/lists/*


COPY requirements.txt .


RUN python -m pip install --upgrade pip && \
    pip install --prefix=/install -r requirements.txt


COPY . .


FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*


COPY --from=builder /install /usr/local


COPY . .


EXPOSE 8000


CMD ["gunicorn", "hims_kb.wsgi:application", "--bind", "0.0.0.0:8000"]