const { text } = require('body-parser');
const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name:{
        type: String,
        required: "Name is required"
    },
    email:{
        type: String,
        required: "Email is required"
    },
    employeeCode:Number,
    department:String,
    designation:String,
    phone:String,
    address:String

}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);
