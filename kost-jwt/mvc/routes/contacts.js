const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// POST - Buat contact baru (dari form kirim pesan)
router.post("/", contactController.createContact);

// GET - Ambil semua contact
router.get("/", contactController.getAllContacts);

// GET - Ambil contact berdasarkan ID
router.get("/:id", contactController.getContactById);

// PUT - Update status contact
router.put("/:id", contactController.updateContactStatus);

// DELETE - Hapus contact
router.delete("/:id", contactController.deleteContact);

module.exports = router;
