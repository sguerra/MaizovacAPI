'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                uuid: '715c8d19-6861-43f0-a26c-4ff19b3a805c',
                username: 'root@example.com',
                role: 'admin',
                status: 'active',
                isDeleted: false
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
