const {
  models: { User, SecondayId },
} = require("../models/index");

module.exports = {
  identify: async (req, res) => {
    if (req.body.email && req.body.phoneNumber) {
      const { email, phoneNumber } = req.body;
      const user = await User.findOne({ where: { email: email } });
      // If user found, return the user
      if (user) {
        const ids = await SecondayId.findAll({
          where: { userId: user.id },
          attributes: ["secondaryID"],
        });
        res.status(200).json({
          message: "Got the user!",
          status: 200,
          user,
          secondaryIds: ids,
        });
      }
      // Else create one with primary as the linkPrecendence
      else {
        await User.create({
          email,
          phoneNumber,
          linkPrecendence: "primary",
          linkedIn: 78,
        });

        res.status(200).json({ message: "Successfully Created!", status: 200 });
      }
    } else {
      res.status(400).json({ message: "Send proper data!", status: 400 });
    }
  },
};
