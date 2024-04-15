const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const StudentDocumentVerification = sequelize.define("StudentDocumentVerification", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        studentName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        classId: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        collegeName: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        university: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        rollNo: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        percentage: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        docOne: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        docTwo: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        docThree: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        docFour: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        docFive: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        status: {
            type: DataTypes.ENUM,
            values: ['verified', 'rejected', 'pending', 'gotScholarship'],
            defaultValue: 'pending'
        },
        docOneStatus: {
            type: DataTypes.ENUM,
            values: ['verified', 'rejected', 'pending'],
            defaultValue: 'pending'
        },
        docTwoStatus: {
            type: DataTypes.ENUM,
            values: ['verified', 'rejected', 'pending'],
            defaultValue: 'pending'
        },
        docThreeStatus: {
            type: DataTypes.ENUM,
            values: ['verified', 'rejected', 'pending'],
            defaultValue: 'pending'
        },
        docFourStatus: {
            type: DataTypes.ENUM,
            values: ['verified', 'rejected', 'pending'],
            defaultValue: 'pending'
        },
        docFiveStatus: {
            type: DataTypes.ENUM,
            values: ['verified', 'rejected', 'pending'],
            defaultValue: 'pending'
        }
    },
        {
            tableName: "studentDocumentVerification",
            timestamps: true
        });
    StudentDocumentVerification.associate = () => {
       
    }
    return StudentDocumentVerification;
}