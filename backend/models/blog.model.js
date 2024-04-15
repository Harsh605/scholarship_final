const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("Blog", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            tableName: "blogs",
            timestamps: true
        });
    Blog.associate = (models) => {

    }
    return Blog;
}