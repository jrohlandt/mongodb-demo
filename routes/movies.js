const Router = require('express').Router;

const router = Router();

const db = require('../db');


// Get list of movies movies
router.get('/', (req, res, next) => {
  // Return a list of dummy movies
  // Later, this data will be fetched from MongoDB
  // const queryPage = req.query.page;
  // const pageSize = 5;
  // let resultmovies = [...movies];
  // if (queryPage) {
  //   resultmovies = movies.slice(
  //     (queryPage - 1) * pageSize,
  //     queryPage * pageSize
  //   );
  // }
  // res.json(resultmovies);

  let movies = [];
  db.getDb()
    .collection('movies')
    .find()
    .forEach(m => {
      movies.push(m);
    })
    .then(result => {
      res.status(200).json(movies);
    })
    .catch(err => {
      res.status(500).json({message: 'An error occurred.'});
    });

});

// Get single movie
router.get('/:id', (req, res, next) => {
  const movie = movies.find(p => p._id === req.params.id);
  res.json(movie);
});

// Add new movie
// Requires logged in user
router.post('', (req, res, next) => {
  const newmovie = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image
  };
  console.log(newmovie);
  res.status(201).json({ message: 'movie added', movieId: 'DUMMY' });
});

// Edit existing movie
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedmovie = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image
  };
  console.log(updatedmovie);
  res.status(200).json({ message: 'movie updated', movieId: 'DUMMY' });
});


router.delete('/:id', (req, res, next) => {
  res.status(200).json({ message: 'movie deleted' });
});

module.exports = router;
