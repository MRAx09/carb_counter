const User = require('./User');
const Food = require('./Food');
const Meal = require('./Meal');
const Mealfood = require('./Mealfood');

User.hasMany(Meal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Meal.belongsTo(User, {
  foreignKey: 'user_id'
});

Meal.hasMany(Food, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Food.belongsToMany(Meal, {
    through: Mealfood
  });

Meal.belongsToMany(Food, {
    through: Mealfood
  });

module.exports = { Food, Meal, User };