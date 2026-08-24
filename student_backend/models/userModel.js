const express=require('express');
const mongoose=require('mongoose');
const studentDetails= new mongoose.Schema({
  regNo:{
    type:String,
    required:true,
    unique:true
  },
  candidateName:{
    type:String,
    required:true,
  },
  course:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  marks:{
    type:Number,
    required:true,
  },
  password:{
    type:String,
    required:true
  }
})

module.exports=mongoose.model('students',studentDetails);