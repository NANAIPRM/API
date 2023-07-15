const { HouseList, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.getPostCodes = async (req, res, next) => {
  try {
    const postCodes = await HouseList.findAll({
      attributes: ["post_code"],
      group: ["post_code"],
    });
    // console.log(postCodes);

    const count = postCodes.length;

    const formattedPostCodes = postCodes.map((postCode) => ({
      post_code: postCode.post_code,
    }));

    res.status(200).json({
      payload: formattedPostCodes,
      count: count,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostCodeStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const postCodeAverage = await HouseList.findOne({
      where: { post_code: id },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("price")), "averagePrice"],
      ],
    });
    const averagePrice = postCodeAverage.dataValues.averagePrice;

    const postCodeMedian = await HouseList.findAll({
      where: { post_code: id },
      attributes: ["price"],
      order: [["price", "ASC"]],
    });

    let medianPrice = null;

    const medianIndex = Math.floor(postCodeMedian.length / 2);
    if (postCodeMedian.length % 2 === 0) {
      medianPrice =
        (+postCodeMedian[medianIndex - 1].price +
          +postCodeMedian[medianIndex].price) /
        2;
    } else {
      medianPrice = +postCodeMedian[medianIndex].price;
    }

    res.status(200).json({
      payload: {
        average: averagePrice,
        median: String(medianPrice),
      },
    });
  } catch (err) {
    next(err);
  }
};
