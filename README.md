# ProposalPilot AI - Viability Scan API

A Cloudflare Worker API proxy that forwards project viability scan requests to the ProposalPilot AI service, with a simple frontend MVP for testing.

## 🚀 Features

- **Cloudflare Worker Backend**: Fast, serverless API proxy
- **Frontend MVP**: Simple HTML/JS interface for testing viability scans
- **Error Handling**: Comprehensive error handling and validation
- **Flexible Configuration**: Supports optional `targetMarket` and `constraints` fields

## 📁 Project Structure

```
.
├── backend/              # Cloudflare Worker
│   ├── index.js         # Worker entry point
│   ├── package.json     # Dependencies
│   └── wrangler.toml    # Cloudflare configuration
├── proposalpilot-mvp/   # Frontend MVP
│   └── frontend/
│       ├── index.html   # Frontend UI
│       └── main.js      # Frontend logic
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Cloudflare account (for deployment)
- ProposalPilot API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up your API key:
```bash
wrangler secret put VIABILITY_SCAN_API_KEY
```
Enter your ProposalPilot API key when prompted.

4. Run locally:
```bash
npm run dev
```
The worker will start on `http://localhost:8787`

5. Deploy to Cloudflare:
```bash
npm run deploy
```

### Frontend Setup

#### Option 1: GitHub Pages (Recommended)

The frontend is automatically deployed via GitHub Pages. Visit:
```
https://soul-lighter-productions-llc.github.io/ProposalPilotAI/
```

**Note**: Update the API URL in `main.js` to point to your deployed Cloudflare Worker URL.

#### Option 2: Local Development

1. Start the backend worker (see above)

2. Open `proposalpilot-mvp/frontend/index.html` in your browser, or use a local server:

```bash
# Using Python
cd proposalpilot-mvp/frontend
python -m http.server 8000

# Using Node.js (http-server)
npx http-server proposalpilot-mvp/frontend -p 8000
```

3. The frontend will connect to `http://localhost:8787` by default

## 📖 Usage

### API Endpoint

**POST** `/` (or your deployed worker URL)

**Request Body:**
```json
{
  "projectSummary": "Your project description here",
  "targetMarket": "Optional target market",
  "constraints": ["Optional", "constraints", "array"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Viability scan results from ProposalPilot API
  }
}
```

### Frontend

1. Open the frontend (GitHub Pages or locally)
2. Enter your project summary in the text area
3. Click "Run Viability Scan"
4. View the results below

## 🔧 Configuration

Edit `backend/wrangler.toml` to customize:
- Worker name
- API endpoint URL
- Compatibility date

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Links

- [GitHub Repository](https://github.com/Soul-Lighter-Productions-LLC/ProposalPilotAI)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
