const router = require('express').Router();
const { Meal, Food, Favorite, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/savedmeals', withAuth, async (req, res) => {
  try {
    const savedMealData = await Meal.findAll({
      where: {
        //change below to req.sessoin.user_id when current user id has saved meals
        user_id: 1
      },
      include: {
        model: Food,
        through: { attribites: [] },
      },
    });

    console.log(savedMealData);
    console.log('++++++++++++++++++++++++++')
    const meals = savedMealData.map((food) => food.get({ plain: true }));

    console.log(meals)
    console.log(JSON.stringify(meals))
    if (meals.hasOwnProperty("food_name")){ console.log(meals.food_name)};
    console.log('mmmmmmmmmmmmmmmm')

    res.render('savedmeals', {
      meals,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/savedmeals/:id', withAuth, async (req, res) => {
  try {
    console.log(req.params.id)
    const oneSavedMeal = await Meal.findByPk(req.params.id, {
      where: {
        //change below to req.session.user_id when current user id has saved meals
        user_id: 1
      },
      include: {
        model: Food,
        through: { attribites: [] },
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



router.post('/', withAuth, async (req, res) => {
  try {
    const newMeal = await Meal.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMeal);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;