import axios from "axios"

export const GET_RECIPES = "GET_RECIPES"
export const GET_DIETS = "GET_DIETS"
export const POST_RECIPES = "POST_RECIPES"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const FILTER_BY_NAME = "FILTER_BY_NAME"
export const FILER_BY_HEALTHSCORE= "FILER_BY_HEALTHSCORE"
export const GET_DETAIL = "GET_DETAIL"
export const CLEAN_DETAIL= "CLEAN_DETAIL"

export function getRecipes(name){
    return async function(dispatch){
        try {
            if(name){
                var recipes = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            }else{
                var recipes = await axios.get(`http://localhost:3001/recipes`)
            }
            return dispatch({
                type: GET_RECIPES,
                payload: recipes.data
            })
        } catch (error) {
            return error.message
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        try {
            const diets = await axios.get(`http://localhost:3001/diets`, {})
            return dispatch({
                type: GET_DIETS,
                payload: diets.data
            })
        } catch (error) {
            return error.message
        }
    }
}

export function postRecipes(payload){
    return async function(dispatch){
        try {
            const recipe = await axios.post(`http://localhost:3001/recipes`, payload)
            return dispatch({
                type: POST_RECIPES,
                payload: recipe
            })
        } catch (error) {
            return error.message
        }
    }
}

export function filterDiet(payload){
    return{
        type: FILTER_BY_DIET,
        payload
    }
}

export function filterName(payload){
    return{
        type: FILTER_BY_NAME,
        payload
    }
}

export function filterHealthScore(payload){
    return{
        type: FILER_BY_HEALTHSCORE,
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            const recipe = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type:GET_DETAIL,
                payload: recipe.data
            })
        } catch (error) {
            return error.message
        }
    }
}

export function cleanDetail(payload){
    return{
        type:CLEAN_DETAIL,
        payload
    }
}