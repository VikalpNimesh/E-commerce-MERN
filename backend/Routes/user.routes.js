const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../Controllers/users.controllers");

const router = express();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

module.exports = router;
