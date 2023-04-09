import express from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken"
import passport from "passport";
import profile from "../models/profile.js";
import profileModel from "../models/profile.js";
const authCheck = passport.authenticate("jwt", { session : false }) //auto


const router = express.Router()

router.post("/signup", async (req ,res) => {
    const { name, email, password, phone } = req.body

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


//user 정보 가져오기
router.get("/", authCheck, async (req, res) => {

    const { name, email, password } = req.user
    const profile = await profileModel.findOne({ user : req.user._id}) //프로필 정보 가져오기
    res.json({
        msg : "Successful get userInfo",
        user : {
            name, email, password
        },
        profile
    })

})

//패스워드 변경(로그인 전단계) - 사용자가 이메일을 넣으면 해당되는 이메일로 비밀번호 변경 로직 전송
router.post("/find/password", async (req, res) => {
    const { email } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({
            msg : "No user"
        })
    }
    //이메일 전송

})


//패스워드 변경(로그인 후단계)


//이메일 찾기
router.post("/find/email", async (req, res) => {
    const { phone } = req.body
    const result = await profileModel.findOne({ phone })
    const user = await userModel.findById(result.user)
    res.json({
        msg : "Successful your email",
        info : user.email
    })

})


//회원탈퇴


//username 변경
export default router