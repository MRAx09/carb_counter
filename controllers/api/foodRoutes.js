const router = require('express').Router();
const { Food, Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
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
  // console.log('In delete router');
  try {
    const foodData = await Food.destroy({
      where: {
        id: req.params.id,
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



//add a food to favorites
router.post('/addfavorite', withAuth, async (req, res) => {
  try {
    console.log('req.body:    ', req.body)
    console.log('req.body.food_id:       ', req.body.food_id)
    const id = parseInt(req.body.food_id)
    console.log('id:       ', id)
    const newFavorite = await Favorite.create({
      user_id: req.session.user_id,
      food_id: id,
    });

    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;