# 📚 Documentação do Projeto Santiago Trip

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura de Arquivos JSON](#estrutura-de-arquivos-json)
- [Camada de Serviços](#camada-de-serviços)
- [Mapeamento de Páginas e Componentes](#mapeamento-de-páginas-e-componentes)
- [Migração para Firebase](#migração-para-firebase)
- [FAQs e Troubleshooting](#faqs-e-troubleshooting)

---

## 🌐 Visão Geral

O **Santiago Trip** é um site de roteiro de viagem para Santiago do Chile, desenvolvido com Vue.js. O site exibe informações detalhadas sobre um itinerário de 8 dias, incluindo locais a visitar, atividades, dicas, e mais.

### 🎯 Objetivos do Projeto

- Exibir um roteiro detalhado de viagem
- Estruturar os dados de forma organizada e fácil de manter
- Permitir edições futuras através do Firebase

### 🔧 Tecnologias Utilizadas

- **Frontend**: Vue.js
- **Armazenamento de Dados**: Arquivos JSON locais (com futura migração para Firebase)
- **Deploy**: GitHub Pages

---

## 🏗️ Arquitetura

O projeto usa uma arquitetura baseada em componentes Vue.js com uma camada de serviços para acesso a dados. Os dados são armazenados em arquivos JSON e futuramente serão migrados para o Firebase.

```
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│  Componentes  │ ←──→ │   Serviços    │ ←──→ │    Dados      │
│    (Vue.js)   │      │  (dataService) │      │ (JSON/Firebase)│
└───────────────┘      └───────────────┘      └───────────────┘
```

A camada de serviços abstrai a fonte de dados (JSON local ou Firebase), permitindo uma migração suave entre as duas opções.

---

## 📄 Estrutura de Arquivos JSON

Os dados do site estão organizados nos seguintes arquivos JSON:

### 🏢 Informações do Site (`/public/data/site/`)

| Arquivo           | Descrição                        | Estrutura Principal                                            |
| ----------------- | -------------------------------- | -------------------------------------------------------------- |
| **header.json**   | Informações do cabeçalho do site | Título, subtítulo, imagem de fundo, período da viagem          |
| **footer.json**   | Informações do rodapé do site    | Copyright, links de redes sociais, links de navegação          |
| **metadata.json** | Metadados do site                | Título, descrição, palavras-chave, autor, configurações de SEO |

### 🧳 Dados da Viagem - Santiago (`/public/data/trips/santiago/`)

| Arquivo             | Descrição                     | Estrutura Principal                                               |
| ------------------- | ----------------------------- | ----------------------------------------------------------------- |
| **trip-info.json**  | Informações gerais da viagem  | ID, título, descrição, datas, destino, imagem de capa             |
| **locations.json**  | Detalhes dos locais a visitar | Array de locais com ID, nome, coordenadas, descrição, imagens     |
| **activities.json** | Atividades disponíveis        | Array de atividades com ID, título, descrição, duração, categoria |
| **itinerary.json**  | Programação diária            | Array de dias com data, título, atividades, dicas, transporte     |
| **tips.json**       | Dicas e recomendações         | Categorias de dicas (clima, transporte, gastronomia, práticas)    |

### 📊 Relações entre os Dados

```
┌─────────────┐
│  trip-info  │
└─────────────┘
       ↓
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  itinerary  │ ←── │ activities  │ ←── │  locations  │
└─────────────┘     └─────────────┘     └─────────────┘
       ↓
┌─────────────┐
│    tips     │
└─────────────┘
```

- **Dias do itinerário** (`itinerary.json`) referenciam **atividades** por ID
- **Atividades** (`activities.json`) referenciam **locais** por ID
- **Dicas** (`tips.json`) complementam as informações do itinerário

---

## 🛠️ Camada de Serviços

A camada de serviços (`/src/services/`) facilita o acesso aos dados, abstraindo a fonte (JSON local ou Firebase).

### 📁 Estrutura de Arquivos

| Arquivo                    | Propósito                                        |
| -------------------------- | ------------------------------------------------ |
| **index.js**               | Exporta todos os serviços centralizadamente      |
| **config.js**              | Configurações e flags (fonte de dados, caminhos) |
| **dataService.js**         | Ponto de entrada principal para acesso aos dados |
| **localDataService.js**    | Implementação para buscar dados de JSONs locais  |
| **firebaseDataService.js** | Esqueleto para implementação futura do Firebase  |

### 🔄 Funções Principais

Todas as funções a seguir podem ser importadas de `@/services`:

#### Dados do Site

```javascript
// Obter dados do cabeçalho
const header = await getSiteHeader();

// Obter dados do rodapé
const footer = await getSiteFooter();

// Obter metadados do site
const metadata = await getSiteMetadata();
```

#### Dados da Viagem

```javascript
// Obter informações gerais da viagem
const tripInfo = await getTripInfo("santiago");

// Obter itinerário completo
const itinerary = await getItinerary("santiago");

// Obter todas as atividades
const activities = await getActivities("santiago");

// Obter todos os locais
const locations = await getLocations("santiago");

// Obter dicas e recomendações
const tips = await getTips("santiago");
```

#### Busca por ID

```javascript
// Buscar um dia específico do itinerário
const day = await getDayById("day-1", "santiago");

// Buscar uma atividade específica
const activity = await getActivityById("valle-nevado-sunset", "santiago");

// Buscar um local específico
const location = await getLocationById("hotel-panamericano", "santiago");
```

---

## 📱 Mapeamento de Páginas e Componentes

Esta seção detalha quais dados cada página/componente deve utilizar.

### 🏠 Página Inicial (Home)

**Componentes**: `HomePage.vue`

**Dados Necessários**:

- Header: `getSiteHeader()`
- Trip Info: `getTripInfo('santiago')`
- Footer: `getSiteFooter()`

**Exemplo de Uso**:

```javascript
import { getSiteHeader, getTripInfo, getSiteFooter } from '@/services';

async created() {
  this.header = await getSiteHeader();
  this.tripInfo = await getTripInfo('santiago');
  this.footer = await getSiteFooter();
}
```

### 📅 Página de Itinerário

**Componentes**: `ItineraryPage.vue`, `DayCard.vue`

**Dados Necessários**:

- Header: `getSiteHeader()`
- Itinerary: `getItinerary('santiago')`
- Activities: `getActivities('santiago')` (para relacionar com os dias)
- Locations: `getLocations('santiago')` (para mostrar mapas/detalhes)
- Footer: `getSiteFooter()`

**Exemplo de Uso**:

```javascript
import { getSiteHeader, getItinerary, getActivities, getLocations, getSiteFooter } from '@/services';

async created() {
  this.header = await getSiteHeader();
  this.itinerary = await getItinerary('santiago');
  this.activities = await getActivities('santiago');
  this.locations = await getLocations('santiago');
  this.footer = await getSiteFooter();

  // Relacionar atividades com dias
  this.processedItinerary = this.itinerary.map(day => {
    // Processar detalhes aqui
    return processedDay;
  });
}
```

### 📌 Página de Detalhe de Dia

**Componentes**: `DayDetailPage.vue`, `ActivityItem.vue`

**Dados Necessários**:

- Header: `getSiteHeader()`
- Dia Específico: `getDayById('day-1', 'santiago')`
- Atividades: `getActivities('santiago')` (filtrar pelo dia)
- Locais: `getLocations('santiago')` (relacionar com atividades)
- Footer: `getSiteFooter()`

**Exemplo de Uso**:

```javascript
import { getSiteHeader, getDayById, getActivities, getLocations, getSiteFooter } from '@/services';

async created() {
  const dayId = this.$route.params.id; // Exemplo: 'day-1'

  this.header = await getSiteHeader();
  this.day = await getDayById(dayId, 'santiago');
  this.activities = await getActivities('santiago');
  this.locations = await getLocations('santiago');
  this.footer = await getSiteFooter();

  // Filtrar atividades do dia
  this.dayActivities = this.activities.filter(activity =>
    this.day.activities.includes(activity.id)
  );

  // Relacionar atividades com locais
  this.dayActivitiesWithLocations = this.dayActivities.map(activity => {
    const location = this.locations.find(loc => loc.id === activity.locationId);
    return { ...activity, location };
  });
}
```

### 💡 Página de Dicas

**Componentes**: `TipsPage.vue`, `TipCategory.vue`

**Dados Necessários**:

- Header: `getSiteHeader()`
- Tips: `getTips('santiago')`
- Footer: `getSiteFooter()`

**Exemplo de Uso**:

```javascript
import { getSiteHeader, getTips, getSiteFooter } from '@/services';

async created() {
  this.header = await getSiteHeader();
  this.tips = await getTips('santiago');
  this.footer = await getSiteFooter();
}
```

---

## 🔄 Migração para Firebase

O projeto está preparado para migrar de JSONs locais para o Firebase quando necessário.

### Passos para Migração

1. **Configurar Firebase**:

   - Criar projeto no Firebase Console
   - Adicionar Firestore Database
   - Configurar autenticação (se necessário)

2. **Instalar Dependências**:

   ```bash
   npm install firebase
   ```

3. **Criar Arquivo de Configuração** (`src/firebase.js`):

   ```javascript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "...",
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```

4. **Implementar Métodos no firebaseDataService.js**:

   - Usar comentários existentes como guia
   - Implementar todas as funções para buscar dados do Firestore

5. **Atualizar Config**:

   - Alterar `isUsingFirebase = true` no arquivo `config.js`

6. **Testar**:
   - Verificar se todos os componentes funcionam com dados do Firebase

### 📊 Estrutura do Firestore

```
📁 site
  └── 📄 header
  └── 📄 footer
  └── 📄 metadata

📁 trips
  └── 📁 santiago
       └── 📄 info
       └── 📁 itinerary (collection)
            └── 📄 day-1
            └── 📄 day-2
            ...
       └── 📁 activities (collection)
            └── 📄 activity-1
            └── 📄 activity-2
            ...
       └── 📁 locations (collection)
            └── 📄 location-1
            └── 📄 location-2
            ...
       └── 📄 tips
```

---

## ❓ FAQs e Troubleshooting

### Como adicionar uma nova viagem?

1. Criar pasta com estrutura similar a `public/data/trips/santiago/` para a nova viagem
2. Atualizar `config.js` para incluir caminhos para a nova viagem
3. Usar os serviços existentes passando o novo ID de viagem

### Como modificar a estrutura de um JSON?

1. Atualizar o arquivo JSON
2. Verificar componentes que usam esse JSON para garantir compatibilidade
3. Atualizar testes relacionados (se existirem)

### Erros comuns

**Erro**: `Cannot read properties of null (reading 'find')`  
**Solução**: Verificar se os dados foram carregados antes de usá-los, adicionando verificações `if (this.data) { ... }`

**Erro**: `Fetch error for JSON file`  
**Solução**: Verificar caminhos em `localDataPaths` no arquivo `config.js` e garantir que os arquivos existem na pasta `public/data`

---

## 📚 Recursos Adicionais

- [Vue.js Docs](https://vuejs.org/guide/introduction.html)
- [Firebase Docs](https://firebase.google.com/docs)
- [JSON Schema Validator](https://www.jsonschemavalidator.net/) - Para validar estrutura dos JSONs
