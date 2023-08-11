import axios from "axios";
import { useEffect, useState } from "react";
import { getUserId } from "../hooks/getUserId";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";


export default function Home() {
    const [recipes, setRecipe] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    
    const [cookies, _] = useCookies(["access_token"]);

    const userID = getUserId();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const {data}  = await axios.get("/recipe");
                setRecipe(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const {data}  = await axios.get(`/recipe/${userID}`);
                setSavedRecipes(data.savedRecipes);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRecipe();
        if(cookies.access_token) fetchSavedRecipe();
    },[])

    const saveRecipe = async (recipeID) => {
        if (!cookies.access_token) {
            // Display a toast notification if the user is not logged in
            toast.error("You need to be logged in to save a recipe.")
            return;
        }

        try {
            const {data} = await axios.put("/recipe", {recipeID, userID},
            {headers: {authorization: cookies.access_token}}
            );
            setSavedRecipes(data.savedRecipes);
        } catch (error) {
            console.error(error);
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id);
    return (
        <>
            <div>
                <h1>Recipes</h1>
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe._id}> 
                            <div>
                                <h2>{recipe.name}</h2>
                                <button 
                                    onClick={() => saveRecipe(recipe._id)}
                                    disabled= {isRecipeSaved(recipe._id)}>
                                        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                                </button>
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