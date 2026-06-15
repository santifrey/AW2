import mongoose from "mongoose";

const productoVentaSchema = new mongoose.Schema(
  {
    id_producto: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    precio_unitario: { type: Number, required: true }
  },
  { _id: false }
);

const ventaSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    id_usuario: { type: Number, required: true },
    fecha: { type: String, required: true },
    total: { type: Number, required: true },
    direccion: { type: String },
    pagado: { type: Boolean },
    productos: [productoVentaSchema]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("Venta", ventaSchema);
