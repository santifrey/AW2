import express from "express";
import fs from "fs";

const router = express.Router();

const path = "./data/usuarios.json";

// GET todos
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
});

// GET por id
router.get("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  const user = data.find(u => u.id == req.params.id);

  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  res.json(user);
});

// POST
router.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));

  const newUser = {
    id: data.length + 1,
    ...req.body
  };

  data.push(newUser);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  res.status(201).json(newUser);
});

// DELETE con validación
router.delete("/:id", (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(path));
  const ventas = JSON.parse(fs.readFileSync("./data/ventas.json"));

  const tieneVentas = ventas.some(v => v.id_usuario == req.params.id);

  if (tieneVentas) {
    return res.status(400).json({
      error: "No se puede eliminar el usuario porque tiene ventas asociadas"
    });
  }

  const nuevosUsuarios = usuarios.filter(u => u.id != req.params.id);
  fs.writeFileSync(path, JSON.stringify(nuevosUsuarios, null, 2));

  res.json({ mensaje: "Usuario eliminado" });
});

export default router;