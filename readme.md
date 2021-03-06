## Setup typescript + express
- > yarn init -y
- > yarn add express
- > yarn add typescript -D
- > yarn tsc --init
```json
  "outDir": "./dist",
  "rootDir": "./src",
```
- > yarn tsc
- > yarn add @types/express -D
- > yarn add ts-node-dev -D
- In package.json:
```json
  "scripts": {
    "build": "tsc",
    "dev:server": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  },
```
- > yarn dev:server

## Setup editor config
- Install editor config for vs code
- Click with right button and after generating editor config
```json
trim_trailing_whitespace = true
insert_final_newline = true
```

## Setup eslint
- Install ESlint for vs code
- ctrl+shift+p and go settings.json
```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
```
- > yarn add eslint@6.8.0 -D
- > yarn eslint --init
- Options: To check syntax, find problems and enforce code style, Javascript modules (import/export), None of these, Yes, (*) Node, Use a popular style guide, Airbnb, JSON, Y
```json
"extends": [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended"
],
```
- > yarn add eslint-import-resolver-typescript -D
```json
  "rules": {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
```

## Setup Prettier
- > yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```json
{
	...
  "extends": [
		...
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  ...
  "plugins": [
    ...
    "prettier"
  ],
  "rules": {

    ...
  },
  ...
}
```
- Create prettier.config.js with
```js
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
	arrowParens: 'avoid',
}
```

## Setup debug
```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "protocol": "inspector",
      "restart": true,
      "name": "Debug",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "outFiles": [
        "${workspaceFolder}/**/*.js"
      ]
    }
  ]
}
```

## Docker commands
- Install postgres
- > docker run --name gostack_postgres -e POSTGRES_PASSWORD=supersecret -p 5433:5432 -d
- Start Postgres
- > docker run gostack_postgres
- Install mongo
- > docker run --name mongodb -p 27017:27017 -d -t mongo
- Start mongo
- > docker start mongodb
- Install redis
- > docker run --name redis -p 6379:6379 -d -t redis:alpine
- Start redis
- > docker start redis

- See all containers
- > docker ps -a
- Stop a container
- > docker stop CONTAINER_ID
- Start a container
- > docker start CONTAINER_ID

## Type ORM Setup
- > yarn add typeorm pg

## Type ORM CLI commands
- Start CLI (config package json)
- > yarn typeorm
- > yarn typeorm migration:create -n CreateAppointments
- > yarn typeorm migration:run
- > yarn typeorm migration:revert
- > yarn typeorm migration:show

# Funcionalidades

## Recuperação de senha

**RF**
- o usuário deve poder recuperar sua senha informando o seu e-mail
- o usuário deve receber um e-mail com instruções de recuperação de senha
- o usuário deve poder resetar sua senha

**RNF (libs, dbs)**
- utilizar mailtrap para testar envios em ambiente de desenvolvimento
- utilizar o Amazon SES para envios em produção
- envio de e-mails deve acontecer em segundo plano (background job)

**RN**
- o link enviado por e-mail para resetar senha deve expirar em 2 horas
- o usuário deve confirmar a senha ao resetar sua senha

## Atualiação do perfil

**RF**

- o usuário deve poder atualizar seu nome, email e senha

**RN**

- o usuário não pode alterar seu e-mail para um e-mail já utilizado por outro usuário
- para atualizar sua senha, o usuário deve informar a senha antiga
- para atualizar sua senha, o usuário tem que confirmar a nova senha

## Painel do prestador

**RF**

- o usuário deve poder listar seus agendamentos de um dia específico
- o prestador deve receber uma notificação sempre que houver um novo agendamento
- o prestador deve poder visualizar as notificações não lidas

**RNF**
- os agendamentos do prestador no dia devem ser armazenados em cache
- as notificações do prestador devem ser armazenadas no MongoDB
- as notificações do prestador devem ser enviadas em tempo real utilizando socketIO

**RN**
- a notificação deve ter um status de lida ou não lida para que o prestador possa controlar

## Agendamento de serviços
**RF**
- o usuário deve poder listar todos os prestadores de serviços cadastrados
- o usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- o usuário deve poder listar horários disponíveis em um dia específico de um prestador
- o usuário deve poder realizar um agendamento com um prestador

**RNF**
- listagem de prestadores deve ser armazenada em cache

**RN**
- cada agendamento deve durar 1 hora
- os agendamentos devem estar disponíveis entre 8:00 e 18:00 (primeiro às 8:00, último às 17:00)
- o usuário não pode agendar em um horário já ocupado
- o usuário não pode agendar em um horário que já passou
- o usuário não pode agendar serviços consigo mesmo

# Deploy

## Fazer a build da aplicação

- Converter o código em javascript
  - > yarn add @babel/cli @babel/core @babel/node -D
  - > yarn add @babel/preset-env @babel/preset-typescript -D
  - > yarn add babel-plugin-module-resolver -D
  - > yarn add --dev babel-plugin-transform-typescript-metadata
  - > yarn add --dev @babel/plugin-proposal-decorators
  - > yarn add --dev @babel/plugin-proposal-class-properties
