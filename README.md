# InstaCimol - Migração para API REST

API REST desenvolvida em Node.js, Express e MySQL como parte da migração do projeto InstaCimol. A aplicação implementa autenticação com JWT e operações CRUD para gerenciamento de categorias, produtos, clientes e pedidos, utilizando documentação automática com Swagger.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- JWT (JSON Web Token)
- Swagger (swagger-jsdoc e swagger-ui-express)
- bcrypt
- dotenv
- cookie-parser

## Justificativa das tecnologias

- **Express:** framework para construção de APIs REST.
- **MySQL:** banco de dados relacional para armazenamento estruturado.
- **JWT:** autenticação baseada em tokens.
- **Swagger:** documentação interativa da API.
- **bcrypt:** criptografia das senhas dos usuários.
- **dotenv:** gerenciamento de variáveis de ambiente.
- **cookie-parser:** manipulação de cookies.

---

# Funcionalidades

## Autenticação

- Cadastro de usuários
- Login com geração de token JWT
- Proteção de rotas utilizando middleware de autenticação

## Categorias

- Listar categorias
- Buscar categoria por ID
- Criar categoria
- Atualizar categoria
- Excluir categoria

## Produtos

- Listar produtos
- Buscar produto por ID
- Criar produto
- Atualizar produto
- Excluir produto

## Clientes

- Listar clientes
- Buscar cliente por ID
- Criar cliente
- Atualizar cliente
- Excluir cliente

## Pedidos

- Listar pedidos
- Buscar pedido por ID
- Criar pedido
- Atualizar pedido
- Excluir pedido

---

# Estrutura do projeto

```
projeto/
├── config/
├── controllers/
│   ├── authController.js
│   ├── categoriaController.js
│   ├── clienteController.js
│   ├── pedidoController.js
│   └── produtoController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── usuarioModel.js
│   ├── categoriaModel.js
│   ├── clienteModel.js
│   ├── produtoModel.js
│   └── pedidoModel.js
├── routes/
│   ├── authRoutes.js
│   ├── categoriaRoutes.js
│   ├── clienteRoutes.js
│   ├── produtoRoutes.js
│   └── pedidoRoutes.js
├── public/
├── uploads/
├── .env.example
├── app.js
└── package.json
```

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/ariannearruda/instaCimol.git
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` com base no `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=loja
JWT_SECRET=sua_chave_secreta
```

Inicie o servidor:

```bash
npm run dev
```

ou

```bash
node app.js
```

---

# Documentação da API

Após iniciar o servidor, acesse:

```
http://localhost:3000/api-docs
```

A documentação Swagger permite testar todos os endpoints diretamente pelo navegador.

---

# Segurança

- Autenticação utilizando JWT.
- Senhas criptografadas com bcrypt.
- Rotas protegidas por middleware.
- Variáveis sensíveis armazenadas em `.env`.

---

# Observações

- O arquivo `.env` não deve ser enviado para o GitHub.
- Utilize o arquivo `.env.example` como modelo.
- É necessário possuir um servidor MySQL em execução.

---

# Possíveis melhorias futuras

- Paginação nas consultas.
- Filtros de pesquisa.
- Upload de imagens para produtos.
- Controle de permissões por usuário.
- Testes automatizados.
- Docker para facilitar a implantação.

---

# Autor

Arianne Arruda