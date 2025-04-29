const jwt = require('jsonwebtoken');

const getObjFromToken = async(token) => {
    console.log("Received Token for Verification:", token, typeof token);
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log("Token verification error:", error);

        if (error.name === "TokenExpiredError") {
            throw new Error("Token has expired");
        } else if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid token");
        } else {
            throw new Error("Token verification failed");
        }
    }
}

module.exports = getObjFromToken;
