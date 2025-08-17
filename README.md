# API REST Node.js com Prisma

Uma API REST completa construída em Node.js usando Prisma como ORM e seguindo a arquitetura MVC.

## 🚀 Características

- **Node.js** com Express
- **Prisma** como ORM
- **Arquitetura MVC** (Model-View-Controller)
- **Validação** de dados com express-validator
- **Segurança** com helmet e cors
- **PostgreSQL** como banco de dados
- **Estrutura organizada** e escalável
- **Dashboard HTML** para testar todas as rotas

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL instalado e rodando
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório e instale as dependências:**

```bash
npm install
```

2. **Configure as variáveis de ambiente:**

```bash
cp env.example .env
```

3. **Edite o arquivo `.env` com suas configurações de banco:**

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
PORT=3000
NODE_ENV=development
```

4. **Configure o banco de dados:**

```bash
# Gerar cliente Prisma
npm run prisma:generate

# Executar migrações
npm run prisma:migrate
```

## 🚀 Executando a aplicação

### Modo desenvolvimento (com hot-reload):

```bash
npm run dev
```

### Modo produção:

```bash
npm start
```

### Abrir Prisma Studio:

```bash
npm run prisma:studio
```

## 🌐 Dashboard Interativo

A API inclui um dashboard HTML completo para testar todas as rotas:

**Acesse:** http://localhost:3000/dashboard

### ✨ Funcionalidades do Dashboard:

- **Status da API** em tempo real
- **Teste interativo** de todos os endpoints
- **Formulários** para criar, atualizar e deletar usuários
- **Visualização** das respostas da API
- **Estatísticas** de requisições (total, sucessos, erros)
- **Interface responsiva** e moderna
- **Cores diferentes** para cada método HTTP (GET, POST, PUT, DELETE)

## 📚 Endpoints da API

### Usuários

- `GET /api/users` - Listar todos os usuários
- `POST /api/users` - Criar novo usuário
- `GET /api/users/:id` - Buscar usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Exemplo de uso:

#### Criar usuário:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@email.com"}'
```

#### Listar usuários:

```bash
curl http://localhost:3000/api/users
```

## 🏗️ Estrutura do Projeto

```
src/
├── config/
│   └── database.js      # Configuração do Prisma
├── controllers/
│   └── UserController.js # Controller de usuários
├── middleware/
│   └── validation.js    # Validações
├── models/
│   └── User.js          # Modelo de usuário
├── routes/
│   ├── index.js         # Rotas principais
│   └── userRoutes.js    # Rotas de usuários
├── server.js            # Servidor principal
└── public/
    └── index.html       # Dashboard HTML
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em desenvolvimento com nodemon
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:migrate` - Executa migrações do banco
- `npm run prisma:studio` - Abre o Prisma Studio

## 📝 Exemplo de Modelo no Prisma

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

## 🚨 Importante

- **Configure corretamente** a variável `DATABASE_URL` no arquivo `.env`
- **Execute as migrações** antes de usar a API
- **Verifique se o PostgreSQL** está rodando na porta configurada
- **Use o dashboard** para testar todas as funcionalidades

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
