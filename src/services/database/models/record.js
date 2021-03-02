'use strict';
const { Model, DataTypes } = require('sequelize');
import { User } from './user';
import { Service } from './service';

class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }

    /**
     * Get current user balance and insert a new record with the service cost
     * @param {string} username
     * @param {string} serviceType
     * @param {string} serviceResponse
     */
    static async insert(username, serviceType, serviceResponse) {
        let userBalance;

        const user = await User.findOne({
            where: {
                username: username
            }
        });

        const service = await Service.findOne({
            where: {
                type: serviceType
            }
        });

        const lastRecord = await Record.findAll({
            limit: 1,
            where: {
                userId: user['uuid']
            },
            order: [['date', 'DESC']]
        });

        if (lastRecord.length == 0) {
            userBalance = 0;
        } else {
            userBalance = lastRecord[0]['balance'];
        }

        userBalance += service['cost'];

        await Record.create({
            cost: service['cost'],
            serviceId: service['uuid'],
            userId: user['uuid'],
            balance: userBalance,
            response: serviceResponse,
            date: new Date()
        });
    }

    /**
     * Get current user balance from latest balance update
     * @param {string} username
     */
    static async findCurrentBalance(username) {
        const user = await User.findOne({
            where: {
                username: username
            }
        });

        const record = await Record.findOne({
            where: {
                userId: user['uuid']
            },
            order: [['date', 'DESC']]
        });

        let balance = 0;

        if (record) {
            balance = record['balance'];
        }

        return {
            User: user,
            balance: balance
        };
    }

    /**
     * Get current user records
     * @param {string} username
     */
    static async findCurrentRecords(username) {
        const user = await User.findOne({
            where: {
                username: username
            }
        });

        const currentRecords = await Record.findAll({
            where: {
                userId: user['uuid']
            },
            order: [['date', 'DESC']],
            include: [{ model: User }, { model: Service }]
        });

        return currentRecords;
    }
}

const initRecord = (sequelize) => {
    Record.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            serviceId: {
                type: DataTypes.UUID,
                foreignKey: true
            },
            userId: {
                type: DataTypes.UUID,
                foreignKey: true
            },
            cost: DataTypes.FLOAT,
            balance: DataTypes.FLOAT,
            response: DataTypes.STRING,
            date: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'Record',
            timestamps: true,
            paranoid: true
        }
    );

    Record.belongsTo(User, {
        foreignKey: 'userId'
    });

    Record.belongsTo(Service, {
        foreignKey: 'serviceId'
    });

    return Record;
};

export { Record, initRecord };
