import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  id: { type: String },
});
export default mongoose.model("Patient", patientSchema);
