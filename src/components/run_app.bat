@echo off
echo ========================================
echo   Application Précipitations Maroc
echo ========================================
echo.
echo Installation des dépendances...
pip install -r requirements.txt
echo.
echo Lancement de l'application...
echo L'application sera disponible sur: http://localhost:5000
echo.
echo Appuyez sur Ctrl+C pour arrêter l'application
echo.
python webapp.py
pause


