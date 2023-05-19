import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { OrderLine } from "./order_line.model.js";

export const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    // status: {
    //     type: DataTypes.ENUM('in stock', 'out of stock'),
    //     allowNull: false,
    // },
    alert: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
});

Product.hasMany(OrderLine, { foreignKey: 'productId'});
OrderLine.belongsTo(Product, { foreignKey: 'productId' });