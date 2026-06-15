import express from "express";
import Venta from "../models/Venta.js";
import Usuario from "../models/Usuario.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// GET todas las ventas
router.get("/", async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
});

// GET ventas por usuario
router.get("/usuario/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const ventas = await Venta.find({ id_usuario: userId });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las ventas del usuario" });
  }
});

// POST registrar una venta (Compra protegida por JWT)
router.post("/", auth, async (req, res) => {
  const { id_usuario, productos, total, direccion, pagado } = req.body;

  // Validar que el usuario que realiza la compra es el mismo del token
  if (req.user.id !== Number(id_usuario)) {
    return res.status(403).json({
      error: "No autorizado. El ID de usuario no coincide con el token."
    });
  }

  try {
    // Verificar si el usuario existe
    const userExists = await Usuario.exists({ id: Number(id_usuario) });
    if (!userExists) {
      return res.status(400).json({ error: "Usuario no existe" });
    }

    // Obtener ID numérico incremental
    const ultimaVenta = await Venta.findOne().sort("-id");
    const nextId = ultimaVenta ? ultimaVenta.id + 1 : 1;

    const nuevaVenta = new Venta({
      id: nextId,
      id_usuario: Number(id_usuario),
      fecha: new Date().toISOString(),
      total,
      direccion,
      pagado: pagado !== undefined ? pagado : true,
      productos
    });

    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la compra" });
  }
});

export default router;