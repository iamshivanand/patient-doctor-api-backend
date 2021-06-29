//import models
import Report from "../models/report.js";

export const status = async (req, res) => {
  const status = req.params.status;
  try {
    const reports = await Report.find({ status });
    res.status(200).json({ reports });
  } catch (error) {
    res
      .status(200)
      .json({ message: "error while fetching the reports", error });
  }
};
