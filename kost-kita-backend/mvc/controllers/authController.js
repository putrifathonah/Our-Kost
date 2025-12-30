const User = require("../model/user");
const jwt = require("jsonwebtoken");

/**s
 * =========================
 * REGISTER
 * =========================
 */
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, nomorTelepon } = req.body;

    console.log("Register Request Body:", { name, email, nomorTelepon });

    // 1. Validasi input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Nama minimal 2 karakter",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 6 karakter",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password dan konfirmasi password tidak cocok",
      });
    }

    // 2. Cek email sudah terdaftar
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    // 3. Simpan user - HANYA kirim field yang ada di schema
    // JANGAN kirim confirmPassword ke database!
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // Ini akan di-hash oleh pre-save hook
      nomorTelepon,
    });

    console.log("User created successfully:", newUser._id);

    return res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        nomorTelepon: newUser.nomorTelepon,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    console.error("Error Stack:", error.stack);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * =========================
 * LOGIN
 * =========================
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    console.log("User found, checking password...");

    // Cek apakah method comparePassword ada
    if (typeof user.comparePassword !== "function") {
      console.error("comparePassword method not found on user model");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const isMatch = await user.comparePassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // Cek JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("Login successful for:", email);

    return res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        nomorTelepon: user.nomorTelepon,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    console.error("Error Stack:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * =========================
 * GET PROFILE (JWT)
 * =========================
 */
const getProfile = async (req, res) => {
  try {
    console.log("Get profile for user ID:", req.user?.id);

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User tidak terautentikasi",
      });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    console.error("Error Stack:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
