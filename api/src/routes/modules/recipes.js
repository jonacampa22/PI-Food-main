require("dotenv").config();
const axios = require("axios");
const {API_KEY}= process.env;
const {Recipe, Diet} = require("../../db")

const getApiInfo = async () =>{
    const api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const dataApi = api.data.results.map(e=>{
        return{
            id: e.id,
            name: e.title,
            img:e.image,
            infoRecipe: e.summary,
            dietName: e.diets,
            healthScore: e.healthScore,
            stepByStep: e.analyzedInstructions[0]?.steps.map(e=>{
                return(
                    e.step
                )
            })
        }
    })
    console.log(dataApi)
    return dataApi
}

const getDbInfo = async ()=>{
    const recipeDb = await Recipe.findAll({
        include:{
            model: Diet,
            attributes:["dietName"],
            through:{
                attributes:[]
            }
        }
    })
    return recipeDb
}

const getAllRecipes = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const info = await apiInfo.concat(dbInfo);
    return info
}
module.exports={
    getAllRecipes
}