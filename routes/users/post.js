const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const compareStatus = await bcrypt.compare(
          req.body.password,
          user.password
        );
        console.log(compareStatus);
        if (compareStatus) {
          const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: "2h" }
          );
          res.json({
            status: {
              message: "login successfully",
              code: 200,
            },
            data: { token: token, expiresIn: 7200, userId: user._id },
          });
        } else {
          return res.status(401).json({
            status: {
              message: "Auth Failed",
              code: 401,
            },
          });
        }
      } else {
        return res.status(401).json({
          status: {
            message: "User Dont Exist",
            code: 401,
          },
        });
      }
    } catch (e) {
      console.log("error", e);
      res.status(500).json({
        status: {
          error: e,
          message: e.message,
          code: 500,
        },
      });
    }
  },
  signup: async (req, res, next) => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      console.log(hash);
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      const result = await user.save();
      res.json({
        status: {
          message: "user created successfully",
          code: 201,
        },
        data: result,
      });
    } catch (e) {
      console.log("error", e);
      res.status(500).json({
        status: {
          error: e,
          message: e.message,
          code: 500,
        },
      });
    }
  },
};
