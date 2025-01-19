import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // Email obrigatório
  description: { type: String, default: "Sem descrição" }, // Descrição opcional
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  message: { type: String }, // Campo opcional
  serviceName: { type: String }, // Campo opcional
});

const ServiceRequest = mongoose.model("ServiceRequest", serviceSchema);

export default ServiceRequest;
