import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Para obter __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Firebase (mesma usada no frontend)
const firebaseConfig = {
  apiKey: "AIzaSyBLe2TOSDo7xeMZh4ARVXbd1FiPCVCUNGo",
  authDomain: "roteiroviagem-b5116.firebaseapp.com",
  projectId: "roteiroviagem-b5116",
  storageBucket: "roteiroviagem-b5116.firebasestorage.app",
  messagingSenderId: "872269638046",
  appId: "1:872269638046:web:2718740bd2eba8ba028e8f",
  measurementId: "G-EV395T3365"
};

// Token de administrador necessário para permissões de escrita
const ADMIN_TOKEN = "Oxd3Xk7F7XTzfELkxS74";

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Caminhos dos arquivos JSON
const paths = {
  site: {
    header: path.join(__dirname, '../public/data/site/header.json'),
    footer: path.join(__dirname, '../public/data/site/footer.json'),
    metadata: path.join(__dirname, '../public/data/site/metadata.json')
  },
  trips: {
    santiago: {
      info: path.join(__dirname, '../public/data/trips/santiago/trip-info.json'),
      itinerary: path.join(__dirname, '../public/data/trips/santiago/itinerary.json'),
      activities: path.join(__dirname, '../public/data/trips/santiago/activities.json'),
      tips: path.join(__dirname, '../public/data/trips/santiago/tips.json')
    }
  }
};

// Ler arquivo JSON
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error);
    return null;
  }
}

// Adiciona o token de administrador aos dados
function addAdminToken(data) {
  return {
    ...data,
    adminToken: ADMIN_TOKEN
  };
}

// Funções de migração para cada tipo de dados
async function migrateSiteData() {
  console.log('Migrando dados do site...');
  
  // Header
  const header = readJsonFile(paths.site.header);
  if (header) {
    await setDoc(doc(db, 'site', 'header'), addAdminToken(header));
    console.log('✓ Header migrado com sucesso');
  }
  
  // Footer
  const footer = readJsonFile(paths.site.footer);
  if (footer) {
    await setDoc(doc(db, 'site', 'footer'), addAdminToken(footer));
    console.log('✓ Footer migrado com sucesso');
  }
  
  // Metadata
  const metadata = readJsonFile(paths.site.metadata);
  if (metadata) {
    await setDoc(doc(db, 'site', 'metadata'), addAdminToken(metadata));
    console.log('✓ Metadata migrado com sucesso');
  }
}

async function migrateTripData(tripId = 'santiago') {
  console.log(`Migrando dados da viagem ${tripId}...`);
  
  // Informações da viagem
  const tripInfo = readJsonFile(paths.trips[tripId].info);
  if (tripInfo) {
    await setDoc(doc(db, 'trips', tripId, 'info', 'details'), addAdminToken(tripInfo));
    console.log(`✓ Informações da viagem ${tripId} migradas com sucesso`);
  }
  
  // Dicas
  const tips = readJsonFile(paths.trips[tripId].tips);
  if (tips) {
    await setDoc(doc(db, 'trips', tripId, 'info', 'tips'), addAdminToken(tips));
    console.log(`✓ Dicas da viagem ${tripId} migradas com sucesso`);
  }
  
  // Itinerário
  const itinerary = readJsonFile(paths.trips[tripId].itinerary);
  if (itinerary && Array.isArray(itinerary)) {
    // Para o Firebase cliente, precisamos processar cada documento separadamente
    for (const day of itinerary) {
      if (day && day.id) {
        await setDoc(doc(db, 'trips', tripId, 'itinerary', day.id), addAdminToken(day));
      }
    }
    console.log(`✓ Itinerário da viagem ${tripId} migrado com sucesso (${itinerary.length} dias)`);
  }
  
  // Atividades
  const activities = readJsonFile(paths.trips[tripId].activities);
  if (activities && Array.isArray(activities)) {
    // Coletamos locais únicos das atividades para criar a coleção de locais
    const locationsMap = {};
    
    for (const activity of activities) {
      if (activity && activity.id) {
        await setDoc(doc(db, 'trips', tripId, 'activities', activity.id), addAdminToken(activity));
        
        // Se a atividade tem um local, adicionamos ao mapa de locais
        if (activity.location) {
          const locationId = activity.location.toLowerCase().replace(/\s+/g, '-');
          locationsMap[locationId] = {
            id: locationId,
            name: activity.location,
            type: activity.type || 'local',
            description: activity.description || '',
            images: activity.images || [],
            links: activity.links || {}
          };
        }
      }
    }
    
    console.log(`✓ Atividades da viagem ${tripId} migradas com sucesso (${activities.length} atividades)`);
    
    // Agora criamos os documentos de locais a partir das atividades
    if (Object.keys(locationsMap).length > 0) {
      for (const [locationId, locationData] of Object.entries(locationsMap)) {
        await setDoc(doc(db, 'trips', tripId, 'locations', locationId), addAdminToken(locationData));
      }
      
      console.log(`✓ Locais da viagem ${tripId} migrados com sucesso (${Object.keys(locationsMap).length} locais)`);
    }
  }
}

// Função principal de migração
async function migrateAll() {
  try {
    console.log('Iniciando migração para Firebase...');
    
    // Migrar dados do site
    await migrateSiteData();
    
    // Migrar dados da viagem
    await migrateTripData('santiago');
    
    console.log('\nMigração concluída com sucesso! 🎉');
    console.log('Todos os documentos incluem o token de administrador necessário para permissões de escrita.');
  } catch (error) {
    console.error('Erro durante a migração:', error);
  }
}

// Executar a migração
migrateAll(); 