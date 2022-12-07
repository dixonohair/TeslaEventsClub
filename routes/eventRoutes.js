const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');

const router = express.Router();

router.get('/connections', controller.index);

router.get('/newConnection', isLoggedIn, controller.newConnection);

router.post('/', isLoggedIn, controller.create);

router.get('/:id', controller.show);

router.get('/:id/edit', isLoggedIn, isAuthor, controller.edit);

router.put('/:id', isLoggedIn, isAuthor, controller.update);

router.delete('/:id', isLoggedIn, isAuthor, controller.delete);

//route to add user to rasvp schema when user clicks their chice
router.put(':id/rsvp', isLoggedIn, isAuthor, controller.addRSVP);

module.exports = router;