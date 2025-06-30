# YouTube Summarizer – n8n workflow

⚡ One-click local stack: YouTube → Transcript API → Ollama summary → Email.

## Quick start
```bash
git clone https://github.com/<you>/youtube-summarizer-n8n.git
cd youtube-summarizer-n8n
cp .env.example .env               # put real passwords here
docker compose up -d               # starts Postgres, n8n, Ollama
n8n import:workflow --input=workflow/youtube-summarizer.json
open http://localhost:5678         # n8n editor
