const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    EquipmentType: {
        type: String,
        enum:{
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    },

})