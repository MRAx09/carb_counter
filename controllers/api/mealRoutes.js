const router = require('express').Router();
const { Meal, Food, Favorite, User, Mealfood } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/savedmeals/:id', withAuth, async (req, res) => {
  try {
    console.log(req.params.id)
    const oneSavedMeal = await Meal.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id
      },
      include: {
        model: Food,
        through: { attributes: [] },
      },
    });

    console.log(oneSavedMeal);
    console.log('++++++++++++++++++++++++++')
    const meal = oneSavedMeal.get({ plain: true });

    console.log(meal)
    console.log(JSON.stringify(meal))

    res.render('onesavedmeal', {
      meal,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Original below vvvvvvvvvvvvv
//
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newMeal = await Meal.create({
//       // ...req.body,
//       meal_name: req.body.mealname,
//       user_id: req.session.user_id,
//     });
//     console.log('zzzzz');
//     console.log(req.body);
//     res.status(200).json(newMeal);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// New version below vvvvvvvvvvvv
//
router.post('/', withAuth, async (req, res) => {
  try {
    console.log('req.body:      ', req.body)
    const newMeal = await Meal.create({
      // ...req.body,
      meal_name: req.body.mealname,
      user_id: req.session.user_id,
    });
    console.log('zzzzz');
    console.log(req.body);
    // const newMealfood = await Mealfood.bulkCreate ()


    // const allMealData = await Meal.findAll({
    //   where: [{
    //     id: req.session.user_id
    //   }]
    // });
    const allMealData = await User.findAll( {
      where: [{
        id: req.session.user_id,
      }],
      include: [
      {
        model: Meal,
        as: 'meals',
        required: 'false',
      }],
    });
    // console.log('-----here?');
    // console.log(allMealData);
    // console.log(allMealData[0].meals);
    // console.log('-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
    // console.log(req.session.user_id);
    // console.log(allMealData[0].meals.length);
    // console.log('^^^^^^^^^^^^^^^^^^^^    ^^^^^^^^^^^   ^^^^^^');
    len = allMealData[0].meals.length;
    const lastMealId = allMealData[0].meals[len-1].dataValues.id;
    // console.log(lastMealId);

    var foodsInMeal = req.body.foodIds;
    foodsInMeal = foodsInMeal.replace('\\','');
    // console.log('_+_+_+_+_+_+_+_+_+_+_+');
    // console.log(foodsInMeal);
    var foodsInMeal = foodsInMeal.replace(/\D/g, ",");
    // console.log('_^_^_^_^_^_^_^_^_^_^_^_^_^');
    // console.log(foodsInMeal);
    foodsInMeal = foodsInMeal.split(",");
    var filteredFoodsArray = foodsInMeal.filter(function (el) {
      return el != '';
    });
    // console.log('------------filtered-----------');
    // console.log(filteredFoodsArray);

    // ****************
    // filteredFoodsArray.forEach(async item => {
    //   const newMealFoodItem = await Mealfood.create({
    //     // ...req.body,
    //     meal_id: mealId,
    //     food_id: item,
    //   });
    // });
    // **************
    // filteredFoodsArray.forEach(createMealfood());



    // async function createMealfood() {
    //   console.log('!!!!!!!!~~~~~~~~!!!!!!');
    //   console.log(createMealfood)
    //   const newMealFoodItem = await Mealfood.create({
    //     // ...req.body,
    //     meal_id: mealId,
    //     food_id: item,
    //   });
    // };
    // ***********
    filteredFoodsArray.forEach((entry) = async (entry) => {
      // console.log('-------   ----   ----   ---  ');
      // console.log(entry);
      const blah = entry;
      // console.log(lastMealId);
      const newMealFoodItem = await Mealfood.create({
        // ...req.body,
        meal_id: lastMealId,
        food_id: blah,
      });
      console.log('??????????????');
      console.log(newMealFoodItem);

    });

    // res.render('homepage', {newMeal, logged_in: req.session.logged_in});
    res.status(200).json(newMeal); // ****Update this?
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const mealData = await Meal.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!mealData) {
      res.status(404).json({ message: 'No meal found with this id!' });
      return;
    }

    res.status(200).json(mealData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// *****Don't think we'll need this route (GET '/savedmeals').
// *****Initial homepage route (GET '/') gets this.
router.get('/savedmeals', withAuth, async (req, res) => {
  console.log('user_id:     ', req.session.user_id)
  try {
    const savedMealData = await Meal.findAll({
      where: {
        // user_id: req.session.user_id
        id: req.session.user_id
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

    if (usermeals) {
      res.render('savedmeals', {   
        usermeals,
        logged_in: req.session.logged_in,
      });
      console.log('||||||||||');
      console.log(usermeals);
    };
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;