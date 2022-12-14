const { request } = require('express');
const Employee = require('../models/employee.model.js');

// Create and Save a new employee
exports.create = async(req, res) => {
    console.log("req",req)
    try {
        // Create a employee
        const employee = new Employee({
        name: req.body.name, 
        email: req.body.email,
        employeeCode: req.body.employeeCode,
        department: req.body.department,
        designation: req.body.designation,
        mobile: req.body.mobile,
        address: req.body.address,
    });
        // Save employee in the database
        await employee.save()
        res.send(employee);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the employee."
        });
    }
  
};

// Retrieve and return all employees from the database.
exports.findAll = async (req, res) => {
   try {
    const employees = await Employee.find({})
    res.send(employees);
   } catch (error) {
    res.status(500).send({
        message: error.message || "Some error occurred while retrieving employees."
    });
   }
};

// Find a single employee with a employeeId
exports.findOne = async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId)
        res.send(employee);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving employee with id " + req.params.employeeId
        });
    }
};

// Update a employee identified by the employeeId in the request
exports.update = async(req, res) => {
    try {
        // Find employee and update it with the request body
        const employee = await Employee.findByIdAndUpdate(req.params.employeeId, {
            name: req.body.name, 
            email: req.body.email,
            employeeCode: req.body.employeeCode,
            department: req.body.department,
            designation: req.body.designation,
            mobile: req.body.mobile,
            address: req.body.address,
       }, {new: true, runValidators: true})
           res.send(employee);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.employeeId
        });
    }
};

// Delete a employee with the specified employeeId in the request
exports.delete = async (req, res) => {
    try {
        await Employee.findByIdAndRemove(req.params.employeeId);
        res.send({message: "Employee deleted successfully!"});
    } catch (error) {
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.employeeId
        });
    }
};
