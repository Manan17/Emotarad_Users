const {
  models: { SecondayId, User },
} = require("../models/index");

module.exports = {
  addSecondaryUsers: async (req, res) => {
    if (req.body.email && req.body.phoneNumber && req.body.primaryEmail) {
      const { email, phoneNumber, primaryEmail } = req.body;
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        user = await User.create({
          email,
          phoneNumber,
          linkPrecendence: "secondary",
          linkedIn: 78,
        });
      }
      const primaryUser = await User.findOne({
        where: { email: primaryEmail },
      });

      await SecondayId.create({
        secondaryID: user.id,
        userId: primaryUser.id,
      });
      res.status(200).json({ message: "Secondary User attached", status: 200 });
    } else {
      res.status(400).json({ message: "Enter proper details", status: 400 });
    }
  },
};
