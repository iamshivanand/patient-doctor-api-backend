import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("Doctor", doctorSchema);
