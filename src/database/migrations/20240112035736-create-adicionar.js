'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('produtos','categoria', { 
      type: Sequelize.INTEGER,
      after: "preco",
      allowNull: true,
      references:{
        model: 'categorias', key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
     }); 
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('produtos','categoria')
}};
