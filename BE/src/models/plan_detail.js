'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Plan_detail.init({
    planId: DataTypes.INTEGER,
    detailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan_detail',
  });
  return Plan_detail;
};