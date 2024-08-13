import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) return res.status(401).send("You are not authorized")
        jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {
            if (err) return res.status(403).send("Token is not valid");
            // console.log(req.user, "id")
            // console.log(payload.user)
            req.userId = payload.user;
            // return res.status(200).send("User Id receive")
            next();
        })
    };
