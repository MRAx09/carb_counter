const router = require('express').Router();
const { Food, Meal, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  try {
    //Home page shoud show list of favorite foods, might also need a route for current meal.
    //do we need separate table for current meal or should we use local storage for that?
    const favData = await Food.findAll({
      where: {
        favorite: true
      }
    });

    const favorites = favData.map((food) => food.get({ plain: true }));
    console.log(favorites);

    // res.render('homepage', {
    //   ...favorites,
    //   logged_in: req.session.logged_in
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/food/:id', async (req, res) => {
    try {
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
