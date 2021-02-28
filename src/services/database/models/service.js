'use strict';
const { Model, DataTypes } = require('sequelize');

class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

const initService = (sequelize) => {
    Service.init(
        {
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
        },
        {
            sequelize,
            modelName: 'Service',
            timestamps: false
        }
    );
    return Service;
};

export { Service, initService };
