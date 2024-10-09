const users = require("../config/mongo");
const {ObjectId} = require('mongodb');
const bcrypt = require("bcrypt");

module.exports = {
  whenLogin(req, res) {
    const { name, pass } = req.body;
    const check = validation(name, pass);
    if (check) {
      req.session.adminLoggedIn = true;
      res.status(200).json({ val: true });
    } else {
      res
        .status(400)
        .json({ val: false, err: "The name or password is incorrect" });
    }
  },
  async whenNewUserCreate(req, res) {
    const { email, username, pass, role } = req.body;
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
          role: role,
          password: hashedPass,
          joinDate: date,
        });
        console.log("user added");
        res.status(200).json({ val: true, err: null });
      }
    } catch (err) {
      console.log("User creation error : ", err);
    }
  },
  async whenUserDelete(req, res) {
    const uid = req.params.id;
    const objId = new ObjectId(uid);
    try {
      await users.deleteOne({ _id: objId });
      res.status(200).json({ val: true, err: null });
    } catch (err) {
      res.status(200).json({ val: true, err: "User deletion failed" });
    }
    console.log(new ObjectId(uid));
  },
  async whenUserUpdate(req, res) {
    const uid = req.params.id;
    const { username, role, email } = req.body;
    const objId = new ObjectId(uid);
    try {
      await users.updateOne(
        { _id: objId },
        { $set: { username: username, role: role, email: email } }
      );
      res.status(200).json({ val: true, err: null });
    } catch (err) {
      res.status(200).json({ val: true, err: "User updation failed" });
    }
  },
  async whenDashboardGet(req,res){
    const userData =await users.find().sort({_id:-1}).toArray();
    res.render('dashboard',{isSearch:false,user:userData});
  },
  async whenSearch(req, res){
    const searchKey = req.body.key;
    console.log(searchKey)
    try {
      const searchUser = await users.findOne({username:searchKey});
      if(searchUser){
        const usersInfo = await users.find({username:searchKey}).toArray();
        console.log('user found')
        res.render('dashboard',{isSearch:false,user:usersInfo})
      }else{
        console.log('user not found')
        return res.render('dashboard',{isSearch:true})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

function validation(name, pass) {
  const validName = "admin";
  const validPass = "admin123";
  if (name === validName && pass === validPass) {
    return true;
  }
  return false;
}

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
