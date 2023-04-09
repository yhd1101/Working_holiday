import mongoose from "mongoose";
//originalName, countryCapital, area,population,
//religion, GDP, countryInfopage
const countryInfoSchema = mongoose.Schema(
    {
        country : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "country",
            required : true
        },
        originalName : {
            type: String,
            required : true
        },
        countryCapital : {
            type: String,
            required : true
        },
        area : {
            type : Number,
            required : true
        },
        population : {
            type: String,
            required : true
        },
        religions :{
            type : [String],
            required : true
        },
        gdp : {
            type: String,
            required : true
        },
        site1 : { //네덜란드 정보페이지
            type: String,
            required : true
        },
        site2 : {
            type : String,
            required : true
        }


    },
    {
        timeStamps : true
    }
)

const countryInfoModel = mongoose.model("countryInfo", countryInfoSchema)

export default countryInfoModel