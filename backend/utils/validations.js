const User = require("../modal/userModal");
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validateUsername = async (username) => {
  let isUsername = false;
  do {
    const checkUsernameExists = await User.findOne({ username });
    if (checkUsernameExists) {
      username += (+new Date() * Math.random()).toString().substring(0, 3);
      isUsername = true;
    } else {
      isUsername = false;
    }
  } while (isUsername);
  return username;
};

module.exports = { validateEmail, validateUsername };
