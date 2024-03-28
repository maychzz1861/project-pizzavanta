const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');

// สร้าง contact ใหม่
router.post('/contact', contactController.createContact);

// ดึงข้อมูล contact ทั้งหมด
router.get('/contact', contactController.getAllContacts);

// ดึงข้อมูล contact โดยใช้ ID
router.get('/contact/:id', contactController.getContactById);

// อัปเดตข้อมูล contact โดยใช้ ID
router.put('/contact/:id', contactController.updateContactById);

// ลบ contact โดยใช้ ID
router.delete('/contact/:id', contactController.deleteContactById);

module.exports = router;
