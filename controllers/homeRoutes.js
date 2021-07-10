const router = require('express').Router();
const { Food, Meal, User, Mealfood, Favorite } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {  
  try {
    //Home page should show list of favorite foods, might also need a route for current meal.
    //do we need separate table for current meal or should we use local storage for that?


    if (!req.session.logged_in) {
      res.render('homepage');
    } else {
      const userData = await User.findAll( {
        where: [{
          id: req.session.user_id,
        }],
        include: [{
          model: Food,
          as: 'user_foods',
          required: 'false',
        }]
      }); 

      const userNm = await User.findAll( {
        where: [{
          id: req.session.user_id
        }]
      });

      // console.log(userNm);
      // console.log('~~~~~~~~~~~~');
      const usersName = userNm[0].dataValues.name;

      // console.log(usersName);

      const favorites = userData.map((fav) => fav.get({ plain: true}));
      // console.log('********');
      // console.log(favorites[0]);
      // console.log(userData);
      if (userData === undefined || userData.length == 0) {
        res.render('homepage', {logged_in: req.session.logged_in});
      } else {
      const userFoods = favorites[0].user_foods; 

      if (userFoods) {
        res.render('homepage', {   
          userFoods,
          logged_in: req.session.logged_in,
        });
      } else {  
        res.render('homepage', {logged_in: req.session.logged_in});
        // res.render('homepage', {logged_in: req.session.logged_in, userName: usersName});
      }
    }}
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  const onLoginPage = true;
  res.render('login', { onLoginPage });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  const onSignupPage = true;
  res.render('signup', { onSignupPage }); 
});

module.exports = router;
