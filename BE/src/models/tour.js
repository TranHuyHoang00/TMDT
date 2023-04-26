'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tour.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    number_of_date: DataTypes.INTEGER,
    quantity_max: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    place_start_id: DataTypes.INTEGER,
    place_finish_id: DataTypes.INTEGER,
    vehicleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};