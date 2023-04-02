import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        // 이름, 생년월일 , 성별, 아이디, 패스워드 ,이메일 , 핸드폰번호
        //로그인 : 아이디 ,패스워드
        name : {
            type : String,
            required : true
        },

        email : {
            type : String,
            unique : true,
            required : true
        },

        password : {
            type : String,
            required : true
        },
    },
    {
        timestamps : true
    }

)

const userModel = mongoose.model("user", userSchema)

export default userModel