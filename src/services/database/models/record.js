'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
import { User } from './user';
import { Service } from './service';

const DEFAULT_BALANCE = 10;

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
            userBalance = DEFAULT_BALANCE;
        } else {
            userBalance = lastRecord[0]['balance'];
        }

        userBalance -= service['cost'];

        if (userBalance < 0)
            throw new Error('Balance is not enough to perform operation');

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
     * Get collection of user balances
     */
    static async findBalances() {
        const userBalanceCollection = await Record.findAll({
            attributes: [
                'User.uuid',
                [
                    Sequelize.fn(
                        'COALESCE',
                        Sequelize.fn('SUM', Sequelize.col('cost')),
                        0
                    ),
                    'balance'
                ]
            ],
            include: {
                model: User,
                right: true
            },
            group: ['User.uuid']
        });

        return userBalanceCollection;
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

        let balance = DEFAULT_BALANCE;

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
            cost: DataTypes.DECIMAL(20, 2),
            balance: DataTypes.DECIMAL(20, 2),
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
