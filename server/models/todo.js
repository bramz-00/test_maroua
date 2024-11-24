'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN  ,

    priority: {
      type: DataTypes.ENUM('High', 'Medium', 'Low'), // Define ENUM values here
      allowNull: false,
      defaultValue: 'Medium',
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};