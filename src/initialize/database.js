const generateMockData = require("../mock/mockdata");
const { sequelize } = require("../models/");

const start = async () => {
  try {
    await sequelize.sync();
    console.log("Sequelize sync completed.");

    await generateMockData();
    console.log("Mock data generation completed.");
  } catch (err) {
    console.error("Error:", err);
  }
};

start();
