import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { OrderLine } from "./order_line.model.js";

export const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'delivered', 'cancelled', 'refunded', 'delivering', 'shipped', 'processing'),
        defaultValue: 'pending',
        allowNull: false,
    },
});

Order.hasMany(OrderLine, { foreignKey: 'orderId'});
OrderLine.belongsTo(Order, { foreignKey: 'orderId' });