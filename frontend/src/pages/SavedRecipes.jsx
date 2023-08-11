import axios from "axios";
import { useEffect, useState } from "react";
import { getUserId } from "../hooks/getUserId";

export default function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);

    const userID = getUserId();

    useEffect(() => {

        const fetchSavedRecipe = async () => {
            try {
                const {data}  = await axios.get(`/recipe/saved/${userID}`);
                setSavedRecipes(data.savedRecipes);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSavedRecipe();
    },[])

    return (
        <>
            <div>
                <h1>Saved Recipes</h1>
                <ul>
                    {savedRecipes.map((recipe) => (
                        <li key={recipe._id}> 
                            <div>
                                <h2>{recipe.name}</h2>
                            </div>
                            <div className="instructions">
                                <p>{recipe.instructions}</p>
                            </div>
                            <img src={recipe.imageUrl} alt="" />
                            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                        </li>

                    ))}
                </ul>
            </div>
        </>
    )
}