import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({error: 'Password not valid'});
        }
        const token = jwt.sign({id: user.id, username: user.username, role: user.role}, process.env.JWT_SECRET);
        return res.status(200).json({token});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const loginController = { login };