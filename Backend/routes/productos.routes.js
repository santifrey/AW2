import express from "express";
import Producto from "../models/Producto.js";

const router = express.Router();

// GET todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// GET por id
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findOne({ id: Number(req.params.id) });
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// POST crear producto
router.post("/", async (req, res) => {
  const { nombre, desc, precio, imagen, stock, activo, categoria } = req.body;

  if (
    !nombre ||
    !desc ||
    precio === undefined ||
    !imagen ||
    stock === undefined ||
    activo === undefined ||
    !categoria
  ) {
    return res.status(400).json({
      error: "Faltan campos obligatorios"
    });
  }

  if (typeof precio !== "number" || typeof stock !== "number") {
    return res.status(400).json({
      error: "Precio y stock deben ser números"
    });
  }

  try {
    const ultimo = await Producto.findOne().sort("-id");
    const nextId = ultimo ? ultimo.id + 1 : 1;

    const nuevo = new Producto({
      id: nextId,
      nombre,
      desc,
      precio,
      imagen,
      stock,
      activo,
      categoria
    });

    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

// PUT actualizar producto
router.put("/:id", async (req, res) => {
  const productId = Number(req.params.id);

  const { nombre, desc, precio, imagen, stock, activo, categoria } = req.body;

  if (precio !== undefined && typeof precio !== "number") {
    return res.status(400).json({
      error: "Precio debe ser número"
    });
  }

  if (stock !== undefined && typeof stock !== "number") {
    return res.status(400).json({
      error: "Stock debe ser número"
    });
  }

  try {
    const updates = {};
    if (nombre !== undefined) updates.nombre = nombre;
    if (desc !== undefined) updates.desc = desc;
    if (precio !== undefined) updates.precio = precio;
    if (imagen !== undefined) updates.imagen = imagen;
    if (stock !== undefined) updates.stock = stock;
    if (activo !== undefined) updates.activo = activo;
    if (categoria !== undefined) updates.categoria = categoria;

    const productoActualizado = await Producto.findOneAndUpdate(
      { id: productId },
      { $set: updates },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

export default router;