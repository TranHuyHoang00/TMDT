'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tour_note.init({
    tourId: DataTypes.INTEGER,
    noteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour_note',
  });
  return Tour_note;
};