const express = require("express");
const route = express.Router();
const apiController = require("../controller/apiController");
const initApiRoute = (app) => {
  route.get("/getNew", apiController.getNew);
  route.get("/getDetail/:slug", apiController.getDetail);
  return app.use("/api", route);
};
module.exports = { initApiRoute };
