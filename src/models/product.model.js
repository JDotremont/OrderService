import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Order } from "./order.model.js";
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('in stock', 'out of stock', 'running low'),
        allowNull: false,
    },
    alert: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
});

Order.hasMany(OrderLine, { 
    foreignKey: 'orderId',
    as: 'orderLines', 
  });
  
  OrderLine.belongsTo(Order, {
    foreignKey: 'orderId',
  });
  
  OrderLine.belongsTo(Product, {
    foreignKey: 'productId',
  });
  
  Product.hasMany(OrderLine, {
    foreignKey: 'productId',
    as: 'orderLines',
  });
  