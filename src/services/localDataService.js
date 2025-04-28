/**
 * Serviço para buscar dados a partir de arquivos JSON locais.
 */
import { localDataPaths } from './config';

/**
 * Função genérica para buscar arquivos JSON locais
 * @param {string} path - Caminho do arquivo JSON relativo à pasta src
 * @returns {Promise<Object>} - Dados do JSON
 */
async function fetchLocalJson(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Erro ao carregar arquivo JSON: ${path}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao carregar arquivo JSON (${path}):`, error);
    return null;
  }
}

// Funções específicas para cada tipo de dado

// Dados do Site
export async function getSiteHeader() {
  return fetchLocalJson(localDataPaths.site.header);
}

export async function getSiteFooter() {
  return fetchLocalJson(localDataPaths.site.footer);
}

export async function getSiteMetadata() {
  return fetchLocalJson(localDataPaths.site.metadata);
}

// Dados da Viagem - Santiago
export async function getTripInfo(tripId = 'santiago') {
  if (tripId !== 'santiago') {
    console.warn('Apenas dados da viagem Santiago estão disponíveis no momento.');
  }
  return fetchLocalJson(localDataPaths.trips.santiago.info);
}

export async function getItinerary(tripId = 'santiago') {
  if (tripId !== 'santiago') {
    console.warn('Apenas dados da viagem Santiago estão disponíveis no momento.');
  }
  return fetchLocalJson(localDataPaths.trips.santiago.itinerary);
}

export async function getActivities(tripId = 'santiago') {
  if (tripId !== 'santiago') {
    console.warn('Apenas dados da viagem Santiago estão disponíveis no momento.');
  }
  return fetchLocalJson(localDataPaths.trips.santiago.activities);
}

export async function getLocations(tripId = 'santiago') {
  if (tripId !== 'santiago') {
    console.warn('Apenas dados da viagem Santiago estão disponíveis no momento.');
  }
  
  const activities = await getActivities(tripId);
  if (!activities) return [];
  
  // Mapeia todos os locais únicos das atividades
  const locationsMap = {};
  
  activities.forEach(activity => {
    if (activity.location) {
      const locationId = activity.location.toLowerCase().replace(/\s+/g, '-');
      
      if (!locationsMap[locationId]) {
        locationsMap[locationId] = {
          id: locationId,
          name: activity.location,
          type: activity.type,
          description: activity.description,
          images: activity.images || [],
          links: activity.links || {}
        };
      }
    }
  });
  
  // Converte o objeto em array
  return Object.values(locationsMap);
}

export async function getTips(tripId = 'santiago') {
  if (tripId !== 'santiago') {
    console.warn('Apenas dados da viagem Santiago estão disponíveis no momento.');
  }
  return fetchLocalJson(localDataPaths.trips.santiago.tips);
}

// Funções para buscar dados específicos por ID
export async function getActivityById(activityId, tripId = 'santiago') {
  const activities = await getActivities(tripId);
  if (!activities) return null;
  
  return activities.find(activity => activity.id === activityId) || null;
}

// Agora a função getLocationById usa o activities.json para encontrar locais
export async function getLocationById(locationId, tripId = 'santiago') {
  const activities = await getActivities(tripId);
  if (!activities) return null;
  
  // Encontra a primeira atividade com location correspondente
  const activity = activities.find(activity => 
    activity.location && activity.location.toLowerCase().replace(/\s+/g, '-') === locationId
  );
  
  if (!activity) return null;
  
  // Processa os links para garantir formato adequado
  let processedLinks = activity.links || {};
  
  // Retorna um objeto de location com os dados necessários
  return {
    id: locationId,
    name: activity.location,
    type: activity.type,
    description: activity.description,
    images: activity.images || [],
    links: processedLinks
  };
}

export async function getDayById(dayId, tripId = 'santiago') {
  const itinerary = await getItinerary(tripId);
  if (!itinerary) return null;
  
  return itinerary.find(day => day.id === dayId) || null;
} 