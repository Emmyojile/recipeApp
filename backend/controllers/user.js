import User from '../models/User.js';


export const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            res.json({error: "Please provide all required fields"})
        }
        
        const userNameExists = await User.findOne({username})
        if(userNameExists) {
            res.json({error: 'This username is already taken'})
        }

        const newUser = await User.create({...req.body})
        res.json(newUser)
        
    } catch (error) {
        res.json(error.error)
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({ error: "Please provide all required fields" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ error: 'The username does not exist' });
        }

        const correctPassword = await user.comparePasswords(password);
        if (!correctPassword) {
            return res.json({ error: "Incorrect password" });
        }

        const token = user.createJWT();
        return res.json({ token, userID: user._id });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").json('ok');
}
