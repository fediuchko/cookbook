import { takeLatest, call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { push } from 'connected-react-router';
import { arrayOfRecipes } from './RecipesScheme';
import * as constants from './RecipesConstants';
import { recipeAPI } from './../../api';
// import { fetchAllRecipes, addRecipe } from './RecipesActions';

function* fetchAllRecipes() {
    try {
        const recipes = yield call(recipeAPI.fetchAllRecipes);
        console.log ("fetchAllRecipes recipes - "+  recipes.data);
        console.log ("fetchAllRecipes arrayOfRecipes - "+ arrayOfRecipes);

        const normalizedData = normalize(recipes.data, arrayOfRecipes);
        console.log ("fetchAllRecipes normalizedData.result - "+  normalizedData.result);
        console.log ("fetchAllRecipes normalizedData.entities - "+  normalizedData.entities.byId);
        yield put({
            type: constants.FETCH_ALL_RECIPES_SUCCESS,
            payload: {
                all: normalizedData.result,
                byId: normalizedData.entities.byId || []
            }
        })
   
        
    }
    catch (error) {
        yield put({ type: constants.FETCH_ALL_RECIPES_FAILED })
    }
}

function* addRecipe(action) {
    try {
        const recipeResponse = yield call(recipeAPI.addRecipe, action.payload);
        yield put({
            type: constants.ADD_RECIPE_SUCCESS,
            payload: {
                ...recipeResponse.data
            }
        });
        yield put(push('/recipes'));
    }
    catch (error) {
        yield put({ type: constants.ADD_RECIPE_FAILED})
    }
}

function* updateRecipe(action) {
    try {
        yield call(recipeAPI.updateRecipe, action.payload);
        yield put({
            type: constants.UPDATE_RECIPE_SUCCESS,
            payload: action.payload
        });
        yield put(push('/recipes'));
    }
    catch (error) {
        yield put({ type: constants.UPDATE_RECIPE_FAILED })
    }
}

function* deleteRecipe(action) {
    try {
    yield call(recipeAPI.deleteRecipe, action.payload.id);
        yield put({
            type: constants.DELETE_RECIPE_SUCCESS,
            payload: { id: action.payload.id }
        });
    }
    catch (error) {
        yield put({ type: constants.DELETE_RECIPE_FAILED })
    }
}

function* fetchRecipe(action) {
    try {
        const response = yield call(recipeAPI.fetchRecipe, action.payload.id);
        yield put({
            type: constants.FETCH_RECIPE_SUCCESS,
            payload: {
                ...response.data
            }
        })
    }
    catch (error) {
        yield put({ type: constants.FETCH_RECIPE_FAILED })
    }
}
function* fetchAllSortedByRating() {
    try {
        const recipes = yield call(recipeAPI.fetchAllSortedByRating);
        const normalizedData = normalize(recipes.data, arrayOfRecipes)
        yield put({
            type: constants.FETCH_ALL_RECIPES_SUCCESS,
            payload: {
                all: normalizedData.result,
                byId: normalizedData.entities.byId || {}
            }
        })
    }
    catch (error) {
        yield put({ type: constants.FETCH_ALL_RECIPES_FAILED })
    }
}

export default function* recipesSaga() {
    yield takeLatest(constants.FETCH_ALL_RECIPES, fetchAllRecipes);
    yield takeLatest(constants.DELETE_RECIPE, deleteRecipe);
    yield takeLatest(constants.ADD_RECIPE, addRecipe);
    yield takeLatest(constants.UPDATE_RECIPE, updateRecipe);
    yield takeLatest(constants.FETCH_RECIPE, fetchRecipe);
}
