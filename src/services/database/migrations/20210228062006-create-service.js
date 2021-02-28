'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Services', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            type: DataTypes.STRING,
            cost: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('Services');
    }
};
