# Migração para Firebase

Para migrar os dados locais para o Firestore, siga este passo simples:

1. Execute o script de migração:

   ```bash
   node scripts/migrate-to-firebase.js
   ```

2. Verifique no Firebase Console se os dados foram migrados corretamente

3. Já está tudo configurado! O aplicativo já está usando o Firebase:
   - O arquivo `src/services/config.js` está configurado com `isUsingFirebase = true`
   - O arquivo `src/firebase.js` já contém suas credenciais
   - Os dados serão buscados do Firestore automaticamente

Não é necessário nenhuma configuração adicional, pois o script usa as mesmas credenciais do Firebase que já estão configuradas no projeto.

## Token de Administrador para Escrita

As regras de segurança do Firestore exigem um token de administrador para operações de escrita:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
      allow write: if request.resource.data.adminToken == "Oxd3Xk7F7XTzfELkxS74";
    }
  }
}
```

Este token está configurado nos seguintes arquivos:

- `src/services/firebaseWriteService.js` - Para operações de escrita na aplicação
- `scripts/migrate-to-firebase.js` - Para migração de dados

Ao utilizar estas funções, o token será automaticamente incluído nas operações de escrita.
