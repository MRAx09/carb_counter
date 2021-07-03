const router = require('express').Router();
const userRoutes = require('./userRoutes');
const foodRoutes = require('./foodRoutes');
const mealRoutes = require('./mealRoutes');

router.use('/users', userRoutes);
router.use('/foods', foodRoutes);
router.use('/meals', mealRoutes);

module.exports = router;