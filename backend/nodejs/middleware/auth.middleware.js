const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwt');

module.export = async (req, res, next) => {
    try {
        const authHeader = await req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied" });
        }
        const token = authHeader.split(" ")[1];

        try {
            const { payload } = await verifyToken(token)
            req.user = payload;
            next();
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log("error in middleware", error);
    }
}