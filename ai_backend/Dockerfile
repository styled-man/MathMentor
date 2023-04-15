FROM python:3.11 as base

WORKDIR /ai_backend
COPY requirements.txt .

RUN python3 -m venv .venv && \
    pip3 install --no-cache-dir -r requirements.txt

COPY . .

RUN ["python3", "app.py"]
