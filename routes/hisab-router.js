const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/login-middleware");

const hisabModel = require("../models/hisab-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  try {
    res.send("hisab page");
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/create", isLoggedIn, (req, res) => {
  try {
    res.render("hisab");
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/create", isLoggedIn, async (req, res) => {
  try {
    let {
      title,
      description,
      encrypted,
      shareable,
      passcode,
      editPermissions,
    } = req.body;

    encrypted = encrypted === "on" ? true : false;
    shareable = shareable === "on" ? true : false;
    editPermissions = editPermissions === "on" ? true : false;

    let hisab = await hisabModel.create({
      title: title,
      description: description,
      user: req.user.id,
      encrypted: encrypted,
      shareable: shareable,
      passcode: passcode,
      editPermissions: editPermissions,
    });

    let user = await userModel.findOne({ email: req.user.email });
    user.hisab.push(hisab._id);
    await user.save();

    res.redirect("/profile");
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/view/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let hisab = await hisabModel.findOne({ _id });
    if (hisab.encrypted) {
      req.session.hisabSessionCreated = "hisab session for passcode";
      let wrong = req.flash("wrong");
      res.render("passcode", { hisab, wrong });
    } else {
      res.render("viewHisab", { hisab });
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/view/passcode/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let hisab = await hisabModel.findOne({ _id });
    let passcode = req.body.passcode;
    if (hisab.passcode.toString() === passcode.toString()) {
      res.render("viewHisab", { hisab });
    } else {
      req.flash("wrong", "Please! Enter right passcode.");
      res.redirect(`/hisab/view/${_id}`);
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/view/delete/:id", isLoggedIn, async (req, res) => {
  let _id = req.params.id;
  let hisab = await hisabModel.findOne({ _id });

  if (hisab.user._id.toString() === req.user.id) {
    res.send("delete ka access hai");
  } else {
    res.send("delete ka access nhi hai");
  }
});

router.get("/view/edit/:id", isLoggedIn, async (req, res) => {
  let _id = req.params.id;
  let hisab = await hisabModel.findOne({ _id });

  if (hisab.user._id.toString() === req.user.id) {
    res.send("edit ka access hai");
  } else {
    res.send("edit ka access nhi hai");
  }
});

module.exports = router;
