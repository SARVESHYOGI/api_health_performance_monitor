const { SignJWT, jwtVerify } = require('jose')

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

exports.signToken = async (payload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(SECRET)
};

exports.verifyToken = async (payload) => {
    return await jwtVerify(payload, SECRET);
}