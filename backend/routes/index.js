import express from 'express';
const router = express.Router();

import userRoutes from "./user.js";
import recipeRoutes from "./recipe.js";

router.use('/auth', userRoutes);
router.use('/recipe', recipeRoutes);

export default router;
