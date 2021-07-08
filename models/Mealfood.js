const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mealfood extends Model {}

Mealfood.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    meal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    food_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'mealfood',
  }
);

module.exports = Mealfood;
