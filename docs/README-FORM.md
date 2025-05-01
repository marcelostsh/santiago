# Documentação dos Formulários de Administração

Este documento descreve os formulários de administração necessários para gerenciar o conteúdo do site de roteiro de viagem, bem como a estrutura de componentes que será utilizada.

## Menu Lateral de Administração

O menu lateral será acessado através de um ícone no topo do site (header). Este menu conterá links para todos os formulários de administração.

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

## Formulários Necessários

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

Todos os formulários utilizarão os métodos do serviço `firebaseWriteService.js` para salvar os dados:

- `updateSiteHeader()` - Para o formulário SiteHeaderForm
- `updateSiteFooter()` - Para o formulário SiteFooterForm
- `updateTripInfo()` - Para o formulário TripInfoForm
- `addOrUpdateActivity()` - Para o formulário ActivityForm
- `addOrUpdateDay()` - Para o formulário ItineraryForm
- `updateTips()` - Para o formulário TipsForm

Para os outros formulários (metadados e locais), serão utilizados os métodos genéricos:

- `setDocument()`
- `updateDocument()`
- `addDocument()`
- `deleteDocument()`

## Fluxo de Autenticação

Para acessar os formulários de administração, será necessário implementar:

1. Tela de login para administradores
2. Proteção de rotas para acesso apenas aos usuários autenticados
3. Armazenamento seguro do token de autenticação

Os formulários só estarão disponíveis para usuários autenticados e somente aparecerão no menu lateral quando o usuário tiver permissões de administrador.

## Próximos Passos

1. Implementar o layout base da área administrativa
2. Desenvolver o componente de menu lateral
3. Criar os formulários individuais, começando pelos mais críticos
4. Integrar com o Firebase usando os métodos já existentes em `firebaseWriteService.js`
5. Implementar o fluxo de autenticação
