'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
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
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
