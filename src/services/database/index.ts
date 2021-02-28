import { Sequelize, DataTypes, Model, Optional, ModelStatic } from 'sequelize';
import { initUser } from './models';

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
        initUser(this.sequelize);
    }

    async sync() {
        return await this.sequelize.sync();
    }
}
