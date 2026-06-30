# instaCimol
instaCimol - Rede Social Simples

Sistema web de rede social desenvolvido para criação e interação entre usuários por meio de posts com imagens, curtidas e comentários.

Tecnologias utilizadas
Node.js
Express
MongoDB (Mongoose)
EJS
CSS
JSON Web Token (JWT)
Bcrypt
Multer
Dotenv

Justificativa das tecnologias
Express: framework leve e eficiente para criação de aplicações web
MongoDB: banco de dados NoSQL flexível e adequado para dados não estruturados
EJS: motor de templates para renderização no lado do servidor
JWT: autenticação baseada em tokens sem necessidade de sessão no servidor
Bcrypt: criptografia de senhas para maior segurança
Multer: gerenciamento de upload de arquivos
Dotenv: controle de variáveis de ambiente e segurança de dados sensíveis

Funcionalidades
Cadastro de usuários
Autenticação com login e senha
Proteção de rotas privadas
Criação de posts com imagens
Sistema de curtidas
Sistema de comentários
Feed com ordenação por data
Upload e exibição de imagens

Estrutura do projeto
projeto/
├── config/
├── controllers/
│   ├── authController.js
│   └── postController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── authRoutes.js
│   └── postRoutes.js
├── views/
│   ├── partials/
│   ├── feed.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── home.ejs
│   ├── choose.ejs
│   └── loading.ejs
├── public/
│   ├── style.css
│   └── img/
├── uploads/
├── .env
├── .env.example
├── app.js
└── package.json

Instalação
Clonar o repositório
Instalar dependências:
npm install
Criar arquivo .env com base no .env.example:
PORT=3000
MONGO_URI=mongodb://localhost:27017/instacimol
JWT_SECRET=sua_chave_secreta
Iniciar o projeto:
npm run dev
Acessar no navegador:
http://localhost:3000

Funcionamento do sistema
Autenticação
As senhas são criptografadas utilizando bcrypt
Após login, um token JWT é gerado
O token é armazenado em cookie
Middleware valida o token para acesso a rotas protegidas
Posts
Cada post possui título, descrição e imagem
Imagens são armazenadas via Multer
O feed exibe posts ordenados por data de criação
Usuários podem curtir e comentar posts
Comentários são armazenados dentro do documento do post

Segurança
Criptografia de senhas com bcrypt
Autenticação baseada em JWT
Proteção de rotas privadas
Variáveis sensíveis armazenadas no arquivo .env
Observações
O diretório uploads/ é necessário para armazenamento de imagens
O arquivo .env não deve ser incluído no controle de versão
O MongoDB deve estar em execução localmente
Possíveis melhorias futuras
Sistema de perfil de usuário
Seguir e deixar de seguir usuários
Sistema de mensagens
Stories
Melhor responsividade para dispositivos móveis
Modo escuro

Autor

Arianne