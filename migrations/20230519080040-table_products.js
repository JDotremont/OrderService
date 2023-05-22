'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('products', { 
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        qty: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('in stock', 'out of stock', 'running low'),
            allowNull: false,
            defaultValue: 'in stock',
        },
        alert: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('products');
  }
};
