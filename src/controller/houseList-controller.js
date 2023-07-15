const { HouseList } = require("../models");
const createError = require("../utils/create-error");

exports.createHouseList = async (req, res, next) => {
  try {
    console.log(req);
    const { name, desc, price, post_code } = req.body;

    const newHouseList = await HouseList.create({
      name,
      desc,
      price,
      post_code,
    });

    res.status(201).json(newHouseList);
  } catch (err) {
    // const error = createError("Cant", 500);
    next(err);
  }
};

exports.getHouseLists = async (req, res, next) => {
  try {
    const houseLists = await HouseList.findAll();

    res.status(200).json({
      payload: houseLists,
      count: houseLists.length,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteHouse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const house = await HouseList.findByPk(id);

    if (!house) {
      throw createError("House not found", 404);
    }

    await house.destroy();

    res.status(200).json({ message: "House deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateHouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, desc, price, post_code } = req.body;
    console.log(req.body);

    const house = await HouseList.findByPk(id);

    if (!house) {
      throw createError("House not found", 404);
    }

    // Update the house data
    house.name = name;
    house.desc = desc;
    house.price = price;
    house.post_code = post_code;

    // Save the updated house
    await house.save();

    res.status(200).json({ message: "House updated successfully" });
  } catch (error) {
    next(error);
  }
};
