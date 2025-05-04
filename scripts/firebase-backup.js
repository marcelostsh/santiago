/**
 * Script para fazer backup de todos os dados do Firebase Firestore
 * para arquivos JSON locais.
 * 
 * Uso: node firebase-backup.js [pasta_de_destino]
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc,
  getDoc, 
  getDocs,
  query, 
  where,
  collectionGroup
} from 'firebase/firestore';

// Configuração para usar __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLe2TOSDo7xeMZh4ARVXbd1FiPCVCUNGo",
  authDomain: "roteiroviagem-b5116.firebaseapp.com",
  projectId: "roteiroviagem-b5116",
  storageBucket: "roteiroviagem-b5116.firebasestorage.app",
  messagingSenderId: "872269638046",
  appId: "1:872269638046:web:2718740bd2eba8ba028e8f",
  measurementId: "G-EV395T3365"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Pasta de destino para os backups
const backupFolder = process.argv[2] || 'firebase-backup';

/**
 * Remove um diretório e todos os seus conteúdos de forma recursiva
 * @param {string} dirPath - O caminho do diretório a ser removido
 */
async function removeDirectory(dirPath) {
  try {
    // Verificar se o diretório existe
    try {
      await fs.access(dirPath);
    } catch (error) {
      // Diretório não existe, não precisa remover
      return;
    }

    // Ler o conteúdo do diretório
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    
    // Remover cada item dentro do diretório
    for (const item of items) {
      const itemPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
        // Se for um diretório, chamar recursivamente
        await removeDirectory(itemPath);
      } else {
        // Se for um arquivo, remover
        await fs.unlink(itemPath);
      }
    }
    
    // Remover o diretório vazio
    await fs.rmdir(dirPath);
    console.log(`Diretório removido: ${dirPath}`);
  } catch (error) {
    console.error(`Erro ao remover diretório ${dirPath}:`, error);
    throw error;
  }
}

/**
 * Cria uma pasta recursivamente
 * @param {string} dirPath - Caminho da pasta
 */
async function createDirectory(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Diretório criado: ${dirPath}`);
  } catch (error) {
    console.error(`Erro ao criar diretório ${dirPath}:`, error);
    throw error;
  }
}

/**
 * Salva dados em um arquivo JSON
 * @param {string} filePath - Caminho do arquivo
 * @param {object} data - Dados a serem salvos
 */
async function saveToJson(filePath, data) {
  try {
    const dirPath = path.dirname(filePath);
    await createDirectory(dirPath);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Arquivo salvo: ${filePath}`);
  } catch (error) {
    console.error(`Erro ao salvar arquivo ${filePath}:`, error);
  }
}

/**
 * Obtém um documento do Firestore
 * @param {string} collectionPath - Caminho da coleção
 * @param {string} docId - ID do documento
 */
async function getDocument(collectionPath, docId) {
  try {
    const docRef = doc(db, collectionPath, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log(`Documento não encontrado: ${collectionPath}/${docId}`);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao buscar documento ${collectionPath}/${docId}:`, error);
    return null;
  }
}

/**
 * Obtém todos os documentos de uma coleção
 * @param {string} collectionPath - Caminho da coleção
 */
async function getCollectionDocuments(collectionPath) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return documents;
  } catch (error) {
    console.error(`Erro ao buscar coleção ${collectionPath}:`, error);
    return [];
  }
}

/**
 * Faz backup de um documento específico
 * @param {string} collectionPath - Caminho da coleção
 * @param {string} docId - ID do documento
 */
async function backupDocument(collectionPath, docId) {
  const document = await getDocument(collectionPath, docId);
  if (document) {
    const filePath = path.join(backupFolder, collectionPath, `${docId}.json`);
    await saveToJson(filePath, document);
  }
}

/**
 * Faz backup de todos os documentos de uma coleção
 * @param {string} collectionPath - Caminho da coleção
 */
async function backupCollection(collectionPath) {
  const documents = await getCollectionDocuments(collectionPath);
  
  // Salva todos os documentos em arquivos individuais
  for (const document of documents) {
    const filePath = path.join(backupFolder, collectionPath, `${document.id}.json`);
    await saveToJson(filePath, document);
  }
  
  // Salva também um arquivo com toda a coleção
  const collectionFilePath = path.join(backupFolder, `${collectionPath}.json`);
  await saveToJson(collectionFilePath, documents);
}

/**
 * Faz backup de todas as coleções e documentos conhecidos
 */
async function backupAllData() {
  try {
    console.log(`Iniciando backup para a pasta: ${backupFolder}`);
    
    // Remover a pasta de backup anterior se existir
    console.log(`Removendo pasta de backup anterior (se existir)...`);
    await removeDirectory(backupFolder);
    
    // Criar nova pasta de backup
    await createDirectory(backupFolder);
    
    // Backup dos dados do site
    await backupDocument('site', 'header');
    await backupDocument('site', 'footer');
    await backupDocument('site', 'metadata');
    
    // Viagens (por enquanto só santiago, mas em um loop para futura expansão)
    const trips = ['santiago'];
    
    for (const tripId of trips) {
      // Info da viagem
      await backupDocument(`trips/${tripId}/info`, 'details');
      await backupDocument(`trips/${tripId}/info`, 'tips');
      
      // Coleções da viagem
      await backupCollection(`trips/${tripId}/itinerary`);
      await backupCollection(`trips/${tripId}/activities`);
      await backupCollection(`trips/${tripId}/locations`);
      await backupCollection(`trips/${tripId}/links`);
    }
    
    console.log('Backup concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o backup:', error);
  }
}

// Executa o backup
backupAllData(); 