//import models
import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import Report from "../models/report.js";

export const register = async (req, res) => {
  //get the name of patient doctor name
  const { name, phoneNumber } = req.body;

  try {
    //check if patient already exist
    const existingPatient = await Patient.findOne({ phoneNumber });

    // if patient already exist
    if (existingPatient) {
      //lets return the patient
      return res.status(200).json({ result: existingPatient });
    }
    //if patient doesn't exist create the patient
    //create patient
    const patient = await Patient.create({ phoneNumber, name });
    //send the patient
    res.status(200).json({ patient });
  } catch (error) {
    return res.status(200).json({ message: "something went wrong", error });
  }
};
export const createReport = async (req, res) => {
  const patientId = req.params.id;
  const { doctorId, status } = req.body;
  try {
    //create the report for the patient
    //need to pass doctorID and patientID
    //check if patientId is valid and patient exist
    const patientExist = await Patient.findById({ patientId });
    const doctorExist = await Doctor.findById({ doctorId });
    //if patient does not exist
    if (!patientExist) {
      return res.status(200).json({ message: "can't find this Patient" });
    }
    if (!doctorExist) {
      return res.status(200).json({ message: "can't find this Doctor" });
    }
    //if both doctor and patient do exist
    //create the report
    const report = Report.create({
      patientName: patientExist.name,
      patientId,
      doctorId,
      doctorName: doctorExist.name,
      status,
      date: Date.now(),
    });
    res.status(200).json({ report });
  } catch (error) {
    res
      .status(200)
      .json({ message: "Something went wrong while creating report", error });
  }
};
export const allReports = async (req, res) => {
  //we need to send all the reports of particular patient
  const patientId = req.params.id;
  try {
    const patientExist = await Patient.findById({ patientId });
    if (!patientExist) {
      return res.status(200).json({ message: "can't find this Patient" });
    }
    const allReportsData = await Report.find({ patientId });
    res.status(200).json({ allReportsData });
  } catch (error) {
    res
      .status(200)
      .json({ message: "error while fetching all reports", error });
  }
};
