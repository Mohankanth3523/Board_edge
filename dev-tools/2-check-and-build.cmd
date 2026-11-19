@echo off
rem Board Edge website - step 2: type check + production build. Output: logs\typecheck.log, logs\build.log
cd /d "%~dp0.."
if not exist logs mkdir logs
echo Type checking... (log: logs\typecheck.log)
(call npm run typecheck) > logs\typecheck.log 2>&1
echo EXIT %ERRORLEVEL% >> logs\typecheck.log
echo Building... (log: logs\build.log)
(call npm run build) > logs\build.log 2>&1
echo EXIT %ERRORLEVEL% >> logs\build.log
dir /s /b build\client\*.html > logs\build-pages.log 2>&1
echo Done. You can close this window.
timeout /t 8 >nul
