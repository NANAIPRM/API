const { faker } = require("@faker-js/faker");

const { HouseList } = require("../models");

const generateMockData = async () => {
  try {
    // สร้างรายการ HouseList จำนวนเท่าที่คุณต้องการ
    const totalItems = 10; // จำนวนรายการที่ต้องการสร้าง
    const houseLists = [];

    for (let i = 0; i < totalItems; i++) {
      const house = {
        name: faker.address.city(),
        desc: faker.lorem.sentence(),
        price: faker.random.number({
          min: 100000,
          max: 10000000,
          precision: 2,
        }),
        postCode: faker.address.zipCode(),
      };
      houseLists.push(house);
    }

    // สร้างข้อมูลในฐานข้อมูลโดยใช้ Sequelize
    await HouseList.bulkCreate(houseLists);

    console.log("Mock data has been generated successfully.");
  } catch (err) {
    console.error("Failed to generate mock data:", err);
  }
};

module.exports = generateMockData;
