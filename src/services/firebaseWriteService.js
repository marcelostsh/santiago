import { db } from '../firebase';
import { doc, setDoc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore';

// Token de administrador necessário para permissões de escrita
// conforme regras de segurança do Firestore
const ADMIN_TOKEN = "Oxd3Xk7F7XTzfELkxS74";

/**
 * Adiciona o token de administrador aos dados antes de enviar para o Firestore
 * @param {Object} data - Dados a serem enviados
 * @returns {Object} - Dados com o token de administrador
 */
const addAdminToken = (data) => {
  return {
    ...data,
    adminToken: ADMIN_TOKEN
  };
};

/**
 * Cria ou substitui um documento com ID específico
 * @param {string} collectionPath - Caminho da coleção
 * @param {string} docId - ID do documento
 * @param {Object} data - Dados a serem salvos
 */
export const setDocument = async (collectionPath, docId, data) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    await setDoc(docRef, addAdminToken(data));
    return { success: true, id: docId };
  } catch (error) {
    console.error(`Erro ao salvar documento ${docId} em ${collectionPath}:`, error);
    return { success: false, error };
  }
};

/**
 * Atualiza parcialmente um documento existente
 * @param {string} collectionPath - Caminho da coleção
 * @param {string} docId - ID do documento
 * @param {Object} data - Dados a serem atualizados
 */
export const updateDocument = async (collectionPath, docId, data) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    await updateDoc(docRef, addAdminToken(data));
    return { success: true, id: docId };
  } catch (error) {
    console.error(`Erro ao atualizar documento ${docId} em ${collectionPath}:`, error);
    return { success: false, error };
  }
};

/**
 * Cria um novo documento com ID gerado automaticamente
 * @param {string} collectionPath - Caminho da coleção
 * @param {Object} data - Dados a serem salvos
 */
export const addDocument = async (collectionPath, data) => {
  try {
    const collectionRef = collection(db, collectionPath);
    const docRef = await addDoc(collectionRef, addAdminToken(data));
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(`Erro ao adicionar documento em ${collectionPath}:`, error);
    return { success: false, error };
  }
};

/**
 * Exclui um documento
 * @param {string} collectionPath - Caminho da coleção
 * @param {string} docId - ID do documento
 */
export const deleteDocument = async (collectionPath, docId) => {
  try {
    // Para exclusão também precisamos incluir o token
    // Usamos updateDoc com o token antes de excluir
    const docRef = doc(db, collectionPath, docId);
    await updateDoc(docRef, { adminToken: ADMIN_TOKEN });
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error(`Erro ao excluir documento ${docId} em ${collectionPath}:`, error);
    return { success: false, error };
  }
};

// Métodos específicos para entidades do projeto
export const updateTripInfo = async (tripId, data) => {
  return await setDocument(`trips/${tripId}/info`, 'details', data);
};

export const updateSiteHeader = async (data) => {
  return await setDocument('site', 'header', data);
};

export const updateSiteFooter = async (data) => {
  return await setDocument('site', 'footer', data);
};

export const updateTips = async (tripId, data) => {
  return await setDocument(`trips/${tripId}/info`, 'tips', data);
};

export const addOrUpdateActivity = async (tripId, activityId, data) => {
  return await setDocument(`trips/${tripId}/activities`, activityId, data);
};

export const addOrUpdateLocation = async (tripId, locationId, data) => {
  return await setDocument(`trips/${tripId}/locations`, locationId, data);
};

export const addOrUpdateDay = async (tripId, dayId, data) => {
  return await setDocument(`trips/${tripId}/itinerary`, dayId, data);
}; 