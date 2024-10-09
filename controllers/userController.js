const users = require("../config/mongo");
const bcrypt = require("bcrypt");

module.exports = {
  async whenRegister(req, res) {
    const { username, email, pass } = req.body;
    try {
      const existingUsername = await users.findOne({ username });
      const existingEmail = await users.findOne({ email });
      const hashedPass = await bcrypt.hash(pass, 10);
      if (existingUsername) {
        res
          .status(400)
          .json({ val: false, err: "The username already existing" });
      } else if (existingEmail) {
        res.status(400).json({ val: false, err: "The email already existing" });
      } else {
        const date = getCurrentDate();
        await users.insertOne({
          username: username,
          email: email,
          role: "user",
          password: hashedPass,
          joinDate: date,
        });
        console.log("user added");
        req.session.loggedIn = true;
        const userArray = await users.find({ username: username }).toArray();
        req.session.currentUser = username;
        res.status(200).json({ val: true, err: null });
      }
    } catch (err) {
      console.log("User creation error : ", err);
    }
  },
  async whenLogin(req, res) {
    const { email, pass } = req.body;
    try {
      const user = await users.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ val: false, err: "Please enter a valid email address" });
      }
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (!isPasswordValid) {
        return res
          .status(404)
          .json({ val: false, err: "The password is incorrect" });
      }
      req.session.loggedIn = true;
      req.session.currentUser = user.username;
      res.status(200).json({ val: true, err: null });
    } catch (err) {
      console.log(err);
    }
  },
  async whenHomeGet(req, res) {
    const currentUsername = req.session.currentUser;
    res.set("Cache-Control", "no-store");
    try {
      const userData = await users
        .find({ username: currentUsername })
        .toArray();
      if (userData.length > 0) {
        return res.render("home", { user: userData[0] });
      } else {
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
          }
        });
        return res.redirect("/");
      }
    } catch (err) {
      console.log(err);
    }
  },
  whenLogout(req, res) {
    req.session.destroy((err) => {
      if (err) return res.redirect("/home");
      res.json({ val: true });
    });
  },
};

function getCurrentDate() {
  let date = new Date();
  let year = date.getFullYear();
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = monthNames[date.getMonth()];
  let day = date.getDate();
  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let fullTime =
    month + " " + day + "," + year + " / " + hours + ":" + minutes + " " + ampm;
  return fullTime;
}
