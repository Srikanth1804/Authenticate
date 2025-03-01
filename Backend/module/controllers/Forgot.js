let Authenticate = require("../../model/User.model");
let Jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");
module.exports = async (req, res) => {
  try {
    let { email } = req.body;

    let Finduser = await Authenticate.findOne({ Email: email });

    if (!Finduser) {
      return res.json({
        status: false,
        msg: "Entered email not exists!",
      });
    }

    let id = Finduser.id;

    let Token = await Jwt.sign({ id: Finduser.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    if (!Token) {
      return res.json({
        status: false,
        msg: "Token invalid!",
      });
    }

    let Resetlink = `https://jwt-1804sri.vercel.app/reset-password/${id}/${Token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `Please click the following link to reset your password: ${Resetlink}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        return res.json({
          status: true,
          msg: "Reset password link has been sent to your email",
        });
      }
    });
  } catch (error) {
    res.json({
      status: false,
      msg: "Server error: " + error.message,
    });
  }
};
