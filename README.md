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
```

### First-time setup
1. Open n8n at http://localhost:5678  
2. Go to **Settings ▸ Credentials ▸ New Credential** → choose **Postgres**  
3. Fill in:
   - Host:     *your DB host (e.g. `postgres` inside Docker or `localhost`)*  
   - Port:     5432  
   - Database: n8n  
   - User:     <your user>  
   - Password: <your password>
4. **Name** the credential **Postgres account** and click **Save & Test**.  
5. Execute any Postgres node once to confirm it connects.
