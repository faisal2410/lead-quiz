const authMiddleware = require("../middlewares/authMiddleware");
const {addReport,getAllReports,getAllReportsByUser}=require("../controllers/reports")

const router = require("express").Router();

// add report

router.post("/add-report", authMiddleware, addReport);

 // get all reports

router.post("/get-all-reports", authMiddleware, getAllReports);

// get all reports by user
router.post("/get-all-reports-by-user", authMiddleware, getAllReportsByUser);

module.exports = router;
