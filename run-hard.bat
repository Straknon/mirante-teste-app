@echo off
cls
:: docker system prune --volumes
call docker-compose down -v || echo Falha ao limpar docker
call ng build --configuration production || echo Falha na build
call docker-compose build --no-cache || echo Falha no build da imagem
call docker images
call docker-compose up || echo Falha ao subir containers

