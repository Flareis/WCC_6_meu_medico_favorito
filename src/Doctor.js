const {Sequelize, DataTypes} = require('sequelize');
const {database} = require("../db");

require("./Doctor.js")

const Doctor = database.define("Doctor",{
    id: {
        type:"DataTypes.BIGINIT",
        autoIncrement: "true",
        alowNull: "false",
        primaryKey: "true"
    },
    name: {
        type: DataTypes.STRING
    },
    CRM: {
        type: DataTypes.STRING
    },
    speciality:{
        type: DataTypes.STRING
    },
    clinic:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.STRING
    },
    favorite:{
        type: DataTypes.BOOLEAN
    }
});

Doctor.sync()

module.exports = 
    Doctor;
