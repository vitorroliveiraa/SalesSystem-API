<h1 align="left" style="font-weight: bold;">Sales System</h1>

<p align="left">
  O sistema é uma API desenvolvida utilizando o framework AdonisJS versão 6, com arquitetura bem definida para garantir a separação de responsabilidades e boas práticas. 
    A aplicação gerencia dois módulos principais: <b>Clientes (Clients) e Produtos (Products)</b>, permitindo CRUD completo e autenticação para proteger recursos sensíveis. 
    Utiliza <b>JWT (JSON Web Token)</b> para autenticação de usuários e validação de permissões.
</p>

<h2 id="started">Tecnologias</h2>

<!--- # "Verify icons availability here https://github.com/tandpfun/skill-icons" -->

[![My Skills](https://skillicons.dev/icons?i=adonis,typescript,nodejs,mysql,docker)](https://skillicons.dev)

<h2 id="started">Pré-requisitos</h2>

Para que o sistema funcione corretamente, é necessário ter instalado na sua máquina:

- [Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually)
- [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)

<h2 id="started">Começar</h2>

1. Clone o projeto: `https://github.com/vitorroliveiraa/SalesSystem-API.git`
2. Acessar a pasta: `cd SalesSystem-API`
3. Instalar dependências: `npm i`
4. Configurar variáveis de ambiente:
   - Renomear arquivo `.env.example` para `.env`
   - Rodar o comando: `node ace generate:key`
   - Agora, basta definir o restante das variáveis e subir o container com o banco de dados.
6. Subir o container com o banco de dados: `docker compose up -d`
7. Criar tabelas no banco de dados: `node ace migration:run`
8. Basta rodar `npm run dev` e testar os endpoints [clicando aqui](https://github.com/vitorroliveiraa/SalesSystem-API?tab=readme-ov-file#dados-para-teste).


<h2 id="routes">📍 API Endpoints</h2>

<h3 id="routes">Users</h2>

| Rota               | Descrição                                          
|----------------------|-----------------------------------------------------
| `POST /signup`     | Cadastra um usuário.
| `POST /login`     | Entra no sistema e retorna um token de autenticação.

<h3 id="routes">Clients</h2>

| Rota               | Descrição                                          
|----------------------|-----------------------------------------------------
| `GET /clients`     |   Retorna a lista de todos os clientes cadastrados, ordenados por ID.
| `GET /clients/:id`     | Retorna os detalhes de um cliente específico, incluindo suas vendas. Permite filtro por mês e ano.
| `POST /clients`     | Cria um novo cliente.
| `PUT /clients/:id`     | Atualiza os dados de um cliente existente.
| `DELETE /clients/:id`     | Exclui um cliente e todas as vendas relacionadas a ele.

<h3 id="routes">Products</h2>

| Rota               | Descrição                                          
|----------------------|-----------------------------------------------------
| `GET /products`     |   Retorna a lista de todos os produtos cadastrados, ordenados por ID.
| `GET /products/:id`     | Retorna os detalhes de um produto específico.
| `POST /products`     | Cria um novo produto.
| `PUT /products/:id`     | Atualiza os dados de um produto existente.
| `DELETE /products/:id`     | Exclui um produto específico.


<h3 id="routes">Sales</h2>

| Rota               | Descrição                                          
|----------------------|-----------------------------------------------------
| `POST /sales`     | Registra uma nova venda associada a um cliente e produto.

<h2 id="routes">Dados para teste</h2>

As rotas foram testadas utilizando Insomnia, basta fazer o download do arquivo <a href="https://github.com/vitorroliveiraa/SalesSystem-API/blob/main/salessystem-insomnia-v2.json" target="_blank" download>clicando aqui</a> e importar dentro do Insomnia que todos os dados já ficarão disponiveis. Não é necessário copiar o token, as rotas tem acesso através de uma configuração da própria ferramenta.

Exemplo:

<img src="./gif-ss.gif"></img>
