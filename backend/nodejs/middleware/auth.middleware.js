const jwt = require('jsonwebtoken')

module.export = async (req, res, next) => {
    try {
        const authHeader = await req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied" });
        }
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode
        next();
    } catch (error) {
        console.log("error in middleware", error);
    }
}