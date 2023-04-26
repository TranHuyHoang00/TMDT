'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tour_discount.init({
    tourId: DataTypes.INTEGER,
    discountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour_discount',
  });
  return Tour_discount;
};