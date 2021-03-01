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
            status: {
                type: DataTypes.STRING,
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
