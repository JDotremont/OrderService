import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

       const user = await User.create(req.body);
        return res.status(201).json({
            user
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params;
        const user = await User.findOne({
            where: {id: userId}
        });
        if (customer) {
            return res.status(200).json({customer});
        }
        return res.status(404).send('Customer with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params;
        const [updated] = await User.update(req.body, {
            where: {id: userId}
        });
        if (updated) {
            const updatedUser = await User.findOne({where: {id: userId}});
            return res.status(200).json({user: updatedUser});
        }
        throw new Error('User not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id: id } = req.params;
        const deleted = await User.destroy({
            where: {id: id}
        });
        if (deleted) {
            return res.status(204).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


export const userController = { createUser, getAllUsers, getUserById, updateUser, deleteUser };