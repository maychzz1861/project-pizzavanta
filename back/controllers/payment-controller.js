const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new payment
exports.createPayment = async (req, res, next) => {
  const { paymentDate, paymentMethod, amountPaid, status, orderId } = req.body;
  try {
    const payment = await prisma.payment.create({
      data: {
        paymentDate,
        paymentMethod,
        amountPaid,
        status,
        orderId,
      },
    });
    res.status(201).json({ payment });
  } catch (error) {
    next(error);
  }
};

// Get all payments
exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany();
    res.status(200).json({ payments });
  } catch (error) {
    next(error);
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res, next) => {
  const paymentId = req.params.id;
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(paymentId) },
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ payment });
  } catch (error) {
    next(error);
  }
};

// Update payment by ID
exports.updatePaymentById = async (req, res, next) => {
  const paymentId = req.params.id;
  const { paymentDate, paymentMethod, amountPaid, status, orderId } = req.body;
  try {
    const updatedPayment = await prisma.payment.update({
      where: {
        id: parseInt(paymentId),
      },
      data: {
        paymentDate,
        paymentMethod,
        amountPaid,
        status,
        orderId,
      },
    });
    res.status(200).json({ payment: updatedPayment });
  } catch (error) {
    next(error);
  }
};

// Delete payment by ID
exports.deletePaymentById = async (req, res, next) => {
  const paymentId = req.params.id;
  try {
    await prisma.payment.delete({
      where: {
        id: parseInt(paymentId),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
