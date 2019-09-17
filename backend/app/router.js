const router_users = require("./res1/routes");

const routers = function(app) {
  app.use("/api/res1", router_users);
};

module.exports = routers;
