import axios from 'axios';

// Créer une instance d'axios avec la configuration de base
const api = axios.create({
  baseURL: 'http://localhost:5000/', // Remplacez par votre URL d'API
  headers: {
    'Content-Type': 'application/json',
    // Ajoutez d'autres en-têtes si nécessaire (par exemple, pour l'authentification)
  },
});

export default api;