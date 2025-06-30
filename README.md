# 🎥 YouTube Summarizer — n8n Workflow

> One-click local stack: YouTube → Transcript API → Ollama summary → Email.

## ⚡ Quick Start

```bash
git clone https://github.com/you/youtube-summarizer-n8n.git
cd youtube-summarizer-n8n

docker compose up -d
n8n import:workflow --input=workflow/youtube-summarizer.json

open http://localhost:5678
```

---

## 🛠 First-Time Setup in n8n

1. Open [n8n](http://localhost:5678)
2. Go to `Settings → Credentials → New Credential`

### 🔌 Postgres

Select `Postgres` and fill in:

| Field     | Value        |
|-----------|--------------|
| Host      | `postgres`   |
| Port      | `5432`       |
| Database  | `n8n`        |
| User      | `root`       |
| Password  | `postgres`   |

→ Name this credential: **Postgres account**

### ✉️ SMTP Email

Select `SMTP` and fill in your real email info:

| Field     | Example Value           |
|-----------|-------------------------|
| User      | `youremail@gmail.com`   |
| Password  | `your-app-password`     |
| Host      | `smtp.gmail.com`        |
| Port      | `465`                   |
| Secure    | `true`                  |

→ Name this credential: **n8n Test Mail**

---

## 📦 Included

| Folder/File              | Purpose                               |
|--------------------------|---------------------------------------|
| `workflow/`              | Contains the `youtube-summarizer.json` workflow |
| `Transcript/`            | Python API server for transcript fetching |
| `Chrome Extension Fetch/`| Optional browser shortcut tool         |
| `docker-compose.yml`     | Sets up Postgres, Ollama, and n8n      |

---

## 🧩 Optional: Chrome Extension

To quickly trigger the summarizer:

1. Open `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `Chrome Extension Fetch/` folder

---

## 🧠 How It Works

1. User submits a YouTube link via webhook or Chrome extension
2. Backend fetches transcript via `/transcript`
3. Transcript sent to Ollama (via n8n)
4. AI summarizes content
5. Result is:
   - Emailed to user
   - Logged in Postgres (to prevent duplicates)

---

## 🧪 Example

Try with:

```bash
curl -X POST http://localhost:5678/webhook/youtube \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=VIDEO_ID"}'
```

---

## ✅ To-Do

- [ ] Add front-end trigger UI
- [ ] Add LLM model selection support
- [ ] Add transcript caching for reusability

---

## 🤝 Credits

Built with:

- [n8n](https://n8n.io/)
- [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api)
- [Ollama](https://ollama.com/)
