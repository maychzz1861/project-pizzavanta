const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new order
exports.createOrder = async (req, res, next) => {
  const { OrderDate, total, status, userId } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        OrderDate,
        total,
        status,
        userId,
      },
    });
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};

// Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

// Get order by ID
exports.getOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

// Update order by ID
exports.updateOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  const { OrderDate, total, status, userId } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: {
        OrderDate,
        total,
        status,
        userId,
      },
    });
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    next(error);
  }
};

// Delete order by ID
exports.deleteOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    await prisma.order.delete({
      where: {
        id: parseInt(orderId),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
