'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      number_of_date: {
        type: Sequelize.INTEGER
      },
      quantity_max: {
        type: Sequelize.INTEGER
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Statuses",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      place_start_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Places",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      place_finish_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Places",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Vehicles",
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
    await queryInterface.dropTable('Tours');
  }
};