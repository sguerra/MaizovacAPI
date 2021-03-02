'use strict';
const { Model, DataTypes } = require('sequelize');

class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

const initUser = (sequelize) => {
    User.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            role: {
                type: DataTypes.ENUM,
                values: ['user', 'admin'],
                defaultValue: 'user'
            },
            status: {
                type: DataTypes.ENUM,
                values: ['trial', 'active', 'inactive'],
                defaultValue: 'trial'
            },
            deletedAt: {
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: true,
            paranoid: true
        }
    );
};

export { User, initUser };
