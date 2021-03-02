'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Records', {
            uuid: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            serviceId: {
                type: DataTypes.UUID,
                foreignKey: true
            },
            userId: {
                type: DataTypes.UUID,
                foreignKey: true
            },
            cost: {
                type: DataTypes.FLOAT
            },
            balance: {
                type: DataTypes.FLOAT
            },
            response: {
                type: DataTypes.STRING
            },
            date: {
                type: DataTypes.DATE
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Records');
    }
};
