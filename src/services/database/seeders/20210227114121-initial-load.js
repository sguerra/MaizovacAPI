'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                uuid: '715c8d19-6861-43f0-a26c-4ff19b3a805c',
                username: process.env.DEFAULT_USERNAME,
                role: 'admin',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);

        await queryInterface.bulkInsert('Services', [
            {
                uuid: '1cfe5407-77d3-4a91-ab0e-b65335eaa8c9',
                type: 'addition',
                cost: 0.15,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                uuid: 'b8fdd6f8-3474-4d6b-9eca-4ca69d01ad75',
                type: 'substraction',
                cost: 0.15,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                uuid: 'ae364430-665b-45fc-aec7-5860cc0a6258',
                type: 'multiplication',
                cost: 0.25,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                uuid: '9cede416-4d5f-402b-a721-931d2bdb88a7',
                type: 'division',
                cost: 0.25,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                uuid: '366f4075-9669-4459-b946-8737828b868b',
                type: 'square_root',
                cost: 0.25,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                uuid: '2c299e06-4547-4525-b1a3-be3c1d9e686a',
                type: 'random_string',
                cost: 0.35,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
        await queryInterface.bulkDelete('Services', null, {});
        await queryInterface.bulkDelete('Records', null, {});
    }
};
