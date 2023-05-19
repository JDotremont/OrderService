import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { User } from '../models/user.model.js';

export const jwtMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // bug authentifier
    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401);
    }
    // fin bug authentifier

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        // bug authentifier
        if (!user) {
            return res.sendStatus(401);
        }
        // fin bug authentifier
        req.user = user;
        await next();
    } catch (err) {
        // bug authentifier
        return res.sendStatus(401);
        // fin bug authentifier
    }
}