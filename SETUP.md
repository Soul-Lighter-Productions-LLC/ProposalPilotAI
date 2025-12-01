# ProposalPilot AI - Complete Setup Guide

## ✅ What's Been Completed

1. **Fixed corrupted `package.json`** - Removed garbage characters
2. **Fixed frontend API endpoint** - Updated to use configurable API URL
3. **Connected to GitHub** - Repository synced with [GitHub](https://github.com/Soul-Lighter-Productions-LLC/ProposalPilotAI)
4. **Created GitHub Pages workflow** - Automatic frontend deployment
5. **Added comprehensive documentation** - README with setup instructions

## 🚀 Next Steps to Complete Setup

### 1. Enable GitHub Pages

1. Go to your repository: https://github.com/Soul-Lighter-Productions-LLC/ProposalPilotAI
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions`
4. The workflow will automatically deploy your frontend when you push to `main`

Your frontend will be available at:
```
https://soul-lighter-productions-llc.github.io/ProposalPilotAI/
```

### 2. Update Frontend API URL for Production

Once your Cloudflare Worker is deployed, update `proposalpilot-mvp/frontend/config.js`:

```javascript
// Replace with your deployed worker URL
window.API_URL = 'https://your-worker-name.your-account.workers.dev';
```

Then commit and push:
```bash
git add proposalpilot-mvp/frontend/config.js
git commit -m "Update API URL for production"
git push
```

### 3. Set Up Cloudflare Worker

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure API Key
```bash
wrangler secret put VIABILITY_SCAN_API_KEY
```
Enter your ProposalPilot API key when prompted.

#### Test Locally
```bash
npm run dev
```
The worker will start on `http://localhost:8787`

#### Deploy to Cloudflare
```bash
npm run deploy
```

After deployment, you'll get a URL like:
```
https://proposalpilot-viability-scan.your-account.workers.dev
```

### 4. Run Frontend Locally

#### Option A: Using the Batch Script (Windows)
```bash
cd proposalpilot-mvp\frontend
serve-local.bat
```
Then open: http://localhost:8000

#### Option B: Using Python
```bash
cd proposalpilot-mvp/frontend
python -m http.server 8000
```

#### Option C: Using Node.js
```bash
cd proposalpilot-mvp/frontend
npx http-server . -p 8000
```

**Important**: Make sure your backend worker is running at `http://localhost:8787` before testing the frontend.

## 📋 Project Structure

```
.
├── backend/                    # Cloudflare Worker
│   ├── index.js               # Worker entry point
│   ├── package.json           # Dependencies (FIXED)
│   └── wrangler.toml          # Cloudflare config
├── proposalpilot-mvp/
│   └── frontend/
│       ├── index.html         # Frontend UI
│       ├── main.js            # Frontend logic (FIXED)
│       ├── config.js          # API URL configuration
│       └── serve-local.bat    # Local dev server script
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Pages deployment
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore rules
```

## 🔐 Security Note

**Important**: The GitHub token used for authentication should be revoked and regenerated for security:

1. Go to: https://github.com/settings/tokens
2. Find the token and revoke it
3. Generate a new token if needed for future operations

## 🎯 Testing Checklist

- [ ] Backend worker runs locally (`npm run dev` in `backend/`)
- [ ] Frontend opens locally and connects to local worker
- [ ] Cloudflare Worker deployed successfully
- [ ] GitHub Pages enabled and frontend accessible
- [ ] Frontend `config.js` updated with production worker URL
- [ ] End-to-end test: Submit project summary and receive viability scan

## 📞 Need Help?

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- Repository: https://github.com/Soul-Lighter-Productions-LLC/ProposalPilotAI

