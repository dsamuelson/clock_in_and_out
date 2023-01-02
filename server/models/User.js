const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const WorkingHoursSchema = require(`./WorkingHours`)

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\../, 'Must use a valid email address']
        },
        password: {
            type: String,
            required: true,
        },
        clockedIn: {
            type: Boolean,
            dafault: false
        },
        payAmount: {
            type: String,
            default: "0.00"
        },
        hoursWorked: [WorkingHoursSchema],
        currentHWId: {
            type: String,
            required: false
        }
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('totalPay').get(function () {
    let tp = 0.00
    this.hoursWorked.forEach(element => {tp += (element.paidTime || 0.00)})
    return tp
})

userSchema.virtual('totalTime').get(function () {
    let tt = 0.00
    this.hoursWorked.forEach(element => {tt += (parseFloat((parseFloat(element.workedTime)).toFixed(2)) || 0.00)})
    return tt
})

const User = model('User', userSchema);

module.exports = User;