const Router = require('express').Router;

const router = Router();

const mongodb = require('mongodb');
const db = require('../db');


// Get list of movies movies
router.get('/', (req, res, next) => {

  let movies = [];
  let find = {};
  if (req.query.genre) {
    find = {genre: req.query.genre}; 
  }

  db.getDb()
    .collection('movies')
    .find(find)
    .forEach(m => {
      movies.push(m);
    })
    .then(result => res.status(200).json({movies: movies}))
    .catch(err => res.status(500).json({error: err}));
});

// Get single movie
router.get('/:id', (req, res, next) => {
  db.getDb()
    .collection('movies')
    .findOne({_id: mongodb.ObjectId(req.params.id)})
    .then(movie => {
      return res.status(200).json({movie: movie})
    })
    .catch(err => res.status(500).json({error: err}));
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
