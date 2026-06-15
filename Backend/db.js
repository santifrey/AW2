import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tiendatech";

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Conectado con éxito a MongoDB con Mongoose");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
}
