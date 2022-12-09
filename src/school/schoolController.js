const { sequelize } = require("../db/connection");
const School = require("./schoolModel");

exports.readSchools = async (req, res) => {
    try {
        if (!req.params.regionId) {
            res.status(500).json({
                message: "No region provided",
            });
            return;
        }

        const sql = `SELECT Schools.* FROM Regions
                    INNER JOIN Postcodes On Regions.region_name = Postcodes.oa21cd
                    INNER JOIN Schools On Postcodes.pcd = Schools.Postcode
                    WHERE id = ${req.params.regionId};`;

        const results = await sequelize.query(
            sql
        );

        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.readSchool = async (req, res) => {
    try {
        if (!req.params.name) {
            res.status(500).json({
                message: "No school provided",
            });
            return;
        }
        req.params.name =
            req.params.name.replaceAll("+", " ");
        const school = await School.findOne({
            where: {
                Name: req.params.name,
            },
        });

        if (!school) {
            res.status(500).json({
                message: "School not found",
            });
            return;
        }

        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
