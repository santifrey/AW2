import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    desc: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
    stock: { type: Number, required: true },
    activo: { type: Boolean, default: true },
    categoria: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("Producto", productoSchema);
