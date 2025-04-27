/**
 * Serviço para buscar dados a partir do Firebase.
 * Este é apenas um esqueleto inicial - será implementado quando a integração com Firebase for feita.
 */
import { firebaseCollections } from './config';

// TODO: Implementar estas funções quando a integração com Firebase for feita
// Por enquanto, elas retornam uma promise rejeitada.

const firebaseNotImplemented = () => 
  Promise.reject(new Error('Serviço Firebase ainda não implementado.'));

// Dados do Site
export async function getSiteHeader() {
  // TODO: Implementar busca no Firebase
  // Exemplo: return await getFirebaseDocument(firebaseCollections.site, 'header');
  return firebaseNotImplemented();
}

export async function getSiteFooter() {
  return firebaseNotImplemented();
}

export async function getSiteMetadata() {
  return firebaseNotImplemented();
}

// Dados da Viagem
export async function getTripInfo(tripId = 'santiago') {
  return firebaseNotImplemented();
}

export async function getItinerary(tripId = 'santiago') {
  return firebaseNotImplemented();
}

export async function getActivities(tripId = 'santiago') {
  return firebaseNotImplemented();
}

export async function getLocations(tripId = 'santiago') {
  return firebaseNotImplemented();
}

export async function getTips(tripId = 'santiago') {
  return firebaseNotImplemented();
}

// Funções para buscar dados específicos por ID
export async function getActivityById(activityId, tripId = 'santiago') {
  return firebaseNotImplemented();
}

export async function getLocationById(locationId, tripId = 'santiago') {
  return firebaseNotImplemented();
}

export async function getDayById(dayId, tripId = 'santiago') {
  return firebaseNotImplemented();
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