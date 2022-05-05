const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")


const createIntern = async (req, res) => {
    try {
        const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const checkMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/
            
        if (Object.keys(req.body).length == 0)
            return res.status(400).send({ status: false, msg: "please provide some data" })

        const { name, email, mobile, isDeleted, collegeName } = req.body
        if (!name || typeof name != "string" || name.trim().length == 0)
            return res.status(400).send({ status: false, msg: "please enter valid  name" })

        if (!email || typeof email != "string" || !checkEmail.test(email.trim().toLowerCase()))
            return res.status(400).send({ status: false, msg: "please enter valid email" })

        if (!mobile || typeof mobile != "string" || !checkMobile.test(mobile.trim()))
            return res.status(400).send({ status: false, msg: "please enter valid mobile" })

        if (!collegeName || typeof collegeName != "string" || collegeName.trim().length == 0)
            return res.status(400).send({ status: false, msg: "please enter valid collegeName" })

        if (typeof isDeleted!= "undefined" && typeof isDeleted!= "boolean" )
            return res.status(400).send({ status: false, msg: "isDelete has not valid data type" })
        if(isDeleted)
        return res.status(400).send({ status: false, msg: "you can't delete during creation it doesn't make sense" })
            const isEmailUnique = await internModel.findOne({email:email}).count()
            if(isEmailUnique==1)
            return res.status(400).send({ status: false, msg: "email is already present" })

            const isMobileUnique = await internModel.findOne({mobile:mobile}).count()
            if(isMobileUnique==1)
            return res.status(400).send({ status: false, msg: "mobile number is already present" })

        const data = await collegeModel.findOne({ name: collegeName }).select({ _id: 1 }).lean()
        if (!data)
            return res.status(400).send({ status: false, msg: "invalid college name" })
        const collegeId = data._id;
        const savedData = await internModel.create({ name, email, mobile, collegeId })

        res.status(201).send({ status: true, data: savedData })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.create = createIntern;
