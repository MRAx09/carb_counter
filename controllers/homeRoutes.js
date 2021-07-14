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
      // res.render('landingpage');
      const onSignupLogin = true;
      res.render('landingpage', { onSignupLogin });
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



      // const savedMealData = await Meal.findAll({
      //   where: {
      //     // user_id: req.session.user_id
      //     id: req.session.user_id
      //   },
      //   include: {
      //     model: Food,                  
      //     through: { attributes: [] },  
      //   }
      // });
      // const usermeals = savedMealData.map((food) => food.get({ plain: true }));



// ********* end savedMealData section


//&&&&&&  adding new saved meal section




const savedMealData = await Meal.findAll({
  where: {
    user_id: req.session.user_id
  },
  include: {
    model: Food,                  
    through: { attributes: [] },   
  }
});

console.log(savedMealData);
console.log('++++++++++++++++++++++++++')
const usermeals = savedMealData.map((food) => food.get({ plain: true }));

console.log(usermeals)
console.log(JSON.stringify(usermeals))
if (usermeals.hasOwnProperty("food_name")){ console.log(usermeals.food_name)};
console.log('mmmmmmmmmmmmmmmm')





//&&&&&&  end of new saved meal section



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

      console.log('*******userFood******    ', userFoods)
      console.log('******************** userMeals:     ', usermeals)

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


//get route to show search result
//first search our database, then search the nutritionix api
router.get('/search', async (req, res) => {  
  try {
      console.log('*******************req.query:   ', req.query)
      const foodSearch = await Food.findAll( {
        where: [{
          food_name: req.query.q,
        }]
      }); 
      
      console.log('1111111  foodSearch[0]    ', foodSearch[0])
      
      if (foodSearch[0] != undefined) {
      const {dataValues: foodResult}= foodSearch[0]
    
      console.log('KKKKKKKKKKK     ', foodResult)

      res.status(200).render('search', foodResult)
      
      } else 

      if (foodSearch === undefined || foodSearch.length == 0) {

 

        const nutritionix = require("nutritionix-api");

        const YOUR_APP_ID   = '6d49b16d'; // Your APP ID
        const YOUR_API_KEY  = 'c3f9948827ec66b95e92858e23b748e4'; // Your KEY


        // const whatFood = document.querySelector('#nutritionixsearch').value.trim();
        const whatFood = req.query.q

        console.log(whatFood)


        nutritionix.init(YOUR_APP_ID,YOUR_API_KEY);

        nutritionix.natural.search(whatFood).then(result => {
        console.log(result.foods[0].food_name);

        const create = result.foods[0];
        console.log('LOOK HERE')
        console.log(create)

        foodResult = {
          food_name: create.food_name,
          serving_qty: create.serving_qty,
          serving_unit: create.serving_unit,
          serving_weight_grams: create.serving_weight_grams,
          nf_total_carbohydrates: create.nf_total_carbohydrate,
          nf_dietary_fiber: create.nf_dietary_fiber
        }

        const newFood = Food.create(foodResult);
        // res.status(200).json(newFood);
        // // res.render ('search', {
        // //   result,
        // //   logged_in: req.session.logged_in 
        // //   });
        // // });

        console.log('newFood........   ', newFood)

      res.status(200).render('search', foodResult)

      }); 

      
    }
    
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});





//get route to show food values for current meal
router.get('/currentmeal', async (req, res) => {  
  try {
      console.log('*******************req.query:   ', req.query)
      const list = req.query.q
      console.log('LLLLLLL list LLLLLL     ', list);
       
      //convert comma separated list without spaces into an array
      const array = list.split(/["',]+/);
      console.log('ARRAY...:    ', array)

      //convert array of strings into array of numbers
      const numArray = array.map((i) => Number(i));
      console.log('NUMBER ARRAY....;     ', numArray);

      //get all foods that have ids in the number array
      const currentMealFoods = await Food.findAll( {
        where: [{
          id: numArray,
        }]
      }); 

      console.log("##### current Meal Foods #####     ", currentMealFoods)
      

      

      const foods = currentMealFoods.map((food) => food.get({ plain: true }));

      console.log('foods..:      ', foods)


      //put foods onto current meal partial in homepage.handlebars
      res.render('currentmeal', {   
        foods,
        logged_in: req.session.logged_in,
      });

} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});





//get route to get searched food ID to feed into local storage for current meal view


router.get('/searchtocurrent', async (req, res) => {  
  try {
      console.log('*******************req.query:   ', req.query)
      const foodSearch = await Food.findAll( {
        where: [{
          food_name: req.query.q,
        }]
      }); 

      var numberArray = [];
      console.log(foodSearch.length)

      // if (foodSearch.length > 1) {

        for (i=0; i<foodSearch.length; i++) {
          numberArray.push(foodSearch[i].dataValues.id)
        }

      console.log('numberArray:       ', numberArray)

      var largest = Math.max.apply(Math, numberArray);

      console.log('largest:        ', largest)
      
      
      res.render('currentmeal', {largest})
      
    
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});






module.exports = router;