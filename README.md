# Instalar Node 16 en EC2 y correr la app:

´´´
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts

# Copia app.js al servidor.
npm i express --save
npm i dockerode --save
nohup node app.js &
´´´

✅ Listo