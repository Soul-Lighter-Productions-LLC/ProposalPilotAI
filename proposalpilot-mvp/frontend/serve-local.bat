@echo off
echo Starting local server for ProposalPilot Frontend...
echo.
echo Frontend will be available at: http://localhost:8000
echo Make sure the backend worker is running at http://localhost:8787
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
python -m http.server 8000 2>nul || (
    echo Python not found. Trying Node.js...
    npx --yes http-server . -p 8000 -c-1
)

