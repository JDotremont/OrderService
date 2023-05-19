import { Order } from '../models/order.model.js';
import { OrderLine } from '../models/order_line.model.js';
import { Product } from '../models/product.model.js';
import { Customer } from '../models/customer.model.js';
import { sequelize } from '../db.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import SendmailTransport from 'nodemailer/lib/sendmail-transport/index.js';
import { smtpTransport } from '../utils/mail.utils.js';
import { User } from '../models/user.model.js';

dotenv.config();

const transporter = smtpTransport;

const createOrder = async (req, res) => {
    const t = await sequelize.transaction();
    const { customerId, orderLine } = req.body;
    try {
        const order = await Order.create({ customerId: req.body.customerId}, {transaction: t});

        for (let oderLineData of req.body.orderLine) {
            const product = await Product.findByPk(oderLineData.productId);
            if (product.qty < oderLineData.qty) {
                throw new Error('Not enough stock');
            }
            if (product.qty - oderLineData.qty < product.alert) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: 'julien.dotremont@me.com', 
                    // to: Customer.email,
                    subject: 'Stock alert',
                    text: `Product ${product.name} is running low on stock. Current stock: ${product.qty}`
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info);
                    }
                });
            }

            product.qty -= oderLineData.qty;
            await product.save({transaction: t});

            const orderLine = await OrderLine.create({
                orderId: order.id,
                productId: oderLineData.productId,
                qty: oderLineData.qty,
                price: product.price,
            }, {transaction: t});
        }

        await t.commit();

        res.status(201).json(order);
    } catch (err) {
        await t.rollback();
        res.status(400).json({ message: err.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderLine,
                    include: [Product],
                },
                Customer,
            ],
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{
                model: OrderLine,
                as: 'order_lines'
            }],
            transaction: t
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        for (let orderLine of order.order_lines) {
            const product = await Product.findByPk(orderLine.productId, {transaction: t});
            product.qty += orderLine.qty;
            await product.save({transaction: t});

            await orderLine.destroy({transaction: t});
        }

        await order.destroy({transaction: t});
        
        await t.commit();
        
        res.json({ message: 'Order deleted' });
    }
    catch (err) {
        await t.rollback();
        res.status(400).json({ message: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                { model: OrderLine, include: [Product] },
                Customer,
            ],
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    try {
        await sequelize.transaction(async (t) => {
            const order = await Order.findByPk(id, { transaction: t });

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            await order.update({ status }, { transaction: t });

            const mailOptions = {
                from: process.env.EMAIL,
                to: 'julien.dotremont@me.com',
                subject: 'Order status update',
                text: `Order ${order.id} status has been updated to ${status}.`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info);
                }
            });
        });

        const updatedOrder = await Order.findByPk(id);
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



export const orderController = { createOrder, getOrders, deleteOrder, getOrderById, updateOrder };