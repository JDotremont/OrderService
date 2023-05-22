'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('order_lines', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
    },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'products',
            key: 'id',
        }
    },
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id',
        }
    },
    qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    }, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_lines');
  }
};
