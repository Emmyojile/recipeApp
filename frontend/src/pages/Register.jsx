import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
const navigate = useNavigate();
const [data, setData] = useState({
    username: '',
    password: '',
})

    const register = async (e) => {
        e.preventDefault();
        const {username, password} = data;
        try {
        const {data} = await axios.post('auth/register', {
            username, password
        })
            if(data.error){
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Register Successfully')
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text" 
        placeholder="username" 
        value={data.username}
        onChange={(e) => setData({...data, username: e.target.value})}
        />
        <input type="password" 
        placeholder="password" 
        value={data.password}
        onChange={(e) => setData({...data, password: e.target.value})}
        />
        <button>Register</button>
      </form>
    </>
  );
}
