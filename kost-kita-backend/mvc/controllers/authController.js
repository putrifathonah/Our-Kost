const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken"); // import jwt

// Exisiting code

// Register User Baru
const register = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    // Validasi input
    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    // Validasi nama minimal 2 karakter
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Nama minimal 2 karakter",
      });
    }

    // Validasi email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email tidak valid",
      });
    }

    // Validasi phone format (10-15 digit)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Nomor telepon harus 10-15 digit",
      });
    }

    // Validasi password minimal 8 karakter
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 8 karakter",
      });
    }

    // Validasi password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password dan Konfirmasi Password tidak cocok",
      });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    // Buat user baru
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password: password,
    });

    // Simpan ke database
    await newUser.save();

    // Response sukses (jangan kirim password)
    res.status(201).json({
      success: true,
      message: "Registrasi berhasil! Silakan login",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    // Handle duplicate key error (email sudah ada)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password harus diisi",
      });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // Validasi password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // 2. Generete JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "Kunci_rahasia_griya_mdp", // Gunakan env variabel di production
      { expiresIn: "1h" } // tokon kadaluarsa dalam 1 jam
    );

    // Response sukses (jangan kirim password)
    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: token,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
