let Authenticate = require("../../model/User.model");

module.exports = (req, res) => {
  Authenticate.find({})
    .then((data) => {
      res.json({
        status: true,
        info: data,
        msg: "Fetching userdata successfully!",
      });
    })
    .catch((e) => {
      res.json({
        status: false,
        msg: "Data fetching Failed!",
      });
    });
};
