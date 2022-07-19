const jwt = require("jsonwebtoken");
const User = require("../modal/userModal");
const { validateEmail, validateUsername } = require("../utils/validations");
const bcrypt = require("bcrypt");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  console.log(token);
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true
  // };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // res.cookie('jwt', token, cookieOptions);

  // // Remove password from output
  // user.password = undefined;
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signup = async (userData, res) => {
  try {
    console.log({ userData });
    const newUser = await User.create({ ...userData });
    createSendToken(newUser, 201, res);
  } catch (error) {
    console.log(error);
  }
};

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

    console.log({ userData });
    signup(userData, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};
