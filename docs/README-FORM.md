# Documentação dos Formulários de Administração

Este documento descreve os formulários de administração utilizados para gerenciar o conteúdo do site de roteiro de viagem no Firebase, bem como a estrutura de componentes implementada.

## Menu Lateral de Administração

O menu lateral é acessado através de um ícone no topo do site (header). Este menu contém links para todos os formulários de administração.

### Estrutura de Componentes

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.jsx        # Layout principal da área administrativa
│   │   ├── AdminSidebar.jsx       # Menu lateral com navegação
│   │   ├── AdminHeader.jsx        # Cabeçalho da área administrativa
│   │   ├── forms/                 # Pasta com todos os formulários
│   │   │   ├── SiteHeaderForm.jsx
│   │   │   ├── SiteFooterForm.jsx
│   │   │   ├── SiteMetadataForm.jsx
│   │   │   ├── TripInfoForm.jsx
│   │   │   ├── ItineraryForm.jsx
│   │   │   ├── ActivityForm.jsx
│   │   │   ├── LocationForm.jsx
│   │   │   └── TipsForm.jsx
│   │   └── common/                # Componentes reutilizáveis
│   │       ├── FormField.jsx
│   │       ├── ImageUploader.jsx
│   │       ├── RichTextEditor.jsx
│   │       ├── SaveButton.jsx
│   │       └── DeleteButton.jsx
```

## Formulários Implementados

### 1. SiteHeaderForm

**Objetivo**: Gerenciar o cabeçalho do site.
**Campos**:

- Logo (upload de imagem)
- Links de navegação (array com título e URL)
- Botões de ação (CTA)
- Redes sociais

### 2. SiteFooterForm

**Objetivo**: Gerenciar o rodapé do site.
**Campos**:

- Título
- Descrição
- Data
- Contatos importantes (nome, contato, Instagram, WhatsApp, rota, link opcional)
- Texto de copyright
- Logo do rodapé
- Informações de contato

### 3. SiteMetadataForm

**Objetivo**: Gerenciar metadados e SEO.
**Campos**:

- Título do site
- Descrição
- Palavras-chave
- Favicon
- Imagem de compartilhamento (Open Graph)
- Scripts de analytics

### 4. TripInfoForm

**Objetivo**: Gerenciar informações básicas da viagem.
**Campos**:

- Título da viagem
- Destino
- Descrição
- Imagem de capa
- Datas
- Duração
- Visão geral

### 5. ItineraryForm

**Objetivo**: Gerenciar dias do itinerário.
**Campos**:

- Número do dia
- Título do dia
- Descrição
- Data
- Lista de atividades (referências)
- Alojamento
- Deslocamentos

### 6. ActivityForm

**Objetivo**: Gerenciar atividades.
**Campos**:

- Título da atividade
- Tipo (turismo, alimentação, transporte, etc.)
- Localização (referência ou novo)
- Descrição
- Horário/Duração
- Preço/Custo
- Imagens
- Links externos
- Notas

### 7. LocationForm

**Objetivo**: Gerenciar locais.
**Campos**:

- Nome do local
- Tipo (restaurante, atração, hotel, etc.)
- Endereço
- Coordenadas (latitude/longitude)
- Descrição
- Imagens
- Links externos
- Horários de funcionamento
- Contato

### 8. TipsForm

**Objetivo**: Gerenciar dicas de viagem.
**Campos**:

- Categorias de dicas (transporte, hospedagem, alimentação, etc.)
- Lista de dicas por categoria
- Recomendações gerais
- Alertas/Avisos importantes

## Integração com Firebase

Todos os formulários utilizam os métodos do serviço `firebaseWriteService.js` para salvar os dados:

- `updateSiteHeader()` - Para o formulário SiteHeaderForm
- `updateSiteFooter()` - Para o formulário SiteFooterForm
- `updateTripInfo()` - Para o formulário TripInfoForm
- `addOrUpdateActivity()` - Para o formulário ActivityForm
- `addOrUpdateDay()` - Para o formulário ItineraryForm
- `updateTips()` - Para o formulário TipsForm
- `addOrUpdateLocation()` - Para o formulário LocationForm
- `addOrUpdateLink()` - Para gerenciar links úteis

Para operações mais genéricas, são utilizados os métodos:

- `setDocument()`
- `updateDocument()`
- `addDocument()`
- `deleteDocument()`

## Autenticação e Segurança

A área de administração é protegida por autenticação. O fluxo implementado inclui:

1. Tela de login para administradores
2. Proteção de rotas para acesso apenas aos usuários autenticados
3. Armazenamento seguro do token de autenticação
4. Token de administrador (`ADMIN_TOKEN`) para autorizar operações de escrita

Os formulários só estão disponíveis para usuários autenticados e somente aparecem no menu lateral quando o usuário tem permissões de administrador.

## Regras de Segurança do Firestore

As regras de segurança do Firestore verificam a presença do token de administrador para permitir operações de escrita:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regra para permitir leitura pública
    match /{document=**} {
      allow read: true;
    }

    // Regra para permitir escrita apenas com token de administrador
    match /{collection}/{document=**} {
      allow write: if request.resource.data.adminToken == "Oxd3Xk7F7XTzfELkxS74";
    }
  }
}
```

## Manutenção e Expansão

Para adicionar novos formulários ou campos:

1. Criar o componente de formulário na pasta `forms/`
2. Implementar os métodos de serviço necessários em `firebaseWriteService.js`
3. Adicionar rota no menu de administração
4. Testar com dados reais
