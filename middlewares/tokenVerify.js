import jwt from "jsonwebtoken";

export const tokenVerify = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                console.log("token error", error);
                return res
                    .status(401)
                    .json({error: true, message: "Access denied!"});
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).json({error: true, message: "No token provided"});
    }
}