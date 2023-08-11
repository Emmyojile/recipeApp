import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export default function LoginPage() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
    })

    const [_, setCookies] = useCookies(["access_token"]);
    const login = async (e) => {
        e.preventDefault();
        const { username, password } = data;
        try {
        const {data} = await axios.post('auth/login', {
            username, password
        });
        if(data.error) {
            toast.error(data.error)
        } else {
            toast.success('Welcome!!')
            setCookies("access_token", data.token)
            window.localStorage.setItem("userID", data.userID)
            navigate('/')
        }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
         <form className="login" onSubmit={login}>
            <h1>Login</h1>
                <input type="username" 
                placeholder="username"
                value={data.username}
                onChange={(e) => setData({...data, username: e.target.value})}
                />
                <input type="password" 
                placeholder="password"
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                />
                <button>Login</button>
        </form>
        </>
    )
}