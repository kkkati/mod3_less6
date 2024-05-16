const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generate } = require("../helpers/generateToken");

//register
async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login: login, password: passwordHash });
  console.log(passwordHash, login);

  return user;
}

//login

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });
  return { token, user };
}

function getUsers() {
  return User.find();
}

module.exports = {
  login,
  register,
  getUsers,
};
