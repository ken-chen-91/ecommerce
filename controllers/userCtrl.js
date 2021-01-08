const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body; //解析浏览器发出的 request

      const user = await Users.findOne({ email });
      //判断用户是否已存在
      if (user) {
        return res.status(400).json({ msg: "The email already exists." });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });
      }

      // Password Encryption / 将用户的密码加密, 让 Datebase 无法直接查看用户密码
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      // Then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser.id });
      const refreshtoken = createRefreshToken({ id: newUser.id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ msg: "Please Login or Register" });
      }

      // 验证 Cookie
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "Please Login or Register" });
        }
        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });

      res.json({ rf_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
