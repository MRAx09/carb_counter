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

    console.log('req.body:     ', req.body)

    const newMeal = await Meal.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMeal);

    const mealFoods = await Mealfood.bulkCreate({
      meal_id: 'XXXXX',
      food_id: ['X, X, X']
    })
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
  try {
    const savedMealData = await Meal.findAll({
      where: [{
        // user_id: req.session.user_id
        id: req.session.user_id
      }],
      include: [{
        model: Food,                  //??????
        through: { attribites: [] },   //??????
      }]
    });

    console.log(savedMealData);
    console.log('++++++++++++++++++++++++++')
    const usermeals = savedMealData.map((food) => food.get({ plain: true }));

    console.log(usermeals)
    console.log(JSON.stringify(usermeals))
    if (usermeals.hasOwnProperty("food_name")){ console.log(usermeals.food_name)};
    console.log('mmmmmmmmmmmmmmmm')

    if (usermeals) {
      res.render('homepage', {   
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