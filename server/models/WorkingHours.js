const { Schema } = require('mongoose');

const WorkingHoursSchema = new Schema ({
    clockedInTime: {
        type: String,
        required: false
    },
    payAmount: {
        type: String,
        default: "0.00"
    },
    clockedOutTime: {
        type: String,
        required: false
    },
    forDate: {
        type: String,
        required: false
    }
},
{
    toJSON: {
        virtuals: true,
    }
})

module.exports = WorkingHoursSchema;