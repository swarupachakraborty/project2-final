const express = require('express');
const router = express.Router();
const internController = require("../controller/internController")
const collegeController= require("../controller/collegeController")

router.post('/functionup/colleges',collegeController.create)

router.post("/functionup/interns",internController.create)
router.get("/functionup/collegeDetails",collegeController.get)

module.exports=router