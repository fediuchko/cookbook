const recipeRepository = require('./recipe.repository');

class RecipeService {
	getAllRecipes(sortBy) {
		return recipeRepository.findAll(sortBy);
	}

	getRecipeById(id) {
		return recipeRepository.findById(id);
	}

	addRecipe(recipe) {
		return recipeRepository.add(recipe);
	}

	updateRecipe(id, recipe) {
		return recipeRepository.update({ _id: id }, recipe);
	}

	deleteRecipe(id) {
		return recipeRepository.delete({ _id: id });
	}
	
	getAllSortedByRating() {
		return recipeRepository.findAllSortedByRating();
	}
}

module.exports = new RecipeService();