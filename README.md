# DESAFIO BACKEND

## Tecnologias utilizadas
<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" title="Jest"/></code>
	<code><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35" alt="Vite" title="Vite"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/></code>
</div>

## Scripts existentes

```
  npm run start:dev
  npm run start:test
  npm run test
```

## Variáveis de ambiente

```
NODE_PORT // Porta do servidor
POSTGRES_DB // Nome do banco de dados
TEST_POSTGRES_DB // Nome do banco de dados de teste
POSTGRES_PORT // Porta do PostgreSQL
POSTGRES_HOST // Host do PostgreSQL
POSTGRES_USER // Usuário do PostgreSQL
POSTGRES_PASSWORD // Senha do usuário do PostgreSQL
SECRET_TOKEN // Palavra secreta para a geração de token
TOKEN_EXPIRATION // Tempo de expiração do token, ex: 15d
ORIGIN // Link do site que irá consumir a API
```

## Avisos importantes

- Antes de executar o sistema, por favor, crie o banco de dados e insira no .env;
- Pode ocorrer de quando for realizar os testes pela primeira vez, após criar o banco de dados.

## Endpoints
### <a href="./docs/categoria.md">Categoria</a>
### <a href="./docs/produto.md">Produto</a>
### <a href="./docs/usuario.md">Usuário</a>
