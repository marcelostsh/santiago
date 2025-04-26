/**
 * Configuração para fonte de dados.
 * Altere isUsingFirebase para true quando estiver pronto para usar o Firebase.
 */

export const isUsingFirebase = false;

// Configuração para paths de dados locais
export const localDataPaths = {
  site: {
    header: '/src/data/site/header.json',
    footer: '/src/data/site/footer.json',
    metadata: '/src/data/site/metadata.json'
  },
  trips: {
    santiago: {
      info: '/src/data/trips/santiago/trip-info.json',
      itinerary: '/src/data/trips/santiago/itinerary.json',
      activities: '/src/data/trips/santiago/activities.json',
      locations: '/src/data/trips/santiago/locations.json',
      tips: '/src/data/trips/santiago/tips.json'
    }
  }
};

// Configuração para coleções do Firebase (para uso futuro)
export const firebaseCollections = {
  site: 'site',
  trips: 'trips'
}; 