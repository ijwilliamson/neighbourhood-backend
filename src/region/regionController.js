const Region = require("./regionModel");
const Postcode = require("../postcode/postcodeModel");

exports.getRegionById = async (req, res) => {
    console.log(req);
    try {
        const region = await Region.findByPk(
            req.params.id,
            { attributes: ["id", "region_name"] }
        );
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
