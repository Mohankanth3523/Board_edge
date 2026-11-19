@echo off
rem Board Edge website - step 1: install dependencies. Output: logs\install.log
cd /d "%~dp0.."
if not exist logs mkdir logs
echo Installing dependencies... (log: logs\install.log)
(echo === node & node -v & echo === npm & call npm -v & echo === npm install & call npm install --no-fund --no-audit) > logs\install.log 2>&1
echo EXIT %ERRORLEVEL% >> logs\install.log
echo Done. You can close this window.
timeout /t 8 >nul
