// src/utils/store.js
import { create } from 'zustand'; // Importation correcte de `create`
import api from '../api/client';

const useCategoryStore = create((set) => ({
    categories_data: [],
    todos : [],

  loading: false,
  error: null,

  // Action pour récupérer les catégories
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/categories'); 
      // Utiliser l'instance api pour faire la requête
      set({ categories_data: response.data.categories, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTodosByCategorie: async (id) => {
    set({  error: null });
    try {
      const response = await api.get(`/todos/catagory/${id}`); 
      // Utiliser l'instance api pour faire la requête
      set({ todos: response.data.todos });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCategoryStore;
