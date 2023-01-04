import {
    GET_RECIPES,
    GET_DIETS,
    POST_RECIPES,
    FILTER_BY_DIET,
    FILTER_BY_NAME,
    FILER_BY_HEALTHSCORE,
    GET_DETAIL,
    CLEAN_DETAIL
} from '../actions/index'

const initialState = {
    recipes : [],
    allRecipes : [],
    diets : [],
    detail: []
}

export const rootReducer=(state = initialState,action)=>{
    switch(action.type){
        case GET_RECIPES:{
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        }
        case GET_DIETS:{
            return{
                ...state,
                diets: action.payload
            }
        }
        case POST_RECIPES:{
            return{
                ...state
            }
        }
        case FILTER_BY_DIET:{
            const allRecipes = state.allRecipes
            function dietas(){
                let diet =[]
                for (const key in allRecipes) {
                    allRecipes[key].dietName?.map(e=>{
                        if(e === action.payload){
                            diet.push(allRecipes[key])
                        }
                    })
                    allRecipes[key].diets?.map(d=>{
                        if(d.dietName === action.payload)
                        diet.push(allRecipes[key])
                    })
                }
                return diet
                }
                const statusFiltered = action.payload === "all" ? allRecipes : dietas()
                return {
                    ...state,
                    recipes: statusFiltered
                }
            }
            case FILTER_BY_NAME:{
                let sortedName = action.payload === "ascendente" ?
                state.recipes.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1
                    }
                    return 0
                });
                return {
                    ...state,
                    recipes: sortedName
                }
            }
            case FILER_BY_HEALTHSCORE:{
                let filterHealthScore = action.payload === "mostHS" ?
                state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return -1;
                    }
                    if(b.healthScore > a.healthScore){
                        return 1;
                    }
                    return 0
                }) :
                state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return 1;
                    }
                    if(b.healthScore > a.healthScore){
                        return -1;
                    }
                    return 0
                })
                return{
                    ...state,
                    recipes: filterHealthScore
                }
            }
            case GET_DETAIL:{
                return{
                    ...state,
                    detail: action.payload
                }
            }
            case CLEAN_DETAIL:{
                return{
                    ...state,
                    detail:action.payload
                }
            }
        default: return state
    }
}