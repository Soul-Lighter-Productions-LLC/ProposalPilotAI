# Quick Start Guide - Step by Step

## 🎯 Step 1: Enable GitHub Pages (5 minutes)

1. **Go to your GitHub repository:**
   - Visit: https://github.com/Soul-Lighter-Productions-LLC/ProposalPilotAI

2. **Click on "Settings"** (top menu bar of the repository)

3. **Click on "Pages"** (left sidebar, under "Code and automation")

4. **Under "Source":**
   - Select: **"GitHub Actions"** from the dropdown
   - (Don't select "Deploy from a branch")

5. **Save/Apply** - The workflow will automatically run

6. **Wait 2-3 minutes** for the deployment to complete

7. **Your frontend will be live at:**
   ```
   https://soul-lighter-productions-llc.github.io/ProposalPilotAI/
   ```

---

## 🚀 Step 2: Deploy Cloudflare Worker (10 minutes)

### A. Install Dependencies

1. **Open PowerShell or Command Prompt**

2. **Navigate to the backend folder:**
   ```powershell
   cd "C:\Users\Trust\Documents\Projects 2025\AI Agent\backend"
   ```

3. **Install dependencies:**
   ```powershell
   npm install
   ```

### B. Set Up API Key

1. **Set your ProposalPilot API key:**
   ```powershell
   wrangler secret put VIABILITY_SCAN_API_KEY
   ```

2. **When prompted, paste your API key** and press Enter

   > **Note:** You can find your API key in the Google Doc you shared: 
   > https://docs.google.com/document/d/18jl8yGVYXCio63HpA-QHZH-DcGoMw78kd2L7ONQ6Deg/edit

### C. Test Locally (Optional)

1. **Start the worker locally:**
   ```powershell
   npm run dev
   ```

2. **You should see:**
   ```
   ⚡️  wrangler dev
   [mf:inf] Ready on http://localhost:8787
   ```

3. **Test it** by opening another terminal and running:
   ```powershell
   curl -X POST http://localhost:8787 -H "Content-Type: application/json" -d "{\"projectSummary\":\"Test project\"}"
   ```

4. **Press Ctrl+C** to stop the local server

### D. Deploy to Cloudflare

1. **Make sure you're logged into Cloudflare:**
   ```powershell
   wrangler login
   ```
   (This will open a browser for authentication)

2. **Deploy the worker:**
   ```powershell
   npm run deploy
   ```

3. **You'll see output like:**
   ```
   ✨  Success! Published your Worker to the following routes:
     https://proposalpilot-viability-scan.your-account.workers.dev
   ```

4. **Copy that URL** - you'll need it for the next step!

---

## 🔗 Step 3: Connect Frontend to Deployed Worker (2 minutes)

1. **Open the config file:**
   - Navigate to: `proposalpilot-mvp\frontend\config.js`

2. **Update the API URL:**
   ```javascript
   // Replace 'YOUR-WORKER-URL' with the URL from Step 2D
   window.API_URL = 'https://proposalpilot-viability-scan.your-account.workers.dev';
   ```

3. **Save the file**

4. **Commit and push to GitHub:**
   ```powershell
   cd "C:\Users\Trust\Documents\Projects 2025\AI Agent"
   git add proposalpilot-mvp/frontend/config.js
   git commit -m "Update API URL for production"
   git push
   ```

5. **GitHub Pages will automatically redeploy** with the new URL (takes 2-3 minutes)

---

## 🧪 Step 4: Test Everything

1. **Visit your GitHub Pages site:**
   ```
   https://soul-lighter-productions-llc.github.io/ProposalPilotAI/
   ```

2. **Enter a project summary** in the text box, for example:
   ```
   A mobile app that helps people track their daily water intake with reminders and gamification features.
   ```

3. **Click "Run Viability Scan"**

4. **You should see the viability scan results** appear below!

---

## 🔐 Step 5: Security - Revoke GitHub Token (Important!)

1. **Go to GitHub Settings:**
   - Visit: https://github.com/settings/tokens

2. **Find the token** that starts with `ghp_Ekf6q4Fy...`

3. **Click "Revoke"** next to it

4. **Confirm the revocation**

> **Why?** The token was used in the git URL and should be revoked for security. 
> You can create a new one later if needed.

---

## 🆘 Troubleshooting

### GitHub Pages not working?
- Check the **Actions** tab in your repository to see if the workflow ran
- Make sure you selected "GitHub Actions" as the source, not "Deploy from a branch"

### Cloudflare Worker deployment fails?
- Make sure you're logged in: `wrangler login`
- Check that your API key is set: `wrangler secret list`

### Frontend can't connect to worker?
- Check the browser console (F12) for errors
- Verify the URL in `config.js` matches your deployed worker URL
- Make sure CORS is enabled (it should be by default)

### Need help?
- Check the full documentation in `SETUP.md`
- Review the `README.md` for API details

