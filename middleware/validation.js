const getObjFromToken = require("../utils/getObjFromToken");

const validation = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;

        if (!auth) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const token = auth;
        const obj = await getObjFromToken(token);

        if (!obj?.email) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        req.user_id = obj.user_id;
        next();
    } catch (error) {
        res.status(401).json({ message: error?.message || "Unauthorized" });
    }
}

module.exports = validation;
