const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const ClassDocumentDetail = sequelize.define("ClassDocumentDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        documents: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        },
    },
        {
            tableName: "classDocument",
            timestamps: true
        });
    ClassDocumentDetail.associate = () => {

    }
    return ClassDocumentDetail;
}