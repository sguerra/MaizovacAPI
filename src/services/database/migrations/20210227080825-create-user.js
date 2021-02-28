'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Users', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: 'user'
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'trial'
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};
