//introduce1, name, capital,language, introduce2
import mongoose from "mongoose";

const countrySchema = mongoose.Schema(
    {
        introduce1 : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required: true
        },
        capital : {
            type : String,
            required : true
        },
        language : {
            type : [String],
            required : true
        },
        introduce2 : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }

)

const countryModel = mongoose.model("country", countrySchema)

export default countryModel