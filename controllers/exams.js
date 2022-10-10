const Exam = require("../models/exams");
const Question = require("../models/question");
exports.addExam=async (req, res) => {
    try {
      // check if exam already exists
      const examExists = await Exam.findOne({ name: req.body.name });
      if (examExists) {
        return res
          .status(200)
          .send({ message: "Exam already exists", success: false });
      }
      req.body.questions = [];
      const newExam = new Exam(req.body);
      await newExam.save();
      res.send({
        message: "Exam added successfully",
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

  exports.getAllExams=async (req, res) => {
    try {
      const exams = await Exam.find({});
      res.send({
        message: "Exams fetched successfully",
        data: exams,
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

  exports.getExamById=async (req, res) => {
    try {
      const exam = await Exam.findById(req.body.examId).populate("questions");
      res.send({
        message: "Exam fetched successfully",
        data: exam,
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

  exports.editExamById=async (req, res) => {
    try {
      await Exam.findByIdAndUpdate(req.body.examId, req.body);
      res.send({
        message: "Exam edited successfully",
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
  exports.deleteExamById=async (req, res) => {
    try {
      await Exam.findByIdAndDelete(req.body.examId);
      res.send({
        message: "Exam deleted successfully",
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

  exports.addQuestionToExam=async (req, res) => {
    try {
       // add question to Questions collection
      const newQuestion = new Question(req.body);
      const question = await newQuestion.save();
  
      // add question to exam
      const exam = await Exam.findById(req.body.exam);
      exam.questions.push(question._id);
      await exam.save();
      res.send({
        message: "Question added successfully",
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

   exports.editQuestionInExam=async (req, res) => {
    try {
     // edit question in Questions collection
     await Question.findByIdAndUpdate(req.body.questionId, req.body);
     res.send({
       message: "Question edited successfully",
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

 exports.deleteQuestionInExam=async (req, res) => {
    try {
       // delete question in Questions collection
       await Question.findByIdAndDelete(req.body.questionId);

      // delete question in exam
       const exam = await Exam.findById(req.body.examId);
       exam.questions = exam.questions.filter(
         (question) => question._id != req.body.questionId
       );
       await exam.save();
       res.send({
         message: "Question deleted successfully",
         success: true,
       });
    } catch (error) {
     
    }
}