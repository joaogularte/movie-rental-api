# movie-rental-api

Movie-rental-api criada seguindo as boas praticas de desenvolvimento NodeJS

/api/token
/api/users
/api/movies
/api/rentals

Antes de começar favor ser docs/webserviceEspc

### Primeiros passos: instalando os pacotes e rodando o app com pm2
```sh
npm install
npm install pm2 -g 
npm start
```
### Solicitando um token de autorização:

POST -> /api/token/

{		
    "email": "johndoe@email.com",
    "password": "12345"
}

o token retornado deverá ser usado junto ao header para fazer a autenticação as rotas da api.

### Testes:
```sh
npm run test-integration

npm run test-unit 

```

### Lint:

```sh
npm run lint
```