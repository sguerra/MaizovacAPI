import { Sequelize, DataTypes, Model, Optional, ModelStatic } from 'sequelize';
import { User } from './models';

export default class DatabaseService {
    private sequelize: Sequelize;
    private static instance: DatabaseService;

    private constructor(connetionString: string) {
        this.sequelize = new Sequelize(connetionString);
    }

    public static getInstance(connetionString: string) {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService(connetionString);
        }

        return DatabaseService.instance;
    }

    init() {
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
                }
            },
            {
                tableName: 'users',
                sequelize: this.sequelize
            }
        );
    }

    async sync() {
        return await this.sequelize.sync();
    }
}
