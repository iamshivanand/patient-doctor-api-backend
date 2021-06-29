import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
//importing the routes
import reportsRoutes from "./routes/reports.js";
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";

const router = express.Router();
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(cors());

//always specify the routes after cors

app.use("/", (req, res) => {
  res.send(`<div>
      <h1>Welcome to this API 🙏</h1>
      <h4>All Routes are given below</h4>
      <ul>
        <li>/doctor/register</li>
        <li>/doctor/login</li>
        <li>/patient/register</li>
        <li>/patient/:id/create_report</li>
        <li>/patient/:id/all-reports</li>
        <li>/reports/:status</li>
      </ul>
    </div>`);
});
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/reports", reportsRoutes);
const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(
      PORT,
      console.log(`Sever is connected with DB ad fired🚀🚀 on PORT : ${PORT}`)
    );
  })
  .catch((error) => {
    console.error(error);
  });

// mongoose.set(useFindAndModify, false);
