import mongoose from "mongoose";
import bcrypt from "bcrypt";
import gravatar from "gravatar"

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
        profileImage : {
            type : String
        }
    },
    {
        timestamps : true
    }

)

//패스워드 암화화

userSchema.pre("save", async function (next) { //저장하기 직전 실행되는 함수
  try {
      if (!this.isModified("password") || !this.isModified("prfileImage")) { //패스워드 변경, 프로필변경
          next() //나가다
      }
      
      //프로필이미지 자동생성
      const avatar = await gravatar.url(
          this.email,
          { s: '200', r: 'pg', d: 'mm' },
          { protocol : "https" }
      )
      this.profileImage = avatar

      //패스워드 암호화
      const salt = await bcrypt.genSalt(10) //암호화 만들기
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword

      next()
  } catch (err) {
      next(err)
  }
})
//패스워드 해쉬 비교함수
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const userModel = mongoose.model("user", userSchema)

export default userModel