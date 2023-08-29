const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please use alphabets and numbers in the password"
    ).isAlphanumeric(),
    check("password", "Password should be six characters and more").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ error: errors.array() });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          error: [
            {
              msg: "User already exists",
            },
          ],
        });
      }
      const hashedpassword = await bcrypt.hash(password, 10);
      console.log(hashedpassword);
      const newUser = new User({
        name,
        email,
        password: hashedpassword,
      });
      const savedUser = await newUser.save();

      const token = await jwt.sign(
        {
          id: savedUser._id,
          email: savedUser.email,
        },
        process.env.JWT_SIGN,
        {
          expiresIn: "3d",
        }
      );
      console.log(token);
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
router.post(
  "/signin",
  [check("email", "Please enter a valid email").isEmail()],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: [
            {
              msg: "Invalid Credentials",
            },
          ],
        });
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(400).json({
          error: [
            {
              msg: "Wrong Credentials",
            },
          ],
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SIGN,
        {
          expiresIn: "15d",
        }
      );

      const { password: userPassword, ...others } = user._doc;
      res.status(200).json({
        others,
        token,
      });
    } catch (error) {}
  }
);

module.exports = router;
