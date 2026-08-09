# InstaCimol — API REST

O **InstaCimol** foi originalmente desenvolvido como uma aplicação de rede social. Posteriormente, o projeto foi utilizado como base para atividades acadêmicas de **Banco de Dados e desenvolvimento de APIs REST**, incorporando uma nova estrutura baseada em Node.js, Express e MySQL.

Nesta etapa, foram implementados autenticação com JWT, operações CRUD, rotas protegidas, documentação com Swagger, deploy da API e um cliente frontend separado para consumo dos endpoints.

> **Observação:** entidades como produtos, categorias, clientes e pedidos fazem parte da atividade acadêmica de Banco de Dados e não pertencem ao conceito original da rede social InstaCimol.

---

## 🌐 Projeto em produção

- **Frontend:** https://instacimol-frontend.vercel.app
- **API:** https://instacimol.onrender.com
- **Documentação Swagger:** https://instacimol.onrender.com/api-docs

O frontend está hospedado na **Vercel** e consome a API REST hospedada no **Render**. O banco de dados MySQL utilizado pela API está hospedado no **Aiven**.

---

## 🛠️ Tecnologias utilizadas

### Backend

- Node.js
- Express
- MySQL
- JWT (JSON Web Token)
- bcrypt
- dotenv
- cookie-parser
- CORS
- Swagger (`swagger-jsdoc` e `swagger-ui-express`)

### Frontend

- HTML
- CSS
- JavaScript
- Fetch API

### Deploy e infraestrutura

- Render — hospedagem da API
- Vercel — hospedagem do frontend
- Aiven — hospedagem do banco de dados MySQL
- GitHub — versionamento do código

---

## 💡 Justificativa das tecnologias

- **Express:** framework utilizado para construção da API REST e gerenciamento das rotas.
- **MySQL:** banco de dados relacional utilizado para armazenamento estruturado dos dados.
- **JWT:** utilizado para autenticação baseada em tokens e proteção dos endpoints.
- **Swagger:** fornece documentação interativa e permite testar os endpoints da API.
- **bcrypt:** utilizado para armazenamento seguro das senhas através de hash.
- **dotenv:** permite separar configurações e informações sensíveis do código-fonte.
- **CORS:** controla quais origens podem realizar requisições para a API.
- **Fetch API:** utilizada pelo frontend para realizar requisições HTTP para a API REST.

---

# ⚙️ Funcionalidades

## Autenticação

- Cadastro de usuários
- Login
- Geração de token JWT
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

## Cliente frontend

Foi desenvolvido um frontend separado para demonstrar o consumo da API REST.

A interface permite:

- realizar login utilizando a API;
- receber e armazenar o token JWT;
- realizar requisições autenticadas;
- consultar os produtos cadastrados no banco de dados;
- exibir dinamicamente os dados retornados pela API.

---

# 🔐 Autenticação e rotas protegidas

Após realizar login, a API retorna um token JWT.

Esse token deve ser enviado nas requisições para endpoints protegidos através do cabeçalho:

```http
Authorization: Bearer TOKEN
```

O middleware de autenticação verifica o token antes de permitir o acesso à rota solicitada.

---

# 📁 Estrutura do backend

```text
instaCimol/
├── config/
│   ├── database.js
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── categoriaController.js
│   ├── clienteController.js
│   ├── pedidoController.js
│   ├── postController.js
│   └── produtoController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── categoriaModel.js
│   ├── clienteModel.js
│   ├── pedidoModel.js
│   ├── post.js
│   ├── produtoModel.js
│   ├── user.js
│   └── usuarioModel.js
├── public/
├── routes/
│   ├── authRoutes.js
│   ├── categoriaRoutes.js
│   ├── clienteRoutes.js
│   ├── pedidoRoutes.js
│   ├── postRoutes.js
│   └── produtoRoutes.js
├── views/
├── .env.example
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

O cliente frontend é mantido separadamente no repositório `instacimol-frontend`.

---

# 💻 Instalação local

Clone o repositório:

```bash
git clone https://github.com/ariannearruda/instaCimol.git
```

Entre na pasta do projeto e instale as dependências:

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
DB_PORT=3306

JWT_SECRET=sua_chave_secreta

API_URL=http://localhost:3000
FRONTEND_URL=http://127.0.0.1:5500
```

Depois, inicie o servidor:

```bash
npm run dev
```

ou:

```bash
node app.js
```

---

# 📚 Documentação da API

Com o servidor executando localmente, a documentação Swagger pode ser acessada em:

```text
http://localhost:3000/api-docs
```

Em produção:

```text
https://instacimol.onrender.com/api-docs
```

A interface Swagger permite visualizar e testar os endpoints disponíveis.

---

# 🚀 Deploy

A aplicação utiliza uma arquitetura com serviços separados:

```text
Frontend (Vercel)
        ↓
   requisições HTTP
        ↓
API REST (Render)
        ↓
     MySQL
        ↓
     Aiven
```

O CORS da API é configurado para permitir requisições provenientes do frontend autorizado.

As configurações de produção são armazenadas como variáveis de ambiente no serviço de hospedagem, evitando a exposição de credenciais no código-fonte.

---

# 🔒 Segurança

Foram implementadas medidas como:

- autenticação utilizando JWT;
- hash de senhas com bcrypt;
- middleware para proteção de rotas;
- Prepared Statements nas operações com o banco de dados;
- controle de origem das requisições através de CORS;
- credenciais e chaves armazenadas em variáveis de ambiente;
- arquivo `.env` ignorado pelo Git.

---

# 📝 Observações

- O arquivo `.env` não deve ser enviado para o GitHub.
- O arquivo `.env.example` serve como modelo de configuração.
- Para execução local, é necessário configurar uma instância MySQL compatível.
- A versão em produção utiliza banco de dados remoto.
- Por utilizar serviços gratuitos de hospedagem, a primeira requisição à API pode apresentar um tempo maior de resposta após períodos de inatividade.

---

# 🔮 Possíveis melhorias futuras

- Paginação das consultas
- Filtros de pesquisa
- Upload de imagens para produtos
- Controle de permissões por usuário
- Testes automatizados
- Docker para facilitar a implantação

---

# 👩‍💻 Autora

**Arianne Arruda**