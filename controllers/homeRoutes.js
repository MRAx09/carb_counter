const router = require('express').Router();
const { Food, Meal, User, Mealfood, Favorite } = require('../models');
const withAuth = require('../utils/auth');


// router.get('/', async (req, res) => {  
//     if (!req.session.logged_in) {
//       res.render('homepage');
//     } else {
//         res.render('homepage', {logged_in: req.session.logged_in});
//     }
// });
router.get('/', async (req, res) => {  
  try {

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
// ****** savedMealData section below. Don't think this returns the
// ****** right data. We should progably change this to imitate
// ****** what happens with UserData (above) exactly.
      const savedMealData = await Meal.findAll({
        where: [{
          // user_id: req.session.user_id
          id: req.session.user_id
        }],
        include: [{
          model: Food,                  
          through: { attribites: [] },  
        }]
      });
      const usermeals = savedMealData.map((food) => food.get({ plain: true }));
// ********* end savedMealData section
      const userNm = await User.findAll( {
        where: [{
          id: req.session.user_id
        }]
      });

      const usersName = userNm[0].dataValues.name;
      const favorites = userData.map((fav) => fav.get({ plain: true}));

      if (userData === undefined || userData.length == 0) {
        res.render('homepage', {logged_in: req.session.logged_in});
      } else {
      const userFoods = favorites[0].user_foods; 

// **** Add a similar if statement for userMeals?
      if (userFoods) {
        res.render('homepage', {   
          userFoods,
          usermeals,
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

router.get('/food/custom', (req, res) => {
  const customFood = true;
  const customOrMealDetail = true;
  res.render('homepage', { logged_in: req.session.logged_in, customFood, customOrMealDetail })
});

router.get('/food/:id', async (req, res) => {
    try {
      // console.log(req.params)
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

// ***** Don't think this commented out section (GET '/favorites') 
// ***** is needed. Remove it. This code is already in the GET '/' route. 
// router.get('/favorites', async (req, res) => {  
//   try {
//     if (!req.session.logged_in) {
//       res.render('homepage');
//     } else {
//       const userData = await User.findAll( {
//         where: [{
//           id: req.session.user_id,
//         }],
//         include: [{
//           model: Food,
//           as: 'user_foods',
//           required: 'false',
//         }]
//       }); 

//       const userNm = await User.findAll( {
//         where: [{
//           id: req.session.user_id
//         }]
//       });

//       const usersName = userNm[0].dataValues.name;

//       const favorites = userData.map((fav) => fav.get({ plain: true}));

//       if (userData === undefined || userData.length == 0) {
//         res.render('homepage', {logged_in: req.session.logged_in});
//       } else {
//       const userFoods = favorites[0].user_foods; 


//       if (userFoods) {
//         res.render('homepage', {   
//           userFoods,
//           logged_in: req.session.logged_in,
//         });
//       } else {  
//         res.render('homepage', {logged_in: req.session.logged_in});
//       }
//     }}
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

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
  const onLogin = true;
  const onSignupLogin = true;
  res.render('login', { onLogin, onSignupLogin });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  const onSignup = true;
  const onSignupLogin = true;
  res.render('signup', { onSignup, onSignupLogin }); 
});

module.exports = router;