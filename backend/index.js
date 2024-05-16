const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authenticated = require("./middlewares/authenticated");
const { login, register, getUsers } = require("./controllers/User");
const { addRequest, getRequests } = require("./controllers/request");
const mapUser = require("./helpers/mapUser");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

// app.get("/api", (req, res) => {
//   res.json({
//     message: "Hello from backend express.js",
//   });
// });

app.post("/register", async (req, res) => {
  try {
    const user = await register(req.body.login, req.body.password);

    res.send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknow error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknow error" });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.post("/requests", async (req, res) => {
  const newRequest = await addRequest({
    date: req.body.date,
    FIO: req.body.FIO,
    telephone: req.body.telephone,
    descriptions: req.body.descriptions,
  });

  res.send({ data: newRequest });
});

app.use(authenticated);

app.get("/requests", async (req, res) => {
  const requests = await getRequests();
  res.send({ data: requests });
});

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send({ data: users });
});

mongoose
  .connect(
    "mongodb+srv://kati600zx:kati600zx@cluster0.5xk5vn3.mongodb.net/clynic?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green(`Server is starting on port ${PORT}`));
    });
  });
