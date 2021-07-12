const router = require('express').Router();
const { Food, Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

//post route for user to create a custom food
router.post('/createfood', async (req, res) => {
  let newFood;
  try {

    console.log('IN FOODS POST ROUTE')
    console.log(req.body)

    newFood = await Food.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('NEW NEW FOOD')
    console.log(newFood.id)

    //custom foods created will automatically be added to the user's favorites
    const newFav = await Favorite.create({
      user_id: req.session.user_id,
      food_id: newFood.id
    });

    res.status(200).json(newFood);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

//post route to save the api info from a searched item into our database as a Food
router.post('/savesearchedfood', async (req, res) => {
  try {

    console.log('IN FOODS POST ROUTE')
    console.log(req.body)

    const newFood = await Food.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newFood);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const foodData = await Food.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!foodData) {
      res.status(404).json({ message: 'No food found with this id!' });
      return;
    }

    res.status(200).json(foodData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:food_name', async(req, res) => {
  try {
    console.log(req.body)
    const foodData = await Food.findAll({
      where: {
        food_name: req.body.food_name
      }
    });

    console.log('IN GET FOOD BY NAME ROUTE')
    console.log(foodData)

    // res.render('search', {

    // })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;