'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Services', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            type: {
                type: DataTypes.ENUM,
                values: [
                    'addition',
                    'substraction',
                    'multiplication',
                    'division',
                    'square_root',
                    'random_string'
                ]
            },
            cost: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0
            },
            status: {
                type: DataTypes.ENUM,
                values: ['active', 'beta', 'inactive'],
                defaultValue: 'active'
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                type: DataTypes.DATE
            }
        });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('Services');
    }
};
