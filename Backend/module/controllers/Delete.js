let Authenticate = require("../../model/User.model");

module.exports = (req, res) => {
  let { id } = req.params;

  Authenticate.findByIdAndDelete(id)
    .then(() => {
      res.json({
        status: true,
        msg: "User deleted!",
      });
    })
    .catch((e) => {
      res.json({
        status: false,
        msg: "User not deleted!",
      });
    });
};
