const { Schema } = require('mongoose');

const WorkingHoursSchema = new Schema ({
    clockedID: {
        type: String,
        required: false
    },
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
    userTimeZone: {
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

WorkingHoursSchema.virtual('workedTime').get(function () {
    if (this.clockedOutTime) {
        let wt = ((parseInt(this.clockedOutTime) - parseInt(this.clockedInTime)) / (1000 * 60 * 60)).toFixed(2)
        return wt
    }
    return 0.00
})

WorkingHoursSchema.virtual('paidTime').get(function () {
    if (this.clockedOutTime) {
        let wt = parseFloat(((parseInt(this.clockedOutTime) - parseInt(this.clockedInTime)) / (1000 * 60 * 60)).toFixed(2))
        let pt = parseFloat((parseFloat(this.payAmount) *  wt).toFixed(2))
        return pt
    }
    return 0.00
})

module.exports = WorkingHoursSchema;