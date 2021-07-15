const User = require('./User');
const Food = require('./Food');
const Meal = require('./Meal');
const Mealfood = require('./Mealfood');
const Favorite = require('./Favorite');

User.hasMany(Meal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Meal.belongsTo(User, {
  foreignKey: 'user_id'
});

  
Food.belongsToMany(Meal, {
    through: Mealfood,
  });

Meal.belongsToMany(Food, {
    through: Mealfood,
  });

User.belongsToMany(Food, {
  through: {
    model: Favorite,
    unique: false
  },
  as: 'user_foods'
});

Food.belongsToMany(User, {
  through: {
    model: Favorite,
    unique: false
  },
  as: 'food_users'
})

module.exports = { Food, Meal, User, Mealfood, Favorite };