const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controller functions for CRUD operations
exports.getAllPizzas = async (req, res) => {
    try {
        const pizzas = await prisma.pizza.findMany();
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPizzaById = async (req, res) => {
    const pizzaId = parseInt(req.params.id);
    try {
        const pizza = await prisma.pizza.findUnique({
            where: {
                id: pizzaId
            }
        });
        if (!pizza) {
            res.status(404).json({ message: "Pizza not found" });
        } else {
            res.json(pizza);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createPizza = async (req, res) => {
  const { name, description, crustType, size, price, image } = req.body;
  try {
      const newPizza = await prisma.pizza.create({
          data: {
              name,
              description,
              crustType,
              size,
              price: parseInt(price), // แปลงเป็น Integer
              image
          }
      });
      res.status(201).json(newPizza);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};





exports.updatePizza = async (req, res) => {
  const pizzaId = parseInt(req.params.id);
  const { name, description, crustType, size, price, image } = req.body;
  try {
      const updatedPizza = await prisma.pizza.update({
          where: {
              id: pizzaId
          },
          data: {
            name,
            description,
            crustType,
            size,
            price: parseInt(price), // แปลงเป็น Integer
            image
        }
    });
    res.status(201).json(updatedPizza);
} catch (error) {
    res.status(400).json({ error: error.message });
}
};



exports.deletePizza = async (req, res) => {
    const pizzaId = parseInt(req.params.id);
    try {
        await prisma.pizza.delete({
            where: {
                id: pizzaId
            }
        });
        res.json({ message: "Deleted pizza successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
