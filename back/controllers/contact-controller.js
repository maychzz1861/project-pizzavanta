const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// สร้าง contact ใหม่
exports.createContact = async (req, res, next) => {
  const { firstName, lastName, email, message } = req.body;
  try {
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        message,
      },
    });
    res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
};

// ดึงข้อมูล contact ทั้งหมด
exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

// ดึงข้อมูล contact โดยใช้ ID
exports.getContactById = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(contactId) },
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
};

// อัปเดตข้อมูล contact โดยใช้ ID
exports.updateContactById = async (req, res, next) => {
  const contactId = req.params.id;
  const { firstName, lastName, email, message } = req.body;
  try {
    const updatedContact = await prisma.contact.update({
      where: {
        id: parseInt(contactId),
      },
      data: {
        firstName,
        lastName,
        email,
        message,
      },
    });
    res.status(200).json({ contact: updatedContact });
  } catch (error) {
    next(error);
  }
};

// ลบ contact โดยใช้ ID
exports.deleteContactById = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    await prisma.contact.delete({
      where: {
        id: parseInt(contactId),
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
