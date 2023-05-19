import bcrypt from 'bcrypt';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'seller'),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user) => {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
        }
    } 
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
