const express = require("express");
const postCodeController = require("../controller/postCode-controller");

const router = express.Router();

router.get("/postCode", postCodeController.getPostCodes);
router.get("/postCode/:id", postCodeController.getPostCodeStats);

module.exports = router;
