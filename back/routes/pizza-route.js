//pizza-route.js
const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizza-controller');

router.get('/pizzas', pizzaController.getAllPizzas);
router.get('/pizzas/:id', pizzaController.getPizzaById);
router.post('/pizzas', pizzaController.createPizza);
router.put('/pizzas/:id', pizzaController.updatePizza);
router.delete('/pizzas/:id', pizzaController.deletePizza);

module.exports = router;
