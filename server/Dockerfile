# Pipecat agent (WebRTC) container
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1

# pipecat audio/video processors need ffmpeg
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Signaling port used by pipecat.runner.run.main() (SmallWebRTC)
EXPOSE 8765

CMD ["python", "agent.py"]