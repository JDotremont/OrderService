import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const OrderLine = sequelize.define('order_line', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});