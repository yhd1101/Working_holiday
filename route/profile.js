import express from "express";
import passport from "passport";
import profileModel from "../models/profile.js";


const router = express.Router()

const checkAuth = passport.authenticate("jwt", { session : false })


//프로필 등록
router.post("/create", checkAuth, async (req, res) => {
    const { bio, birth, phone } = req.body
    try {
        const newProfile = new profileModel({
            bio, birth, phone, user : req.user._id
        })

        const result = await newProfile.save()
        res.json({
            msg : "Successful profile",
            profileInfo : result
        })

    } catch (err) {
        res.status(500).json({
            msg : err
        })
    }
})


export default router