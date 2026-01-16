const { jwtVerify } = require("jose");

const authMiddleware = async (req, res, next) => {
    try {
        const token =
            req.cookies?.access_token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        req.user = {
            id: payload.id,
            email: payload.email,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
