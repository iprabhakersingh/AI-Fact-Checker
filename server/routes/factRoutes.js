const express = require("express");

const upload = require("../middlewares/uploadMiddleware");

const {factCheck} = require("../controllers/factCheckController");

const router = express.Router();

router.post("/verify",upload.single("pdf"),factCheck);

module.exports = router;