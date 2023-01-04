const axios = require("axios");
const {Router} = require("express");
require("dotenv").config();
const {API_KEY} = process.env
const {Diet} = require("../db");
const {dietTypes} = require("./modules/dietTypes");
const router =Router();

router.get("", async(req, res)=>{
    var dietsApi= []
    try {
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const dataApi= recipes.data.results
        dataApi.forEach(d=>{
            if(d.diets){
                dietsApi= [...new Set([...dietsApi, ...d.diets.flat()])].sort()
            }
        });
        console.log(dietsApi)
        dietsApi.forEach(d=>{
            Diet.findOrCreate({
                where:{
                    dietName: d
                }
            })
        })
        const allDiets = await Diet.findAll()
        res.status(200).send(allDiets)
    } catch (error) {
        res.status(404).send(console.log(error))
    }
})

module.exports= router;