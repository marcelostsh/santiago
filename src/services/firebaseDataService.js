/**
 * Serviço para buscar dados a partir do Firebase.
 */
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firebaseCollections } from './config';

// Dados do Site
export async function getSiteHeader() {
  try {
    const docRef = doc(db, firebaseCollections.site, 'header');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Erro ao buscar header do site:', error);
    return null;
  }
}

export async function getSiteFooter() {
  try {
    const docRef = doc(db, firebaseCollections.site, 'footer');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Erro ao buscar footer do site:', error);
    return null;
  }
}

export async function getSiteMetadata() {
  try {
    const docRef = doc(db, firebaseCollections.site, 'metadata');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Erro ao buscar metadata do site:', error);
    return null;
  }
}

// Dados da Viagem
export async function getTripInfo(tripId = 'santiago') {
  try {
    const docRef = doc(db, firebaseCollections.trips, tripId, 'info', 'details');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error(`Erro ao buscar informações da viagem ${tripId}:`, error);
    return null;
  }
}

export async function getItinerary(tripId = 'santiago') {
  try {
    const querySnapshot = await getDocs(collection(db, firebaseCollections.trips, tripId, 'itinerary'));
    const itinerary = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Ordenar por número do dia
    return itinerary.sort((a, b) => a.dayNumber - b.dayNumber);
  } catch (error) {
    console.error(`Erro ao buscar itinerário da viagem ${tripId}:`, error);
    return [];
  }
}

export async function getActivities(tripId = 'santiago') {
  try {
    const querySnapshot = await getDocs(collection(db, firebaseCollections.trips, tripId, 'activities'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Erro ao buscar atividades da viagem ${tripId}:`, error);
    return [];
  }
}

export async function getLocations(tripId = 'santiago') {
  try {
    const querySnapshot = await getDocs(collection(db, firebaseCollections.trips, tripId, 'locations'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Erro ao buscar locais da viagem ${tripId}:`, error);
    return [];
  }
}

export async function getTips(tripId = 'santiago') {
  try {
    const docRef = doc(db, firebaseCollections.trips, tripId, 'info', 'tips');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error(`Erro ao buscar dicas da viagem ${tripId}:`, error);
    return null;
  }
}

// Funções para buscar dados específicos por ID
export async function getActivityById(activityId, tripId = 'santiago') {
  try {
    const docRef = doc(db, firebaseCollections.trips, tripId, 'activities', activityId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error(`Erro ao buscar atividade ${activityId}:`, error);
    return null;
  }
}

export async function getLocationById(locationId, tripId = 'santiago') {
  try {
    const docRef = doc(db, firebaseCollections.trips, tripId, 'locations', locationId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error(`Erro ao buscar local ${locationId}:`, error);
    return null;
  }
}

export async function getDayById(dayId, tripId = 'santiago') {
  try {
    const docRef = doc(db, firebaseCollections.trips, tripId, 'itinerary', dayId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error(`Erro ao buscar dia ${dayId}:`, error);
    return null;
  }
}

/**
 * A implementação real provavelmente será algo assim:
 * 
 * // Importações do Firebase
 * import { getFirestore, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
 * 
 * const db = getFirestore();
 * 
 * async function getFirebaseCollection(collectionPath) {
 *   const snapshot = await getDocs(collection(db, collectionPath));
 *   return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
 * }
 * 
 * async function getFirebaseDocument(collectionPath, docId) {
 *   const docRef = doc(db, collectionPath, docId);
 *   const docSnap = await getDoc(docRef);
 *   
 *   if (docSnap.exists()) {
 *     return { id: docSnap.id, ...docSnap.data() };
 *   } else {
 *     return null;
 *   }
 * }
 */ 