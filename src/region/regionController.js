const { sequelize } = require("../db/connection");
const Region = require("./regionModel");
const Postcode = require("../postcode/postcodeModel");

exports.getRegionById = async (req, res) => {
    console.log(req);
    try {
        const region = await Region.findByPk(
            req.params.id,
            { attributes: ["id", "region_name"] }
        );

        const postcodesSql = `SELECT Postcodes.pcd, Regions.id, Regions.region_name FROM Regions
                    INNER JOIN Postcodes On Regions.region_name = Postcodes.oa21cd
                    WHERE id = ${req.params.id};`;
        const postcodeResults =
            await sequelize.query(postcodesSql);
        const newPostcodeResultsArray =
            postcodeResults[0];
        const arrayPc = [];
        for (const pc of newPostcodeResultsArray) {
            arrayPc.push({
                pcd: pc.pcd,
            });
        }
        const postcodeResponse = {
            id: req.params.id,
            region_name:
                newPostcodeResultsArray[0]
                    .region_name,
            postcodes: arrayPc,
        };
        if (region) {
            res.status(200).json(
                postcodeResponse
            );
        } else {
            res.status(404).send(
                "Region not found"
            );
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getRegionByPcd = async (req, res) => {
    try {
        if (!req.params.pcd) {
            res.status(400).send(
                "Postcode not supplied"
            );
            return;
        }
        const postcode = await Postcode.findOne({
            where: { pcd: req.params.pcd },
        });
        if (!postcode) {
            res.status(404).send(
                "Postcode not found"
            );
            return;
        }
        const region = await Region.findOne({
            where: {
                region_name: postcode.oa21cd,
            },
        });
        if (region) {
            res.status(200).json(region);
        } else {
            res.status(404).send(
                "Region not found"
            );
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
