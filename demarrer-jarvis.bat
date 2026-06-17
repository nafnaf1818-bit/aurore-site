@echo off
title JARVIS - Démarrage
color 0A

echo.
echo  ╔════════════════════════════════════════╗
echo  ║        JARVIS - Démarrage en cours     ║
echo  ╚════════════════════════════════════════╝
echo.

cd /d C:\aurore-site

echo  [1/2] Lancement du serveur ikmail...
start "JARVIS - Serveur ikmail" cmd /k "cd /d C:\aurore-site && node imap-server.js"

timeout /t 2 /nobreak > nul

echo  [2/2] Lancement de n8n...
start "JARVIS - n8n" cmd /k "cd /d C:\aurore-site && npx n8n"

echo.
echo  ✓ Les deux serveurs sont en cours de démarrage.
echo  ✓ Attends quelques secondes puis ouvre :
echo    http://localhost:5678
echo.
pause
