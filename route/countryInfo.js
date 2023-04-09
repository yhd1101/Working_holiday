import express from "express";
import countryInfoModel from "../models/countryInfo.js";

const router = express.Router()


//등록
router.post("/create", async (req, res) => {
    const { originalName, countryCapital, area, population, religions, gdp, site1,site2, country } = req.body
    try {
        const newCountryInfo = new countryInfoModel({
            originalName, countryCapital, area, population, religions, gdp, site1, site2, country
        })
        const result = await newCountryInfo.save()
        res.json({
            msg : "Successful create",
            result : result
        })

    } catch (err){
        res.status(500).json({
            msg : err
        })
    }
})




export default router