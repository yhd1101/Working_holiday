import mongoose from "mongoose";
//notice, numberOfRecruits(모집인원),qualification(자격요건),visaCharacteristic(비자 주요특징), requiredDocuments(구비서류),expense, application(신청방법), timeTaken,expirationPeriod(유효기간), visit(체류기간),inquiry(문의)


const visaSchema = mongoose.Schema(
    {
        country : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "country",
            required: true
        },
        notice : {
            type: String,
            required: true
        },
        numberOfRecruits : {
            type : String,
            required : true
        },
        qualification : {
            type : [String],
            required : true
        },
        visaCharacteristic : {
            type : [String],
            required : true
        },
        requiredDocuments : {
            type : [String],
            required : true
        },
        expense : {
            type : String,
            required : true
        },
        application : {
            type : [String],
            required : true
        },
        timeTaken : {
            type : String,
            required : true
        },
        expirationPeriod : {
            type : String,
            required : true
        },
        visit : {
            type : String,
            required : true
        },
        inquiry : {
            type : String,
            required : true
        }


    },

    {
        timestamps : true
    }
)

const visaModel = mongoose.model("visa", visaSchema)

export default visaModel