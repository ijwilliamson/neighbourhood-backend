const Region = require("./regionModel");

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
        const region = await Region.findOne({});
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
