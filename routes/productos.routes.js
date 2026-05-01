import express from "express";
import fs from "fs";

const router = express.Router();
const path = "./data/productos.json";

// GET todos
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
});

// GET por id
router.get("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  const producto = data.find(p => p.id == req.params.id);

  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

  res.json(producto);
});

// POST
router.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));

  const nuevo = {
    id: data.length + 1,
    ...req.body
  };

  data.push(nuevo);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  res.status(201).json(nuevo);
});

// PUT
router.put("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));

  const index = data.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  data[index] = { ...data[index], ...req.body };

  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  res.json(data[index]);
});

export default router;