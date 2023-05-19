import { Customer } from '../models/customer.model.js';
import bcrypt from 'bcrypt';

const createCustomer = async (req, res) => {
    try {
        const customerData = {
            ...req.body,
            image: req.file ? req.file.filename : null
        };
        const customer = await Customer.create(customerData);
        return res.status(201).json({
            customer
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        return res.status(200).json(customers);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getCustomerById = async (req, res) => {
    try {
        const {customerId} = req.params;
        const customer = await Customer.findOne({
            where: {id: customerId}
        });
        if (customer) {
            return res.status(200).json({customer});
        }
        return res.status(404).send('Customer with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateCustomer = async (req, res) => {
    try {
        const {id} = req.params;

        const customer = await Customer.findOne({where: {id: id}});
        if (!customer) {
            return res.status(404).json({message: 'Customer not found'});
        }

        const [updated] = await Customer.update(req.body, {
            where: {id: id}
        });
        if (updated) {
            const updatedCustomer = await Customer.findOne({where: {id: id}});
            return res.status(200).json({customer: updatedCustomer});
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const deleteCustomer = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Customer.destroy({
            where: {id: id}
        });
        if (deleted) {
            return res.status(200).json({message: "Customer deleted"});
        }
        throw new Error("Customer not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export const customerController = { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer };