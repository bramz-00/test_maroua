'use strict';
const { User, Category } = require('../models'); // Adjust the path as per your project structure

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch users dynamically based on their fullnames or emails
    const users = await User.findAll({
      where: {
        fullname: ['John Doe', 'Jane Smith', 'Alice Johnson'],
      },
      attributes: ['id', 'fullname'],
    });

    // Fetch categories dynamically based on their names
    const categories = await Category.findAll({
      where: {
        name: ['Work', 'Personal', 'Urgent'],
      },
      attributes: ['id', 'name'],
    });

    // Map user and category IDs
    const getUserId = (fullname) => users.find((user) => user.fullname === fullname)?.id;
    const getCategoryId = (name) => categories.find((category) => category.name === name)?.id;

    // Insert todos with dynamically resolved IDs
    await queryInterface.bulkInsert(
      'Todos',
      [
        {
          title: 'Complete project documentation',
          description: 'Write documentation for the new project.',
          priority: 'Low',
          userId: getUserId('John Doe'), // Dynamically resolved user ID
          categoryId: getCategoryId('Work'), // Dynamically resolved category ID
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Buy groceries',
          description: 'Milk, Bread, Eggs, Butter.',
          priority: 'High',
          userId: getUserId('Jane Smith'),
          categoryId: getCategoryId('Personal'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Prepare presentation',
          description: 'Create slides for the upcoming meeting.',
          priority: 'Medium',
          userId: getUserId('Alice Johnson'),
          categoryId: getCategoryId('Work'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  },
};
