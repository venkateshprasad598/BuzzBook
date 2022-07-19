const { validateEmail, validateUsername } = require("../utils/validations");
const User = require("../modal/userModal");
const bcrypt = require("bcrypt");
const { signup } = require("../controllers/authController");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid Email Address" });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "The email address already exists, please try with the other email Id",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);

    const fullUsername = first_name + last_name;
    const uniqueUsername = await validateUsername(fullUsername);

    const userData = {
      first_name,
      last_name,
      username: uniqueUsername,
      email,
      password: cryptedPassword,
      gender,
      bYear,
      bMonth,
      bDay,
    };
    signup(userData);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};
