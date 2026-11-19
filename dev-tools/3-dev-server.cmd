@echo off
rem Board Edge website - step 3: development server at http://localhost:5173 (close this window to stop it)
cd /d "%~dp0.."
title Board Edge dev server - http://localhost:5173
call npm run dev -- --port 5173 --strictPort
