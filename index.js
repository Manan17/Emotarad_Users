const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
const { user, secondary } = require("./controller");
app.use(express.json());
// Only execute if tables needs to be altered
(async () => {
  await db.sequelize.sync({ alert: true });
})();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/identify", user.identify);

app.post("/enterSecondary", secondary.addSecondaryUsers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
