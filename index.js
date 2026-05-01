import express from "express";

import usuariosRoutes from "./routes/usuarios.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";

const app = express();

app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});