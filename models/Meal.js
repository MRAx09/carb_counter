const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Meal extends Model {}

Meal.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    date_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    meal_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    food_ids: {
        type: DataTypes.ARRAY,
        allowNull: false,
    },
    // total_carbohydrates: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         isNumeric: true,
    //     },
    // },
    // fiber: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         isNumeric: true,
    //     },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meal',
  }
);

module.exports = Meal;
