const express = require("express");
const router = express.Router();
const userModels = require("../models/userModel");
const jwt= require('jsonwebtoken');
const bcrypt = require("bcrypt");

// Add Student

router.post("/add", async (req, res) => {

  try {
    const {
      regNo,
      candidateName,
      course,
      email,
      marks,
      password
    } = req.body;


    const regExist = await userModels.findOne({ regNo });

    if (regExist) {
      return res.status(400).json({
        message: "Registration number already exists"
      });
    }


    if (!candidateName || candidateName.trim() === "") {
      return res.status(400).json({
        message: "Candidate name required"
      });
    }


    if (!course || course.trim() === "") {
      return res.status(400).json({
        message: "Course required"
      });
    }


    const emailExist = await userModels.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }


    if (marks === undefined || marks === null) {
      return res.status(400).json({
        message: "Marks required"
      });
    }


    if (!password || password.length < 5) {
      return res.status(400).json({
        message: "Password must contain minimum 5 characters"
      });
    }

const hashedPassword =await bcrypt.hash(password,10);

    const newStudent = new userModels({

      regNo,
      candidateName,
      course,
      email,
      marks,
      password:hashedPassword

    });
    await newStudent.save();
    res.status(201).json({
      message:"Student added successfully",
      student:newStudent
    });

  } catch(error) {
    res.status(500).json({
      message:error.message
    });
  }
});


// Get All Students (OBJECT RESPONSE)

router.get("/", async(req,res)=>{

  try {
    const students = await userModels.find();
    res.status(200).json({
      students: students
    });
  } catch(error) {
    res.status(500).json({
     message:error.message
    });
  }
});




// Get Student By ID
router.get("/:id", async(req,res)=>{
  try{
    const student =
    await userModels.findById(req.params.id);
    if(!student){
      return res.status(404).json({
        message:"Student not found"
      });
    }
    res.status(200).json({
      student:student
    });
  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
});

// Update Student

router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        10
      );
    }

    const updatedStudent =
      await userModels.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student updated successfully",
      student: updatedStudent
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Delete Student

router.delete("/:id", async(req,res)=>{
  try{
    const deletedStudent = await userModels.findByIdAndDelete(req.params.id);
    if(!deletedStudent){
      return res.status(404).json({
        message:"Student not found"
      });
    }
    res.json({
      message:"Student deleted successfully"
    });
  }catch(error){
    res.status(400).json({
      message:error.message
    });
  }
});


// Login

router.post("/login", async(req,res)=>{
  try{
    const {
      email,
      password
    } = req.body;
    const student =
    await userModels.findOne({email});
    if(!student){
      return res.status(404).json({
        message:"Email not found"
      });
    }
    const isPasswordValid= await bcrypt.compare(
      password, student.password
    );
    if(!isPasswordValid){
      return res.status(400).json({
        message:"Invalid password"
      });
    }
    const payload={email:student.email};
    const token = jwt.sign(
  payload,
  process.env.JWT_SECRET
);
    res.status(200).json({
      message:"Login successful",
      token:token,
      student:student
    });
  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
});



module.exports = router;