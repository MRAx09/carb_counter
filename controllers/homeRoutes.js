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
    res.redirect('/');
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


//route to customfood handlebars view
router.get('/customfood', withAuth, (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.render('customfood')
  } else {
    res.redirect('/login');
    return;
  }
}); 

//get route to show search result
//first search our database, then search the nutritionix api
router.post('/search', async (req, res) => {  
  try {
      console.log('req.body')
      console.log(req.body)
      const foodSearch = await Food.findAll( {
        where: [{
          food_name: req.body.food_name,
        }]
      }); 
      
      console.log('foodSearch')
      console.log(foodSearch)
      


      

      // res.redirect(`/food/${foodSearchPlain[0].id}`)
      


      if (foodSearch === undefined || foodSearch.length == 0) {

        // const food = req.body;

        // console.log('below is food')
        // console.log(food)

        const nutritionix = require("nutritionix-api");
        // const { classToInvokable } = require("sequelize/types/lib/utils")

        const YOUR_APP_ID   = '6d49b16d'; // Your APP ID
        const YOUR_API_KEY  = 'c3f9948827ec66b95e92858e23b748e4'; // Your KEY


        // const whatFood = document.querySelector('#nutritionixsearch').value.trim();
        const whatFood = req.body.food_name

        console.log(whatFood)


        nutritionix.init(YOUR_APP_ID,YOUR_API_KEY);

        nutritionix.natural.search(whatFood).then(result => {
        console.log(result.foods[0].food_name);

        const create = result.foods[0];
        console.log('LOOK HERE')
        console.log(create)

        const newFood = Food.create({
          food_name: create.food_name,
          serving_qty: create.serving_qty,
          serving_unit: create.serving_unit,
          serving_weight_grams: create.serving_weight_grams,
          nf_total_carbohydrates: create.nf_total_carbohydrate,
          nf_dietary_fiber: create.nf_dietary_fiber
        });
        res.status(200).json(newFood);
        // res.render ('search', {
        //   result,
        //   logged_in: req.session.logged_in 
        //   });
        // });

      }); 
    }
    else {
        
        console.log('in the else')
        foodSearchPlain = JSON.parse(JSON.stringify(foodSearch))
      console.log('foodsearchplain')
      console.log(foodSearchPlain[0].id)

      const stringId = foodSearchPlain[0].id.toString()
      console.log(stringId)

      res.send(stringId)
      // res.status(200).foodSearchPlain[0].id

      }


    

  
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});



module.exports = router;
