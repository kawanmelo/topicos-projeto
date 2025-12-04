# Sistema de Gerenciamento de Funcionários

Sistema completo de gerenciamento de funcionários desenvolvido seguindo a mesma estrutura do projeto 'clinica'.

## Estrutura do Projeto

```
gerenciamento-funcionarios/
├── api/                    # Backend (Node.js + Express + Prisma)
│   ├── prisma/
│   │   └── schema.prisma  # Schema do banco de dados
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── database/      # Configuração do Prisma
│   │   ├── routes/        # Rotas da API
│   │   ├── schemas/       # Validação com Zod
│   │   ├── services/      # Lógica de negócio
│   │   ├── index.ts       # Ponto de entrada
│   │   └── swagger.ts     # Configuração Swagger
│   └── package.json
└── frontend/              # Frontend (React + Vite + MUI)
    ├── src/
    │   ├── pages/         # Páginas da aplicação
    │   ├── services/      # Serviços de API
    │   ├── types/         # Definições TypeScript
    │   ├── App.tsx        # Componente principal
    │   └── index.css      # Estilos globais
    └── package.json
```

## Tecnologias Utilizadas

### Backend (API)
- **Node.js** com **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **Zod** - Validação de schemas
- **Swagger** - Documentação da API

### Frontend
- **React** com **TypeScript**
- **Vite** - Build tool
- **Material-UI (MUI)** - Componentes UI
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **TailwindCSS** - Estilos utilitários

## Funcionalidades

- ✅ Listar funcionários
- ✅ Criar novo funcionário
- ✅ Editar funcionário existente
- ✅ Excluir funcionário
- ✅ Validação de dados (frontend e backend)
- ✅ Interface responsiva com Material-UI
- ✅ Documentação Swagger da API

## Como Executar

### Pré-requisitos
- Node.js 18+ instalado

### Backend (API)

1. Entre no diretório da API:
```bash
cd api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (obrigatório para o Prisma). Copie o arquivo de exemplo e ajuste a URL do Postgres:
```bash
cp .env.example .env
```

Exemplo de configuração:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/gerenciamento_funcionarios?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@localhost:5432/gerenciamento_funcionarios?schema=public"
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

4. Execute as migrações do banco de dados:
```bash
npm run prisma:migrate
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A API estará rodando em `http://localhost:3000`
Documentação Swagger disponível em `http://localhost:3000/api-docs`

### Frontend

1. Entre no diretório do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## Modelo de Dados

### Employee (Funcionário)

| Campo     | Tipo     | Descrição                    |
|-----------|----------|------------------------------|
| id        | String   | UUID único                   |
| name      | String   | Nome do funcionário          |
| email     | String   | Email (único)                |
| position  | String   | Cargo/Posição                |
| salary    | Float    | Salário                      |
| createdAt | DateTime | Data de criação              |
| updatedAt | DateTime | Data da última atualização   |

## Endpoints da API

- `GET /employees` - Lista todos os funcionários
- `GET /employees/:id` - Busca funcionário por ID
- `POST /employees` - Cria novo funcionário
- `PUT /employees/:id` - Atualiza funcionário
- `DELETE /employees/:id` - Remove funcionário

## Scripts Disponíveis

### API
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Compila o projeto
- `npm start` - Inicia servidor de produção
- `npm run prisma:migrate` - Executa migrações
- `npm run prisma:studio` - Abre Prisma Studio

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Preview da build de produção
