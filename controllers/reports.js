const Exam = require("../models/exams");
const User = require("../models/user");
const Report = require("../models/report");

exports.addReport=async (req, res) => {
    try {
      const newReport = new Report(req.body);
      await newReport.save();
      res.send({
        message: "Attempt added successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }

  exports.getAllReports=async (req, res) => {
    try {
      const { examName, userName } = req.body;
  
      const exams = await Exam.find({
        name: {
          $regex: examName,
        },
      });
  
      const matchedExamIds = exams.map((exam) => exam._id);
  
      const users = await User.find({
        name: {
          $regex: userName,
        },
      });
  
      const matchedUserIds = users.map((user) => user._id);
  
      const reports = await Report.find({
        exam: {
          $in: matchedExamIds,
        },
        user: {
          $in: matchedUserIds,
        },
      })
        .populate("exam")
        .populate("user")
        .sort({ createdAt: -1 });
      res.send({
        message: "Attempts fetched successfully",
        data: reports,
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }

  exports.getAllReportsByUser=async (req, res) => {
    try {
      const reports = await Report.find({ user: req.body.userId })
        .populate("exam")
        .populate("user")
        .sort({ createdAt: -1 });
      res.send({
        message: "Attempts fetched successfully",
        data: reports,
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }