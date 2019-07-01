# node-auth
Projeto exemplo utilizando NODE, MONGODB, GUID, JWT...
<p>
Rodar a aplicação -> npm start

Teste -> npm test

  POST http://localhost:3000/auth/singup
  content-type: application/json
  {
    "nome":"usuario",
    "email":"usuario@email.com",
    "senha":"123456"
  }

  POST http://localhost:3000/auth/singin
  content-type: application/json
  {
    "email":"usuario@email.com",
    "senha":"123456"
  }

  GET  http://localhost:3000/usuario/{id}
  content-type: application/json
  Authorization: Bearer {token}</p>