- crie na raíz do projeto *babel.config.js*
- configurar babel
- configurar buil command:
- `"babel src --extensions \".js,.ts\"  --out-dir dist --copy-files"`
- alterar ormconfig *src* -> *dist*
- alterar ormconfig *ts* -> *js*
- teste o build: `node dist/shared/infra/http/server.js`

## Criando servidor e conectando na Digital Ocean

- Faça a conta: https://cloud.digitalocean.com/
- Crie uma instância com docker
- Gere a chave ssh com Putty: https://docs.joyent.com/public-cloud/getting-started/ssh-keys/generating-an-ssh-key-manually/manually-generating-your-ssh-key-in-windows
- Conecte com Putty: https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/putty.html

## No servidor da Digital Ocean como root

- > apt update
- > apt upgrade
- > adduser deploy
- > usermod -aG sudo deploy
- > cd /home/deploy
- > mkdir .ssh
- > ls -la
- > chown deploy:deploy .ssh/
- > ls -la
- > cp ~/.ssh/authorized_keys /home/deploy/.ssh
- > cd .ssh
- > ls -la
- > chown deploy:deploy authorized_keys
- > ls -la

## No servidor da Digital Ocean como user deploy
- > curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
- > sudo apt install yarn
- > sudo apt purge yarn
- > sudo apt autoremove
- > curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
- > echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
- > sudo apt update
- > sudo apt update && sudo apt install --no-install-recommends yarn

## Clone project from github

- > ssh-keygen
- > cd ~/.ssh/
- > ls -la
- > cat id_rsa.pub
- SSH and GPG keys -> add new (cole, isso no github se tiver privado)
- > cd ~/
- > ls
- > mkdir app
- > cd app
- > git clone <repo>
- > cd <repo>
- > yarn
- > yarn build

## Docker Postgresql setup

- > sudo groupadd docker
- > sudo usermod -aG docker $USER
- > exit
- > ssh deploy@<your_server_ip>
- > docker run -d --name postgresql -e POSTGRESQL_PASSWORD=XXXXXX -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=gobarber -p XXXXXX:5432 bitnami/postgresql:latest
- > cd app
- > cd <repo>
- > cp ormconfig.example.json ormconfig.json
- > vim ormconfig.json
- Configure o arquivo *ormconfig.json*
- > ./node_modules/.bin/typeorm migration:run

## Docker Mongo setup

- > docker run -d --name mongodb -e MONGODB_USERNAME=gobarber -e MONGODB_PASSWORD=XXXX -e MONGODB_DATABASE=gobarber bitnami/mongodb:latest
- > docker stop <container_number>
- > docker rm <container_number>
- >  docker run -d --name mongodb -e MONGODB_USERNAME=gobarber -e MONGODB_PASSWORD=XXXXXX -e MONGODB_DATABASE=gobarber -p XXXXXX:27017 bitnami/mongodb:latest
- Configure o arquivo *ormconfig.json*

## Docker Redis setup

- > docker run -d --name redis -e REDIS_PASSWORD=XXXXXX -p XXXXXX:6379 bitnami/redis:latest
- > cp .env.example .env
- Configure o arquivo *.env*

## Vim commands

- > vim <file>
- > i
- > ESC
- > :x
- > :c

## Testando a aplicação e setup

- > node dist/shared/infra/http/server.js

## Nginx as a Reverse Proxy Server

- > sudo apt install nginx
- > sudo ufw allow 80
- Entre em *<ip_address>:80*
- > cd /etc/nginx/sites-available
- > ls
- > vim default
- > sudo su
- > cp default gobarber
- > vim gobarber
- Configure o arquivo gobarber
- > cd ..
- > cd sites-enabled
- > ln -s /etc/nginx/sites-available/gobarber gobarber
- > ls -la
- > rm default
- Teste se as configurações estão ok:
- > nginx -t
- > service nginx reload
- > service nginx restart
- > exit
- > cd ~/
- > cd app
- > cd <repo>
- > node dist/shared/infra/http/server.js
- Teste a api em *http://<ip_address>*

## Mantendo a aplicação no ar

- > docker update --restart=unless-stopped <postgres_id>
- > docker update --restart=unless-stopped <mongo_id>
- > docker update --restart=unless-stopped <redis_id>
- > sudo npm install -g pm2
- > pm2 start dist/shared/infra/http/server.js --name gobarber-api
- > pm2 list
- > pm2 startup systemd
- > sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy
- > pm2 logs
- > pm2 monit

## Adicionar dominino

- No arquivo *gobarber* em */etc/nginx/sites-available* como sudo adicione seu domínio ao *server_name*
- > service nginx -t
- > service nginx restart

## Certificado https

- > sudo snap install core; sudo snap refresh core
- > sudo apt-get remove certbot
- > sudo ln -s /snap/bin/certbot /usr/bin/certbot
- > sudo certbot --nginx
- > sudo certbot renew --dry-run

## CI/CD

- Problema com chave <ResolverDepois>


## Ubuntu commands

- Ver versão do Ubuntu: `lsb_release -a`

