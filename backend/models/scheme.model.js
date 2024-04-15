const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const SchemeDetail = sequelize.define("SchemeDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['normal', 'generalDonation'],
            defaultValue: 'normal'
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        classId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        className: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        amount: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        noOfStudent: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        duration: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            tableName: "schemeDetail",
            timestamps: true
        });
    SchemeDetail.associate = () => {

    }
    return SchemeDetail;
}