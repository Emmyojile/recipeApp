import Recipe from "../models/Recipe.js";
import User from '../models/User.js';


export const getAllRecipes = async (req, res) => {
    try {
        const allRecipes = await Recipe.find({});
        if (allRecipes.length === 0) {
            return res.json({ message: "No recipes found in the database." });
        }
        return res.json(allRecipes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred." });
    }
};


export const createRecipe = async (req, res) => {
    const recipe = new Recipe(req.body);
    try {
        const response = await recipe.save();
        return res.json(response)
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

export const saveRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.body.recipeID);
        const user = await User.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});    
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

export const savedRecipesUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        res.json({savedRecipes: user?.savedRecipes})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

export const savedRecipes = async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        const savedRecipes = await Recipe.find({
            _id: {$in: user.savedRecipes},
        });
        res.json({savedRecipes});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}