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
  const { nombre, desc, precio, imagen, stock, activo } = req.body;

  if (
    !nombre ||
    !desc ||
    precio === undefined ||
    !imagen ||
    stock === undefined ||
    activo === undefined
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

  const data = JSON.parse(fs.readFileSync(path));

  const nuevo = {
    id: data.length + 1,
    nombre,
    desc,
    precio,
    imagen,
    stock,
    activo
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
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  const { nombre, desc, precio, imagen, stock, activo } = req.body;

  
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


  data[index] = {
    ...data[index],
    ...(nombre && { nombre }),
    ...(desc && { desc }),
    ...(precio !== undefined && { precio }),
    ...(imagen && { imagen }),
    ...(stock !== undefined && { stock }),
    ...(activo !== undefined && { activo })
  };

  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  res.json(data[index]);
});

export default router;