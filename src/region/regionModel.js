const { DataTypes } = require("sequelize");

const { sequelize } = require("../db/connection");

const Region = sequelize.define("Region", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    region_name: {
        type: DataTypes.STRING,
        require: true,
    },
});

module.exports = Region;
