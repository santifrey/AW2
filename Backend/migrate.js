import fs from "fs";
import mongoose from "mongoose";
import "dotenv/config";

import Usuario from "./models/Usuario.js";
import Producto from "./models/Producto.js";
import Venta from "./models/Venta.js";

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tiendatech";

async function runMigration() {
  try {
    console.log("Conectando a MongoDB en:", mongoUri);
    await mongoose.connect(mongoUri);
    console.log("Conexión exitosa. Iniciando migración...");

    // 1. Limpiar colecciones
    await Usuario.deleteMany({});
    await Producto.deleteMany({});
    await Venta.deleteMany({});
    console.log("Colecciones vaciadas.");

    // 2. Migrar Usuarios (esto disparará el pre-save hook para encriptar contraseñas)
    const usuariosRaw = JSON.parse(fs.readFileSync("./data/usuarios.json", "utf-8"));
    console.log(`Migrando ${usuariosRaw.length} usuarios...`);
    for (const u of usuariosRaw) {
      const nuevoUsuario = new Usuario(u);
      await nuevoUsuario.save();
    }
    console.log("Usuarios migrados correctamente.");

    // 3. Migrar Productos
    const productosRaw = JSON.parse(fs.readFileSync("./data/productos.json", "utf-8"));
    console.log(`Migrando ${productosRaw.length} productos...`);
    await Producto.insertMany(productosRaw);
    console.log("Productos migrados correctamente.");

    // 4. Migrar Ventas
    const ventasRaw = JSON.parse(fs.readFileSync("./data/ventas.json", "utf-8"));
    console.log(`Migrando ${ventasRaw.length} ventas...`);
    await Venta.insertMany(ventasRaw);
    console.log("Ventas migradas correctamente.");

    console.log("Migración completada exitosamente!");
    process.exit(0);
  } catch (error) {
    console.error("Error durante la migración:", error);
    process.exit(1);
  }
}

runMigration();
