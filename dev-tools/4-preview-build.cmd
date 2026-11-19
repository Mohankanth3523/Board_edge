@echo off
rem Board Edge website - optional: serve the production build at http://localhost:4173
cd /d "%~dp0.."
title Board Edge production preview - http://localhost:4173
call npx vite preview --outDir build/client --port 4173 --strictPort
