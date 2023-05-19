'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('products', { 
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
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('in stock', 'out of stock'),
        allowNull: false,
    },
    alert: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('products');
  }
};
