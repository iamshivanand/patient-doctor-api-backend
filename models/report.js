import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
  patientName: { type: String, required: true },
  patientId: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorId: { type: String, required: true },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "postive-Admit",
    ],
  },
  date: { type: Date, required: true },
  id: { type: String },
});
export default mongoose.model("Report", reportSchema);
