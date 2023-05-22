'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
    },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id',
        }
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('pending', 'paid', 'delivered', 'cancelled', 'refunded', 'delivering', 'shipped', 'processing'),
        defaultValue: 'pending',
        allowNull: false,
    }, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
