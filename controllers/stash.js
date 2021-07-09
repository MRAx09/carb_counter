router.get('/', async (req, res) => {
    try {
      //Home page shoud show list of favorite foods, might also need a route for current meal.
      //do we need separate table for current meal or should we use local storage for that?
      
      
      const favData = await User.findByPk(req.session.id, {
        // where: {
        //   favorite: true
        // }
        include: [
          {
            model: Food,
            as: 'foods',
            attributes: ['food_name']
          }
        ]
      });
  
      const favorites = favData.map((food) => food.get({ plain: true }));
      console.log(favorites);
  
      res.render('homepage', {
        ...favorites,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });