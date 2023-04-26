'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tour_discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tourId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tours",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      discountId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Discounts",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tour_discounts');
  }
};