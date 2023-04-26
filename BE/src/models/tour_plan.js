'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tour_plan.init({
    tourId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour_plan',
  });
  return Tour_plan;
};