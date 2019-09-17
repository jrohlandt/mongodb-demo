const Router = require('express').Router;

const router = Router();

const mongodb = require('mongodb');
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

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
    .then(result => res.status(200).json({movies}))
    .catch(error => res.status(500).json({error}));
});

// Get single movie
router.get('/:id', (req, res, next) => {
  db.getDb()
    .collection('movies')
    .findOne({_id: mongodb.ObjectId(req.params.id)})
    .then(movie => {
      return res.status(200).json({movie})
    })
    .catch(error => res.status(500).json({error}));
});



// Add new movie
router.post('', (req, res, next) => {
  const newMovie = {
    name: req.body.title,
    description: req.body.description,
    year: req.body.year,
    rating: new Decimal128.fromString(req.body.rating.toString()),
    genre: req.body.genre,
  };

  db.getDb()
      .collection('movies')
      .insertOne(newMovie)
      .then(result => {
          res.status(201).json({ message: 'movie added', movieId: result.insertedId });
      })
      .catch(error => res.status(500).json({error}));
});

// Edit existing movie
router.patch('/:id', (req, res, next) => {
  const updatedmovie = {
    name: req.body.title,
    description: req.body.description,
    year: req.body.year,
    rating: new Decimal128.fromString(req.body.rating.toString()),
    genre: req.body.genre,
  };

  db.getDb()
      .collection('movies')
      .updateOne({_id: new ObjectId(req.params.id)}, { $set: updatedmovie })
      .then(result => {
          res.status(200).json({message: 'success', movieId: req.params.id});
      })
      .catch(error => res.status(500).json({error}));
});


router.delete('/:id', (req, res, next) => {
  res.status(200).json({ message: 'movie deleted' });
});

module.exports = router;
