const router = require('express').Router();
const { Food, Meal, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {  
  try {
    //Home page should show list of favorite foods, might also need a route for current meal.
    //do we need separate table for current meal or should we use local storage for that?
    const foodData = await Food.findAll();

    const foods = foodData.map((food) => food.get({ plain: true }));

    res.render('homepage', {   // ***Should this really go to homepage.handlebars, or should it go to favorites.handlebars
      ...foods,  
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
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

// *******There is no "/profile" handlebars page. We'll probably want to remove this
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Meal }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    alert(`Excelsior: ${req.session.logged_in} <--`);
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
