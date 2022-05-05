const mongoose = require('mongoose');

const collegeSchema =  mongoose.Schema( {

    name: { required:true, unique:true, type:String, lowercase: true, trim:true },

    fullName: { required:true, type:String , lowercase:true,trim:true},

    logoLink: { type:String, required:true,lowercase:true,trim:true },

    isDeleted:{ type:Boolean, default:false }

}, { timestamps: true });  

module.exports =  new mongoose.model('College', collegeSchema)


