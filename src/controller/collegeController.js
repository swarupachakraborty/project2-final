const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const createCollege = async function (req, res) {
    try {
         let collegeData = req.body
       
         if (Object.keys(collegeData).length === 0) { 
             return  res.status(400).send({ status: false, msg: "Kindly enter some data " })
         }
         const urlReg = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi
              let name = collegeData.name
              if(!name || typeof name!="string" || name.trim().length==0)
              return res.status(400).send({status: false,msg:"Enter Valid name"})
              
              let fullName = collegeData.fullName
              if(!fullName || typeof fullName!="string" || fullName.trim().length==0)
              return res.status(400).send({status: false,msg:"Enter Valid fullName"})
             
              let logoLink = collegeData.logoLink
              if(!logoLink || typeof logoLink!="string" || !urlReg.test(logoLink))
              return res.status(400).send({status: false,msg:"Enter Valid logoLink"})
                
              let isDeleted = collegeData.isDeleted;
              if( typeof isDeleted!="undefined"&& typeof isDeleted!="boolean")
              return res.status(400).send({status:false,msg:"isDelete has not a valid datatype"})
              if(isDeleted)
              return res.status(400).send({status:false,msg:"you can't delete during creation , it does not mean anything"})
              let data = await collegeModel.findOne({ name }).lean()
              if (data) {
                   return res.status(400).send({ status: false, msg: "Enter Unique name" })}

              let collegeCreated = await collegeModel.create(collegeData)
              res.status(201).send({ status: true, data: collegeCreated })
    }
    catch (error) {
         res.status(500).send({ status: false, msg: error.message })
    }

  };


  const getCollegeDetails = async (req,res)=>{
     const {collegeName} = req.query
     if (!collegeName || typeof collegeName != "string" || collegeName.trim().length == 0)
     return res.status(400).send({ status: false, msg: "please enter valid  name" })
     let collegeData = await collegeModel.findOne({name:collegeName.toLowerCase(),isDeleted:false}).select({name:1,fullName:1,logoLink:1}).lean()
     if(!collegeData)
     return res.status(400).send({status:false,msg:"invalid college name"})
     const internData = await internModel.find({collegeId:collegeData._id}).select({name:1,email:1,mobile:1}).lean()
     collegeData.interests =  internData
     delete collegeData._id
     res.status(200).send({status:true,data:collegeData})
 }
 

  module.exports.create=createCollege
  module.exports.get=getCollegeDetails
