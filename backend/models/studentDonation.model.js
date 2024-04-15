const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const StudentDonation = sequelize.define("StudentDonation", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        donarId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        studentId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        donationId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        mode: {
            type: DataTypes.ENUM,
            values: ['auto', 'manual'],
            defaultValue: 'manual'
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    },
        {
            tableName: "studentDonation",
            timestamps: true
        });
    StudentDonation.associate = () => {

    }
    return StudentDonation;
}