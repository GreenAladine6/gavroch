Project Architecture: 
my-project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx
│   │   │   ├── router.tsx
│   │   │   └── providers/
│   │   │
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── layout/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   ├── types/
│   │   │   │   └── pages/
│   │   │   │
│   │   │   └── users/
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       ├── services/
│   │   │       ├── types/
│   │   │       └── pages/
│   │   │
│   │   ├── hooks/
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── interceptors.ts
│   │   ├── stores/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── main.tsx
│   │
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   └── products/
│   │   │
│   │   ├── shared/
│   │   │   ├── exceptions/
│   │   │   ├── decorators/
│   │   │   ├── guards/
│   │   │   ├── filters/
│   │   │   └── interceptors/
│   │   │
│   │   └── config/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   │
│   ├── test/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/
│       ├── ci-frontend.yml
│       ├── ci-backend.yml
│       ├── ci.yml
│       └── deploy.yml
│
├── docker/
│   ├── frontend/
│   └── backend/
│
├── docs/
│   ├── architecture.md
│   ├── api-documentation.md
│   └── deployment.md
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .gitignore
├── .dockerignore
├── .editorconfig
├── .env.example
├── README.md
└── LICENSE








commande pour connecter au database: "docker exec -it Gavroch_postgres   psql -U postgres -d Gavroch"