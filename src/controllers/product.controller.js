import {Product} from '../models/product.model.js';
import bcrypt from 'bcrypt';



const createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            image: req.file ? req.file.filename : null
        };

        const product = await Product.create(productData);

        return res.status(201).json({
            product
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findOne({
            where: {id: id}
        });
        if (product) {
            return res.status(200).json({product});
        }
        return res.status(404).send('Product with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const [updated] = await Product.update(req.body, {
            where: {id: id}
        });
        if (updated) {
            const updatedProduct = await Product.findOne({where: {id: id}});
            return res.status(200).json({product: updatedProduct});
        }
        throw new Error('Product not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Product.destroy({
            where: {id: id}
        });
        if (deleted) {
            return res.status(200).json({message: "Product deleted"});
        }
        throw new Error("Product not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export const productController = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };