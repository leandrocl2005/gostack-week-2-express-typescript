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

## Setup postgresql with Docker
- > docker run --name gostack_postgres -e POSTGRES_PASSWORD=supersecret -p 5433:5432 -d
postgres

## Docker commands
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

