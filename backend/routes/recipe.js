import express from 'express';
const router = express.Router();

import {getAllRecipes, createRecipe, saveRecipe, savedRecipesUserId, savedRecipes} from '../controllers/recipe.js';

import { verifyToken } from '../middlewares/auth.js';

router.route('/').get(getAllRecipes);
router.route('/').post(verifyToken, createRecipe);
router.route('/').put(verifyToken, saveRecipe);
router.route('/:userID').get(savedRecipesUserId);
router.route('/saved/:userID').get(savedRecipes);


export default router;