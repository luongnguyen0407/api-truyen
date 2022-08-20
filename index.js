const express = require("express");
const initRoute = require("./routes/apiMain");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));
app.use(cors());

initRoute.initApiRoute(app);

app.listen(5000, () => {
  console.log("ok");
});
