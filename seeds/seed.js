const sequelize = require('../config/connection');
const { User, Food, Meal, Mealfood, Favorite } = require('../models');

const userData = require('./userData.json');
const foodData = require('./foodData.json');
const mealData = require('./mealData.json');
const mealfoodData = require('./mealfoodData.json');
const favoriteData = require('./favoriteData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const foods = await Food.bulkCreate(foodData, {
    individualHooks: true,
    returning: true,
  });

  for (const meal of mealData) {
    await Meal.create({
      ...meal,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const mealfoods = await Mealfood.bulkCreate(mealfoodData, {
    individualHooks: true,
    returning: true,
  });

  const favorites = await Favorite.bulkCreate(favoriteData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();