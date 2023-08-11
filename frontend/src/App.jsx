import './App.css';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Layout from './Layouts/main';
import Home  from './pages/Home';
import LoginPage  from './pages/Login';
import RegisterPage from './pages/Register';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipes from './pages/SavedRecipes';


axios.defaults.baseURL = import.meta.env.VITE_API_LOCAL_URL;
axios.defaults.withCredentials = true;

function App() {

  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/create-recipe' element={<CreateRecipe/>}/>
          <Route path='/saved-recipe' element={<SavedRecipes/>}/>
        </Route>
    </Routes>
  )
}

export default App
