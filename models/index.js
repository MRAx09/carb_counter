const User = require('./User');
const Food = require('./Food');
const Meal = require('./Meal');
const Mealfood = require('./Mealfood');
const Favorite = require('./Favorite');

User.hasMany(Meal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Meal.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// Meal.hasMany(Food, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
//   });
  
Food.belongsToMany(Meal, {
    through: Mealfood,
    // as: 'meals',
    // foreignKey: 'food_id'
  });

Meal.belongsToMany(Food, {
    through: Mealfood,
    // as: 'foods',
    // foreignKey: 'meal_id'
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