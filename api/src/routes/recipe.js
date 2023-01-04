const {Router} = require("express");
const {Recipe, Diet} = require("../db");
const {getAllRecipes} = require("./modules/recipes")
const router =Router();

router.get("", async(req, res)=>{
    const {name} = req.query;
    const totalRecipes= await getAllRecipes();
 
        if(name){
            const nameRecipe = await totalRecipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            nameRecipe.length ? res.status(200).send(nameRecipe) : res.status(400).send("No se encontro la receta")
        }
    else{
        res.status(200).send(totalRecipes)
    }
})

router.get("/:id", async (req, res)=>{
    const {id} = req.params;
    let totalRecipes = await getAllRecipes();
    let recipe = totalRecipes.filter(r=> r.id == id);
    recipe.length
    ? res.status(200).json(recipe)
    : res.status(404).send("El id no coincide con ninguna receta") 
});

router.post("", async (req, res)=>{
    let {name, img, infoRecipe, healthScore, stepByStep, createInDb, diet} = req.body;
    try {
        let newRecipe = await Recipe.create({
            name, 
            img, 
            infoRecipe, 
            healthScore, 
            stepByStep, 
            createInDb
        })
        let dietDb = await Diet.findAll({
            where:{dietName : diet}
        })
        console.log(dietDb)
        newRecipe.addDiet(dietDb)
        res.status(200).send(newRecipe)
        console.log(newRecipe)
    } catch (error) {
        res.status(404).send(console.log(error))
    }
    
})

// router.delete("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//       await Recipe.destroy({ where: { id: id } });
//       res.status(204);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   router.put("/:id", async (req, res) => {
//     const { id } = req.params;
//     const { name, summary, healthScore, image, steps, diets } = req.body;
//     try {
//       const recipeUpdate = await Recipe.findByPk(id);
//       recipeUpdate.name = name;
//       recipeUpdate.summary = summary;
//       recipeUpdate.healthScore = healthScore;
//       recipeUpdate.image = image;
//       recipeUpdate.steps = steps;
//       recipeUpdate.diets = diets;
//       await recipeUpdate.save();
//       res.status(204)
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

module.exports= router;