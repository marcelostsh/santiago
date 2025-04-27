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
  return fetchLocalJson(localDataPaths.trips.santiago.locations);
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

export async function getLocationById(locationId, tripId = 'santiago') {
  const locations = await getLocations(tripId);
  if (!locations) return null;
  
  return locations.find(location => location.id === locationId) || null;
}

export async function getDayById(dayId, tripId = 'santiago') {
  const itinerary = await getItinerary(tripId);
  if (!itinerary) return null;
  
  return itinerary.find(day => day.id === dayId) || null;
} 