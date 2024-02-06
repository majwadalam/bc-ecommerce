import User from "../models/User.js";

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (user.role !== "admin") {
        return res.status(403).json({ message: "Admin resource! Access denied" });
    }

    next();
}

export default isAdmin;