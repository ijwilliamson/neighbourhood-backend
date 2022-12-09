// Crud operations for user using express and sequelize
const User = require("./userModel");
const Postcode = require("../postcode/postcodeModel");
const Region = require("../region/regionModel");

// create a new user
exports.createUser = async (req, res) => {
    try {
        // check if postcode is valid
        const oa21cd = await isValidPostcode(
            req.body.pcd.toUpperCase()
        );
        // if no
        if (!oa21cd) {
            res.status(400).send(
                "Invalid postcode"
            );
            console.log("invalid postcode");
            return;
        }
        // check if region already exists if not create it, created is a boolean value
        const [region, created] =
            await Region.findOrCreate({
                where: {
                    region_name: oa21cd,
                },
            });
        if (!created) {
            console.log(
                "region returned",
                region.id,
                region.region_name
            );
        } else {
            console.log(
                "created region",
                region.id,
                region.region_name
            );
        }
        const newUser = await User.create(
            {
                user_name: req.body.user_name,
                email: req.body.email,
                password: req.body.password,
                pcd: req.body.pcd.toUpperCase(),
                name: req.body.name,
                address: req.body.address,
                region_id: region.id,
            },
            {
                attributes: [
                    "id",
                    "user_name",
                    "email",
                    "pcd",
                    "name",
                    "address",
                    "region_id",
                ],
            }
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: [
                "id",
                "user_name",
                "email",
                "pcd",
                "name",
                "address",
                "region_id",
            ],
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.readUser = async (req, res) => {
    try {
        const user = await User.findByPk(
            req.params.id,
            {
                attributes: [
                    "id",
                    "user_name",
                    "email",
                    "pcd",
                    "name",
                    "address",
                    "region_id",
                ],
            }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(
            req.params.id,
            {
                attributes: [
                    "id",
                    "user_name",
                    "email",
                    "pcd",
                    "name",
                    "address",
                    "region_id",
                ],
            }
        );
        if (user) {
            await User.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(
            req.params.id
        );
        if (user) {
            await User.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({
                message: "User deleted",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// check if postcode is valid
async function isValidPostcode(pcd) {
    try {
        const postcode = await Postcode.findByPk(
            pcd
        );
        if (!postcode) {
            console.log(
                "not a postcode",
                postcode
            );
            return false;
        } else {
            console.log(
                "postcode found return oa21cd",
                postcode
            );
            return postcode.oa21cd;
        }
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
}
