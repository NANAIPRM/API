const express = require("express");
const houseListController = require("../controller/houseList-controller");

const router = express.Router();

router.post("/home", houseListController.createHouseList);
router.get("/home", houseListController.getHouseLists);
router.delete("/home/:id", houseListController.deleteHouse);
router.patch("/home/:id", houseListController.updateHouse);

module.exports = router;
