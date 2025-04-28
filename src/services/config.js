/**
 * Configuração para fonte de dados.
 * Altere isUsingFirebase para true quando estiver pronto para usar o Firebase.
 */

export const isUsingFirebase = true;

// Configuração para paths de dados locais
export const localDataPaths = {
  site: {
    header: 'data/site/header.json',
    footer: 'data/site/footer.json',
    metadata: 'data/site/metadata.json'
  },
  trips: {
    santiago: {
      info: 'data/trips/santiago/trip-info.json',
      itinerary: 'data/trips/santiago/itinerary.json',
      activities: 'data/trips/santiago/activities.json',
      tips: 'data/trips/santiago/tips.json'
    }
  }
};

// Configuração para coleções do Firebase (para uso futuro)
export const firebaseCollections = {
  site: 'site',
  trips: 'trips'
}; 