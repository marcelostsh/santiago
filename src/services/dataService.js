/**
 * Serviço principal de dados.
 * Este arquivo serve como ponto de entrada para todos os acessos a dados,
 * independentemente de onde os dados estão armazenados (JSON local ou Firebase).
 */
import { isUsingFirebase } from './config';
import * as localDataService from './localDataService';
import * as firebaseDataService from './firebaseDataService';
import * as firebaseWriteService from './firebaseWriteService';

/**
 * Dados do Site
 */
export async function getSiteHeader() {
  return isUsingFirebase 
    ? firebaseDataService.getSiteHeader()
    : localDataService.getSiteHeader();
}

export async function getSiteFooter() {
  return isUsingFirebase 
    ? firebaseDataService.getSiteFooter()
    : localDataService.getSiteFooter();
}

export async function getSiteMetadata() {
  return isUsingFirebase 
    ? firebaseDataService.getSiteMetadata()
    : localDataService.getSiteMetadata();
}

/**
 * Dados da Viagem
 */
export async function getTripInfo(tripId = 'santiago') {
  return isUsingFirebase
    ? firebaseDataService.getTripInfo(tripId)
    : localDataService.getTripInfo(tripId);
}

export async function getItinerary(tripId = 'santiago') {
  // Ordenar registros por data antes de retornar
  const sortByDate = (data) => {
    if (!Array.isArray(data)) return data;
    return [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  };

  const data = await (isUsingFirebase
    ? firebaseDataService.getItinerary(tripId)
    : localDataService.getItinerary(tripId));

  return sortByDate(data);
}

export async function getActivities(tripId = 'santiago') {
  return isUsingFirebase
    ? firebaseDataService.getActivities(tripId)
    : localDataService.getActivities(tripId);
}

export async function getLocations(tripId = 'santiago') {
  return isUsingFirebase
    ? firebaseDataService.getLocations(tripId)
    : localDataService.getLocations(tripId);
}

export async function getTips(tripId = 'santiago') {
  return isUsingFirebase
    ? firebaseDataService.getTips(tripId)
    : localDataService.getTips(tripId);
}

/**
 * Dados específicos por ID
 */
export async function getActivityById(activityId, tripId = 'santiago') {
  return isUsingFirebase
    ? firebaseDataService.getActivityById(activityId, tripId)
    : localDataService.getActivityById(activityId, tripId);
}

export async function getLocationById(locationId, tripId = 'santiago') {
  return isUsingFirebase
    ? firebaseDataService.getLocationById(locationId, tripId)
    : localDataService.getLocationById(locationId, tripId);
}

export async function getDayById(dayId, tripId = 'santiago') {
  return isUsingFirebase
    ? firebaseDataService.getDayById(dayId, tripId)
    : localDataService.getDayById(dayId, tripId);
}

/**
 * Funções de escrita (apenas suportadas pelo Firebase)
 */
export async function addOrUpdateActivity(tripId, activityId, data) {
  if (!isUsingFirebase) {
    console.warn('Escrita de dados só é suportada ao usar Firebase');
    return { success: false };
  }
  return firebaseWriteService.addOrUpdateActivity(tripId, activityId, data);
}

export const getLinks = (tripId) => {
  if (isUsingFirebase) {
    return firebaseDataService.getLinks(tripId);
  }
  return []; // Retorna array vazio se não estiver usando Firebase
}; 