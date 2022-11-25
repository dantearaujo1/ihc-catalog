@echo off
chcp 65001
echo Olá, este script irá instalar os pacotes necessários do npm e rodar o servidor da aplicação
cd ..
cd ./backend
call npm install
cd ..
cd ./frontend
call npm install
cd ..
call npm pkg set scripts.postinstall="echo no-postinstall"
call npm install

echo DB_USER=dbViewer > ./backend/.env
echo DB_PASSWORD=ZXmbV4ZtSDXGNmAv >> ./backend/.env
echo JWT_SECRET=TheSecretKey >> ./backend/.env


echo ======================================================================
echo PARA FECHAR OS SERVIDORES APERTE CTRL-C E DIGITE S E PRESSIONE ENTER
echo ======================================================================
echo ======================================================================
echo ========================GRAUNA DIGITAL =============================
echo ======================================================================
call start http://localhost:5173

@echo on
call npm run dev

