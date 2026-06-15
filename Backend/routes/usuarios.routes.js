import express from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import Venta from "../models/Venta.js";

const router = express.Router();

// GET todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  const { email, contraseña } = req.body;
  if (!email || !contraseña) {
    return res.status(400).json({ error: "Faltan email o contraseña" });
  }

  try {
    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await user.comparePassword(contraseña);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    if (!user.activo) {
      return res.status(403).json({ error: "Usuario inactivo" });
    }

    // Generar Token JWT
    const secret = process.env.JWT_SECRET || "super_secret_key_tienda_tech_2026";
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email },
      secret,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor al iniciar sesión" });
  }
});

// GET por id
router.get("/:id", async (req, res) => {
  try {
    const user = await Usuario.findOne({ id: Number(req.params.id) });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

// POST crear usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, activo } = req.body;
    if (!nombre || !apellido || !email || !contraseña) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si el email ya existe
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    // Obtener ID numérico incremental
    const ultimoUsuario = await Usuario.findOne().sort("-id");
    const nextId = ultimoUsuario ? ultimoUsuario.id + 1 : 1;

    const newUser = new Usuario({
      id: nextId,
      nombre,
      apellido,
      email,
      contraseña,
      activo: activo !== undefined ? activo : true
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

// DELETE usuario
router.delete("/:id", async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const user = await Usuario.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si tiene ventas asociadas
    const tieneVentas = await Venta.exists({ id_usuario: userId });
    if (tieneVentas) {
      return res.status(400).json({
        error: "No se puede eliminar el usuario porque tiene ventas asociadas"
      });
    }

    await Usuario.deleteOne({ id: userId });
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

export default router;