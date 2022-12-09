const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const School = sequelize.define(
    "School",
    {
        Name: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
        Type: {
            type: DataTypes.STRING,
        },
        Phase: {
            type: DataTypes.STRING,
        },
        Street: {
            type: DataTypes.STRING,
        },
        Locality: {
            type: DataTypes.STRING,
        },
        Address3: {
            type: DataTypes.STRING,
        },
        Town: {
            type: DataTypes.STRING,
        },
        County: {
            type: DataTypes.STRING,
        },
        Website: {
            type: DataTypes.STRING,
        },
        Telephone: {
            type: DataTypes.STRING,
        },
    },
    { timestamps: false }
);

module.exports = School;
