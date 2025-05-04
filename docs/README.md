# 📚 Documentação do Projeto Santiago Trip

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura de Dados no Firebase](#estrutura-de-dados-no-firebase)
- [Camada de Serviços](#camada-de-serviços)
- [Mapeamento de Páginas e Componentes](#mapeamento-de-páginas-e-componentes)
- [Administração do Conteúdo](#administração-do-conteúdo)
- [Scripts de Utilidade](#scripts-de-utilidade)
- [FAQs e Troubleshooting](#faqs-e-troubleshooting)

---

## 🌐 Visão Geral

O **Santiago Trip** é um site de roteiro de viagem para Santiago do Chile, desenvolvido com Vue.js. O site exibe informações detalhadas sobre um itinerário de 8 dias, incluindo locais a visitar, atividades, dicas, e mais.

### 🎯 Objetivos do Projeto

- Exibir um roteiro detalhado de viagem
- Estruturar os dados de forma organizada e fácil de manter
- Permitir edições do conteúdo através do Firebase

### 🔧 Tecnologias Utilizadas

- **Frontend**: Vue.js
- **Armazenamento de Dados**: Firebase/Firestore
- **Deploy**: GitHub Pages

---

## 🏗️ Arquitetura

O projeto usa uma arquitetura baseada em componentes Vue.js com uma camada de serviços para acesso a dados. Os dados são armazenados no Firebase Firestore.

```
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│  Componentes  │ ←──→ │   Serviços    │ ←──→ │    Dados      │
│    (Vue.js)   │      │(firebaseServices)│    │ (Firebase)    │
└───────────────┘      └───────────────┘      └───────────────┘
```

A camada de serviços abstrai a fonte de dados, permitindo um acesso consistente independente da implementação.

---

## 📄 Estrutura de Dados no Firebase

Os dados do site estão organizados no Firebase Firestore com a seguinte estrutura:

### 🏢 Configuração do Firebase

O projeto usa as seguintes configurações Firebase:

```javascript
// src/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyBLe2TOSDo7xeMZh4ARVXbd1FiPCVCUNGo",
  authDomain: "roteiroviagem-b5116.firebaseapp.com",
  projectId: "roteiroviagem-b5116",
  storageBucket: "roteiroviagem-b5116.firebasestorage.app",
  messagingSenderId: "872269638046",
  appId: "1:872269638046:web:2718740bd2eba8ba028e8f",
  measurementId: "G-EV395T3365",
};
```

### 🏢 Coleções e Documentos no Firestore

| Coleção/Documento               | Descrição                     | Estrutura                                                |
| ------------------------------- | ----------------------------- | -------------------------------------------------------- |
| **site/header**                 | Informações do cabeçalho      | Título, subtítulo, imagem de fundo, período da viagem    |
| **site/footer**                 | Informações do rodapé         | Copyright, links, contatos                               |
| **site/metadata**               | Metadados do site             | SEO, título, descrição                                   |
| **trips/{tripId}/info/details** | Informações gerais da viagem  | ID, título, descrição, datas, destino, imagem            |
| **trips/{tripId}/info/tips**    | Dicas e recomendações         | Categorias de dicas                                      |
| **trips/{tripId}/itinerary**    | Coleção de dias do itinerário | Array de documentos, cada um representando um dia        |
| **trips/{tripId}/activities**   | Coleção de atividades         | Array de documentos, cada um representando uma atividade |
| **trips/{tripId}/locations**    | Coleção de locais             | Array de documentos, cada um representando um local      |
| **trips/{tripId}/links**        | Coleção de links úteis        | Array de documentos com links relevantes para a viagem   |

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
┌─────────────┐     ┌─────────────┐
│    tips     │ ←── │    links    │
└─────────────┘     └─────────────┘
```

- **Dias do itinerário** referenciam **atividades** por ID através da estrutura `schedule`
- **Atividades** referenciam **locais** por ID
- **Dicas** e **Links** complementam as informações do itinerário

---

## 🛠️ Camada de Serviços

A camada de serviços (`/src/services/`) facilita o acesso aos dados do Firebase.

### 📁 Estrutura de Arquivos

| Arquivo                     | Propósito                                                    |
| --------------------------- | ------------------------------------------------------------ |
| **index.js**                | Exporta todos os serviços centralizadamente                  |
| **config.js**               | Configurações (isUsingFirebase = true, caminhos de coleções) |
| **firebaseDataService.js**  | Implementação para buscar dados do Firebase                  |
| **firebaseWriteService.js** | Implementação para gravar dados no Firebase                  |

### 🔄 Funções Principais para Leitura

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

// Obter links úteis
const links = await getLinks("santiago");
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

### 🔄 Funções Principais para Escrita

```javascript
// Atualizar informações da viagem
await updateTripInfo("santiago", tripInfoData);

// Atualizar cabeçalho do site
await updateSiteHeader(headerData);

// Atualizar rodapé do site
await updateSiteFooter(footerData);

// Adicionar ou atualizar atividade
await addOrUpdateActivity("santiago", "activity-id", activityData);

// Adicionar ou atualizar local
await addOrUpdateLocation("santiago", "location-id", locationData);

// Adicionar ou atualizar dia do itinerário
await addOrUpdateDay("santiago", "day-1", dayData);

// Adicionar ou atualizar link
await addOrUpdateLink("santiago", "link-id", linkData);
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
  this.dayActivities = this.activities.filter(activity => {
    // Verificar se a atividade está em algum período do dia no schedule
    if (this.day.schedule) {
      const allScheduleActivities = [
        ...(this.day.schedule.morning || []),
        ...(this.day.schedule.lunch || this.day.schedule.midDay || []),
        ...(this.day.schedule.afternoon || []),
        ...(this.day.schedule.evening || []),
        ...(this.day.schedule.night || [])
      ];
      return allScheduleActivities.includes(activity.id);
    }
    return false;
  });

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

## 👩‍💼 Administração do Conteúdo

O projeto inclui um conjunto de formulários administrativos para gerenciar o conteúdo.

### 🔒 Autenticação

Os formulários administrativos requerem autenticação. O sistema utiliza um token de administrador (`ADMIN_TOKEN`) para autorização das operações de escrita.

### 📝 Formulários Disponíveis

- **SiteHeaderForm**: Gerencia cabeçalho do site
- **SiteFooterForm**: Gerencia rodapé do site
- **SiteMetadataForm**: Gerencia metadados e SEO
- **TripInfoForm**: Gerencia informações básicas da viagem
- **ItineraryForm**: Gerencia dias do itinerário
- **ActivityForm**: Gerencia atividades
- **LocationForm**: Gerencia locais
- **TipsForm**: Gerencia dicas de viagem

### 🔄 Integração com Firebase

Todos os formulários utilizam os métodos do serviço `firebaseWriteService.js` para salvar os dados no Firebase. As operações incluem:

- Criação de novos documentos
- Atualização de documentos existentes
- Exclusão de documentos

---

## 🔧 Scripts de Utilidade

O projeto inclui scripts utilitários para ajudar na manutenção e administração dos dados.

### 📥 Script de Backup do Firebase

O script `firebase-backup.js` permite fazer um backup completo de todos os dados do Firebase Firestore para arquivos JSON locais.

#### Como usar

```bash
# Instalar dependências (se ainda não tiver)
npm install firebase

# Executar o script (o backup será salvo na pasta padrão 'firebase-backup')
node scripts/firebase-backup.js

# Ou especificar uma pasta de destino personalizada
node scripts/firebase-backup.js ./meu-backup
```

#### Requisitos e notas

- O script utiliza ES Modules (formato de módulos ECMAScript)
- É compatível com Node.js versão 14+
- Requer que o pacote Firebase esteja instalado: `npm install firebase`
- Todos os dados são armazenados com formatação JSON para fácil leitura
- **Importante**: A pasta de destino é **completamente removida** antes de cada backup, garantindo que o resultado represente fielmente o estado atual do Firebase sem dados obsoletos

#### O que é feito no backup

O script faz backup de:

1. **Dados do site**:

   - Header, footer e metadata

2. **Dados da viagem (santiago)**:

   - Informações básicas (details, tips)
   - Coleções completas (itinerary, activities, locations, links)

3. **Estrutura de arquivos gerada**:
   ```
   firebase-backup/
   ├── site/
   │   ├── header.json
   │   ├── footer.json
   │   └── metadata.json
   ├── site.json  # Agregado de todos os documentos
   ├── trips/
   │   └── santiago/
   │       ├── info/
   │       │   ├── details.json
   │       │   └── tips.json
   │       ├── itinerary/
   │       │   ├── day-1.json
   │       │   ├── day-2.json
   │       │   └── ...
   │       ├── activities/
   │       │   ├── activity-1.json
   │       │   ├── activity-2.json
   │       │   └── ...
   │       ├── locations/
   │       │   ├── location-1.json
   │       │   ├── location-2.json
   │       │   └── ...
   │       └── links/
   │           ├── link-1.json
   │           ├── link-2.json
   │           └── ...
   ├── trips_santiago_itinerary.json  # Agregado da coleção
   ├── trips_santiago_activities.json # Agregado da coleção
   ├── trips_santiago_locations.json  # Agregado da coleção
   └── trips_santiago_links.json      # Agregado da coleção
   ```

### 🔄 Script de Migração para Firebase

O projeto também inclui o script `migrate-to-firebase.js` que foi utilizado para a migração inicial dos dados de JSON local para o Firebase. Este script pode servir como referência para futuras migrações.

---

## ❓ FAQs e Troubleshooting

### Como adicionar uma nova viagem?

1. Criar uma nova estrutura de coleções no Firebase para a nova viagem
2. Adicionar os documentos base (info, tips) e as coleções (itinerary, activities, locations)
3. Usar os serviços existentes passando o novo ID de viagem

### Como padronizar a estrutura do itinerário?

Todos os dias na coleção `itinerary` devem usar o formato `schedule` para organizar as atividades por períodos do dia:

```json
"schedule": {
  "morning": ["atividade-1", "atividade-2"],
  "lunch": ["atividade-almoço"],
  "afternoon": ["atividade-3"],
  "evening": ["atividade-4"],
  "night": ["atividade-5"]
}
```

Cada período (morning, lunch/midDay, afternoon, evening, night) deve conter um array de IDs de atividades ou strings.

### Erros comuns

**Erro**: `Cannot read properties of null (reading 'find')`  
**Solução**: Verificar se os dados foram carregados antes de usá-los, adicionando verificações `if (this.data) { ... }`

**Erro**: `FirebaseError: Missing or insufficient permissions`  
**Solução**: Verificar se o token de administração está sendo incluído nas operações de escrita e se as regras de segurança do Firestore estão configuradas corretamente

**Erro**: `FirebaseError: Document does not exist`  
**Solução**: Garantir que o documento referenciado existe no caminho especificado no Firestore

---

## 📚 Recursos Adicionais

- [Vue.js Docs](https://vuejs.org/guide/introduction.html)
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
