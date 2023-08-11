import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error) => {
            if(error) return res.sendStatus(403);
            next();
        })
    } else {
        return res.sendStatus(401);
    }
}