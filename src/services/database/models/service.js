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
            type: {
                type: DataTypes.ENUM,
                values: [
                    'addition',
                    'subtraction',
                    'multiplication',
                    'division',
                    'square_root',
                    'random_string'
                ]
            },
            cost: {
                type: DataTypes.DECIMAL(20, 2),
                defaultValue: 0.0
            },
            status: {
                type: DataTypes.ENUM,
                values: ['active', 'beta', 'inactive'],
                defaultValue: 'active'
            }
        },
        {
            sequelize,
            modelName: 'Service',
            timestamps: true,
            paranoid: true
        }
    );
    return Service;
};

export { Service, initService };
