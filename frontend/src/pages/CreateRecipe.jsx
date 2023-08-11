import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {getUserId} from "../hooks/getUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export default function CreateRecipe () {
    const userID = getUserId();
    const navigate = useNavigate();

    const [cookies, _] = useCookies(["access_token"]);


    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: "",
        userOwner: userID,
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRecipe({...recipe, [name]: value});
    }
    const handleIngredientChange = (e, index) => {
        const {value} = e.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({...recipe, ingredients})
    }
    const addIngredients = (e) => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    }

    const onSubmit =  async (e) => {
        e.preventDefault();
        if (!cookies.access_token) {
            // Display a toast notification
            toast.error("You need to be logged in to create a recipe.");
            // Redirect to the login page
            navigate("/login");
            return;
        }

        try {
            await axios.post("/recipe", recipe, 
            {headers: {authorization: cookies.access_token}}
            )
            toast.success('Recipe Created Successfully')
            navigate("/")
        } catch (error) {
            console.error
        }
    }

    return (
        <>
            <div className="create-recipe">
                <h1>Create Recipe</h1>
                <form onSubmit={onSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                    id="name" 
                    name="name" 
                    onChange={handleChange}/>
                    <label htmlFor="ingredients">Ingredients</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <input
                        key={index}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(e, index)}
                        />
                    ))}
                    <button type="button" onClick={addIngredients}>Add Ingredients</button>
                    
                    <label>Instructions</label>
                    <textarea id="instructions" 
                    name="instructions" 
                    onChange={handleChange}></textarea>
                    <label htmlFor="imageUrl">Image</label>
                    <input type="text" 
                    id="imageUrl" 
                    name="imageUrl" 
                    onChange={handleChange}/>
                    <label htmlFor="cookingTime">Cooking Time</label>
                    <input type="number" 
                    id="cookingTime" 
                    name="cookingTime"
                    onChange={handleChange}
                    />
                    <button type="submit">Create Recipe</button>
                </form>
            </div>
        </>
    )
}