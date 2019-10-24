const router = require('express').Router();

const Firefly = require('../models/fireflies');

//err messages
const error = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}` })
}

//CRUD requests
//Get actions
router.get('/', (req, res) => {
  Firefly
  .find()
  .then(flies => {
    res.status(200).json(flies);
  })
  .catch(err => {
    error(500, err, res);
  });
});

//By id
router.get('/:_id', (req, res) => {
  //Establish an ID for checking
  const { _id } = req.params;

  Firefly
  .findById(_id)
  .then(flies => {
    res.status(200).json(flies);
  })
  .catch(err => {
    error(500, err, res);
  });
});

//Post actions
router.post('/', (req, res) => {
  const firefly = new Firefly({
    //Enter the fireflies name
    firefly_name: req.body.firefly_name
  });

  Firefly
  .save()
  .then(newFly => {
    res.status(201).json(newFly)
  }) 
  .catch(err => {
    error(500, err, res);
  });
});

//Put actions
router.put('/:_id', (req, res) => {
  //Set an ID to check and grab changes from the body
  const { _id } = req.params;
  const metamorphasis = req.body;

  Firefly
  .findByIdAndUpdate(_id, metamorphasis)
  .then(change => {
    res.status(200).json(change)
  })
  .catch(err => {
    error(500, err, res);
  });
});

//Delete actions
router.delete('/:_id', (req, res) => {
  const { _id } = req.params;

  Firefly
  .findByIdandDelete(_id)
  .then(deadFly => {
    res.status(200).json(deadFly)
  })
  .catch(err => {
    error(500, err, res);
  });
});

module.exports = router;