'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tour_ticket.init({
    tourId: DataTypes.INTEGER,
    ticketId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour_ticket',
  });
  return Tour_ticket;
};