const router = require('express').Router();
const { Food, Meal, User, Mealfood, Favorite } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  
    const testData = await Food.findAll().catch((err) => {
      res.json(err);
    });
    const datas = testData.map((food) => food.get({ plain: true }));
    
    console.log(datas);

    res.render('favorites', { datas });
});

router.get('/favorites', async (req, res) => {
  try {
    // console.log(req.session.user_id)
    const favData = await Favorite.findAll({
        // include: {
        //   model: food,
        //   attributes: ['food_name']
        // }
        
        where: {
          //user_id: req.session.user_id
          user_id: 1
          // attributes: ["food_id"],
          // include: {
          //   model: Food
          }
        
      //   // include: {
      //   //   model: Food,
      //   //   attributes: ["food name"]
      //   // }
      // },
    
    });
  

  const favorites = favData.map((food) => food.get({ plain: true }));
  console.log(favorites)

  res.render('homepage', {
    ...favorites,
    logged_in: req.session.logged_in
  });
   
  } catch (err) {
      res.status(500).json(err)
  }
});

router.get('/food/:id', async (req, res) => {
    try {
      console.log(req.params)
      const foodData = await Food.findByPk(req.params.id);
  
      const food = foodData.get({ plain: true });
  
      res.render('food', {
        ...food,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/meal/:id', async (req, res) => {
  try {
    const mealData = await Meal.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    const meal = mealData.get({ plain: true });

    res.render('meal', {
      ...meal,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Meal }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
