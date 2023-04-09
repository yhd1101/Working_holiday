import express from "express";
import countryModel from "../models/country.js";
import countryInfoModel from "../models/countryInfo.js";

const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const countries = await countryModel.find()
        res.json(countries)
    } catch (err){
        res.status(500).json({
            msg : err
        })
    }

})

//country 상세정보 api
router.get("/:id", async (req, res) => {
    try {
        const country = await countryModel.findById(req.params.id)
        if(!country) {
            res.status(404).json({
                msg : "No country"
            })
        }
        const countryInfo = await countryInfoModel.findOne({country : req.params.id})
        res.json({
            country, countryInfo
        })

    } catch (err) {
        msg : err
    }
})

//등록하기
router.post("/create", async (req, res) => {
    const {introduce1, name, capital, language, introduce2 } = req.body
    try {
        const newCountry = new countryModel({
            introduce1, name, capital, language, introduce2
        })

        const result = await newCountry.save()
        res.json({
            msg : "Successful CountryMain",
            result : result
        })

    } catch (err) {
        res.status(500).json({
            msg : err
        })
    }

})


export default router