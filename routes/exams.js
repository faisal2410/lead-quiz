const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {addExam,getAllExams,getExamById,editExamById,deleteExamById,addQuestionToExam,editQuestionInExam,deleteQuestionInExam}=require("../controllers/exams")

// add exam

router.post("/add", authMiddleware, addExam);

// get all exams
router.post("/get-all-exams", authMiddleware, getAllExams);

// get exam by id
router.post("/get-exam-by-id", authMiddleware, getExamById);

 // edit exam by id
router.post("/edit-exam-by-id", authMiddleware, editExamById);

// delete exam by id
router.post("/delete-exam-by-id", authMiddleware, deleteExamById);

// add question to exam

 router.post("/add-question-to-exam", authMiddleware, addQuestionToExam);

// edit question in exam
router.post("/edit-question-in-exam", authMiddleware, editQuestionInExam);


// delete question in exam
 router.post("/delete-question-in-exam", authMiddleware, deleteQuestionInExam);


module.exports = router;
