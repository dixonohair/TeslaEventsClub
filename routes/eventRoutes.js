const express = require('express');
const controller = require('../controllers/eventController');

const router = express.Router();

router.get('/connections', controller.index);

router.get('/newConnection', controller.newConnection);

router.post('/', controller.create);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

router.get('/about', controller.about);

router.get('/contact', controller.contact);

module.exports = router;