'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('produtos','categoria', { id: Sequelize.INTEGER });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.addColumn('produtos','categoria', { 
      type: Sequelize.STRING,
      allowNull: false,
     });
     
  }
};
