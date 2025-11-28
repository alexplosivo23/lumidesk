@echo off
echo ================================
echo   SUBIENDO CAMBIOS A GITHUB...
echo ================================

git add .
git commit -m "actualizacion automatica"
git push

echo.
echo ================================
echo       CAMBIOS SUBIDOS!
echo ================================
pause
