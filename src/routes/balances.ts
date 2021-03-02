import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APICollection } from '../api/schema/types/collection';
import { User, Record } from '../services/database/models';
import { Sequelize } from 'sequelize';

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const recordsCollection = (await Record.findAll({
                attributes: [
                    'userId',
                    [Sequelize.fn('SUM', Sequelize.col('cost')), 'balance']
                ],
                include: User,
                group: ['Record.userId', 'User.uuid']
            })) as any;

            const responseBody: APICollection = {
                $schema: 'api:collection',
                items: recordsCollection
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
