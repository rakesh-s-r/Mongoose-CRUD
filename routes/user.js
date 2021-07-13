const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

router.get("/get", (req, res) => {
  User.find({}, (e, data) => {
    if (e) res.status(500).send(e);
    res.send(data);
  });
});

router.get("/get/:id", (req, res) => {
  const { id } = req.params;
  User.findById({ _id: id }, (e, data) => {
    if (e) res.status(500).send(e);
    res.send(data);
  });
});

router.post("/post", (req, res) => {
  const payload = req.body;
  User.create(payload, (e, data) => {
    if (e) res.status(500).send(e);
    res.send(data);
  });
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  User.findOneAndUpdate({ _id: id }, payload, (e, data) => {
    if (e) res.status(500).send(e);
    res.send(data);
  });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  User.deleteOne({ _id: id }, (e, data) => {
    if (e) res.status(500).send(e);
    res.send(data);
  });
});

module.exports = router;
