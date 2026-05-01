import express from "express";
import fs from "fs";

const router = express.Router();
const path = "./data/ventas.json";

// GET todas
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
});

// GET por usuario
router.get("/usuario/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  const ventas = data.filter(v => v.id_usuario == req.params.id);

  res.json(ventas);
});

// POST
router.post("/", (req, res) => {
  const ventas = JSON.parse(fs.readFileSync(path));
  const usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"));

  const userExists = usuarios.some(u => u.id == req.body.id_usuario);

  if (!userExists) {
    return res.status(400).json({ error: "Usuario no existe" });
  }

  const nuevaVenta = {
    id: ventas.length + 1,
    ...req.body
  };

  ventas.push(nuevaVenta);
  fs.writeFileSync(path, JSON.stringify(ventas, null, 2));

  res.status(201).json(nuevaVenta);
});

export default router;