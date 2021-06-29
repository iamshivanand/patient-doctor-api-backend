import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.js";
import dotenv from "dotenv";

//configure the dotenv file to use it
dotenv.config();

//controller for doctor to register
export const register = async (req, res) => {
  const { phoneNumber, password, confirmPassword, name } = req.body;
  try {
    const existingDoctor = await Doctor.findOne({ phoneNumber });
    //if user already exist
    if (existingDoctor) {
      return res
        .status(200)
        .json({ message: "user already exist please Login!" });
    }
    //if doesnot exist but password and confirm password don't match
    if (password != confirmPassword) {
      return res.status(200).json({ message: "password don't match" });
    }
    //hash the password before storing it into DB
    const hashedPassword = await bcrypt.hash(password, 12);
    //create the doctor and get it back in results

    const doctor = await Doctor.create({
      phoneNumber,
      password: hashedPassword,
      name,
    });
    //generate the token
    const token = jwt.sign(
      { phoneNumber: doctor.phoneNumber, id: doctor._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ doctor, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//controller for doctot to login

export const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    //check if user already in DB or not
    const existingDoctor = Doctor.findOne({ phoneNumber });
    //if user doesn't exist
    if (!existingDoctor) {
      return res.status(200).json({ message: "Doctor doesn't exist" });
    }
    //if user exist check the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingDoctor.password
    );
    //if password do not match
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Invalid credentials" });
    }
    //if password is correct then generate the token
    const token = jwt.sign(
      {
        phoneNumber: existingDoctor.phoneNumber,
        id: existingDoctor._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    //retun the doctor and token
    return res.status(200).json({ doctor: existingDoctor, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
