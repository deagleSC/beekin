import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
    }

    try {
    token = token.substring(7)
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    next();

    } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Invalid token' });
    }
}