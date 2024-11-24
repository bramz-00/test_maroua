'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        fullname: 'John Doe',
        lastname: 'Doe',
        email: 'john@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'Jane Smith',
        lastname: 'Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'Alice Johnson',
        lastname: 'Johnson',
        email: 'alice@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
