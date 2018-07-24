import api from '../adapter';

export default{
   
    addRecipe : recipe =>{
        return api.makeRequest('/api/recipes', api.requstTypes.POST, recipe);
    },
    updateRecipe : recipe =>{
        return api.makeRequest(`/api/recipes/${recipe.id}`, api.requstTypes.PATCH, recipe);
    },
    deleteRecipe : id=>{
        return api.makeRequest(`/api/recipes/${id}`, api.requstTypes.DELETE);
    },
    fetchRecipe : id=>{
        return api.makeRequest(`/api/recipes/${id}`, api.requstTypes.GET);
    },
    fetchAllSortedByRating: () => {
        return api.makeRequest('/api/recipes/sortedByRating', api.requstTypes.GET);
    },
    fetchAllRecipes: () => {
        return api.makeRequest(`/api/recipes`, api.requstTypes.GET);
    }
 };