'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          post_title: 'Medir perfomance de tu PC',
          userId: 21,
          status: true,
          post_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet gravida.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          post_title: 'News one',
          userId: 21,
          status: true,
          post_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          post_title: 'News two',
          userId: 21,
          status: true,
          post_text: 'Lorem ipsum dolor sit amet',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
