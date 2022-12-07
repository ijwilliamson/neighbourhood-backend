const User = require("../user/userModel");
const { use } = require("./authRoutes");

exports.loginUser = async (request, response) => {
    // note: the only process performed here is the response including
    // token and any logging of the user logged in.

    try {
        if (request.body.authenticated) {
            const user = await User.findOne(
                {
                    where: {
                        user_name:
                            request.body
                                .user_name,
                    },
                },
                {
                    attributes: [
                        "id",
                        "username",
                        "email",
                    ],
                }
            );
            response.status(200).send({
                token: request.token,
                id: user.id,
                user_name: user.user_name,
                email: user.email,
                pcd: user.pcd,
                name: user.name,
                address: user.address,
                region: [
                    {
                        region_id: user.region_id,
                    },
                ],
            });
        } else {
            response.status(401).send({
                status: "Username or password incorrect",
            });
        }

        console.log("logged in");
    } catch (error) {
        console.log(error);
        response
            .status(500)
            .send({ error: error.message });
    }
};
