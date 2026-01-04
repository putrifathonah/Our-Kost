const Contact = require("../models/contact");

// Create contact message
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validasi input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    // Buat contact baru
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Simpan ke database
    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirim",
      data: savedContact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengirim pesan",
      error: error.message,
    });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Data pesan berhasil diambil",
      data: contacts,
    });
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

// Get single contact
exports.getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Pesan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data pesan berhasil diambil",
      data: contact,
    });
  } catch (error) {
    console.error("Error getting contact:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;


    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Pesan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status pesan berhasil diperbarui",
      data: contact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui status",
      error: error.message,
    });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Pesan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pesan berhasil dihapus",
      data: contact,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus pesan",
      error: error.message,
    });
  }
};
