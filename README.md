# 🎥 YouTube Summarizer – n8n Workflow

A local, automated pipeline using:

- 🔗 YouTube link (via webhook or Chrome extension)
- 📄 Transcript extraction (via local API)
- 🧠 LLM-based summarization (Ollama)
- 📧 Email delivery
- 🛢️ Postgres memory (avoid duplicates)

---

## 🚀 Quick Start

```bash
git clone https://github.com/you/youtube-summarizer-n8n.git
cd youtube-summarizer-n8n

cp .env.example .env        # Replace placeholders with your credentials

docker compose up -d        # Starts Postgres, n8n, and Ollama
n8n import:workflow --input=workflow/youtube-summarizer.json

open http://localhost:5678  # Open n8n editor
```

---

## 🧠 First-Time Setup

### 1. Open n8n at `http://localhost:5678`

### 2. Set up Postgres Credential

- Go to **Settings → Credentials → New Credential → Postgres**
- Fill in:
  - **Host:** `postgres`
  - **Port:** `5432`
  - **Database:** `n8n`
  - **User:** `root`
  - **Password:** from `.env`

- Click **Save & Test**

### 3. Set up SMTP (Email) Credential

- Go to **Settings → Credentials → New Credential → SMTP**
- Use any test email (e.g., Gmail)
- Enable "Allow less secure apps" if needed
- Use `.env` to avoid exposing passwords

---

## 🧩 Workflow Overview

| Step | Description |
|------|-------------|
| 1 | Trigger: `POST /youtube` (via webhook or Chrome extension) |
| 2 | Extract video ID from URL |
| 3 | Check Postgres: Has this video been summarized? |
| 4a | ✅ If **not summarized**: Fetch transcript → summarize via Ollama → store in DB → send email |
| 4b | ❌ If **already summarized**: Send reminder email with YouTube URL + timestamp |

---

## 🌐 Chrome Extension (Optional)

Located in `/Chrome Extension Fetch`

- Injects a "Summarize" button into YouTube
- On click: sends `POST` request to `http://localhost:5678/webhook/youtube`
- Requires permissions:
  ```json
  "permissions": ["activeTab", "scripting"]
  ```

---

## 📄 Transcript Server

Folder: `/Transcript`

This Flask API fetches transcripts using [`youtube-transcript-api`](https://github.com/jdepoix/youtube-transcript-api).

Start manually (if not using Docker Compose):
```bash
cd Transcript
pip install -r requirements.txt
python app.py
```

Accessible at:
```
http://localhost:8000/transcript?v=VIDEO_ID
```

---

## 📦 Folder Structure

```
youtube-summarizer-n8n/
├── Chrome Extension Fetch/
├── Transcript/
├── workflow/
│   └── youtube-summarizer.json
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Variables

`.env` file controls secrets:

```env
POSTGRES_PASSWORD=your_password
SMTP_USER=n8ntestmail.6@gmail.com
SMTP_PASS=your_smtp_password
RECIPIENT_EMAIL=your_email@example.com
```

---

## 📌 Future Improvements

- Web interface for history viewing
- User-submitted email input
- Multi-language support
- Richer summary (bullets, TL;DR, timestamps)
- Background task queue
