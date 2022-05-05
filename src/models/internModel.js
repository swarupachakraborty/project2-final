const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId
const internSchema =  mongoose.Schema( {
    name: { required:true, type:String,lowercase:true, trim:true },
    
    email: { required:true, unique:true, type:String,trim:true },
   
    mobile:{ type:Number, required:true, unique:true},
    
    collegeId: { type:ObjectId, required:true, ref:"College" },
   
    isDeleted: { type:Boolean, default: false },

}, { timestamps: true });   


module.exports = new mongoose.model('Intern', internSchema)
