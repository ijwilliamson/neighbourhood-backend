const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Postcode = sequelize.define(
    "Postcode",
    {
        pcd: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
        oa21cd: {
            type: DataTypes.STRING,
        },
        ltla22nm: {
            type: DataTypes.STRING,
        },
        utla22nm: {
            type: DataTypes.STRING,
        },
        rgn22nm: {
            type: DataTypes.STRING,
        },
        ctry22nm: {
            type: DataTypes.STRING,
        },
        nat22nm: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

module.exports = Postcode;
