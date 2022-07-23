const express = require("express");
const router = express.Router();

const { register, activate, login } = require("../controllers/authController");

router.route("/register").post(register);
router.route("/activate").post(activate);
router.route("/login").post(login);

module.exports = router;
