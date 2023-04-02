import express from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken"


const router = express.Router()

router.post("/signup", async (req ,res) => {
    const { name, email, password } = req.body

    try{
        //email 유무체크
        const user = await userModel.findOne({email})

        if(user){
            return res.status(400).json({
                msg : "user id existed"
            })
        }
        //password 암호화
        // const hashedPassword = await bcrypt.hash(password, 10) //10자리까지 암호화
        const newUser = new userModel({
            name, email, password
            // password : hashedPassword
        })

        const result = await newUser.save()
        res.json({
            msg : "Successful signup",
            userInfo : result
        })

    }catch (err){
        res.status(500).json({
            msg : err
        })
    }
})

router.post("/login", async (req, res) => {

    const { email, password } =req.body

    try{
        //id 유무체크
        const user = await userModel.findOne({ email })
        if(!user){
            return res.json({
                msg : "No userEmail"
            })
        }
        //패스워드 해쉬 비교
        const isMatched = await user.matchPassword(password)
        if (!isMatched) {
            return res.json({
                msg : "password do not match"
            })
        }

        //jsonwebtoken 생성

        const token = await jwt.sign(
            {id : user._id},
            process.env.SECRET_KEY,
            {expiresIn: "1h"} //1시간 지속
        )
        res.json({
            msg : "Successful login",
            token : token
        })

    }catch (err){
        res.status(500).json({
            msg : err
        })
    }
})

export default router