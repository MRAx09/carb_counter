const User = require('./User');
const Food = require('./Food');
const Meal = require('./Meal');

User.hasMany(Meal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Meal.belongsTo(User, {
  foreignKey: 'user_id'
});

Meal.hasMany(Food, {
    // foreignKey: 'user_id',
    // onDelete: 'CASCADE'
  });
  
// Food.belongsToMany(Meal, {
//     // foreignKey: 'user_id'
//     //need a through,  third table?
//   });

module.exports = { Food, Meal, User };