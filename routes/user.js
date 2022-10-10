const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {register,login,getUserInfo}=require("../controllers/user")

// user registration

router.post("/register", register);

// user login

 router.post("/login",login);

 // get user info

router.post("/get-user-info", authMiddleware, getUserInfo);
router.get("/",(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"Hello from Lead Quiz"
    })
})

module.exports = router;
