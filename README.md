# Santiago - Roteiro Chile

Roteiro 6 dias em Santiago chile

## Migração para Vue 3

### 1. Setup Inicial

```bash
# Criar novo projeto Vue 3
npm create vue@latest

# Instalar dependências
npm install

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configurar GitHub Pages

1. No repositório GitHub, ir em Settings > Pages
2. Em "Source", selecionar "Deploy from a branch"
3. Selecionar branch `gh-pages` e pasta `/(root)`
4. Salvar

### 3. Configurar Deploy Automático

1. Criar pasta `.github/workflows` no projeto
2. Criar arquivo `deploy.yml` com workflow de deploy
3. Conteúdo do workflow:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. Estrutura do Projeto

```
santiago/
├── src/
│   ├── components/      # Componentes Vue (Header, Nav, DayCard)
│   ├── views/          # Páginas
│   ├── assets/         # Imagens e estilos
│   └── App.vue         # Componente raiz
├── dist/               # Arquivos buildados (gerado automaticamente)
└── public/             # Arquivos estáticos
```

### 5. Comandos Importantes

```bash
# Desenvolvimento local
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### 6. Próximos Passos

1. Mover HTML atual para componentes Vue
2. Mover estilos para arquivos .vue ou Tailwind
3. Testar localmente
4. Fazer commit e push para o GitHub
5. Verificar deploy automático em `https://[seu-usuario].github.io/santiago`
