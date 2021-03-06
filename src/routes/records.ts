import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APICollection } from '../api/schema/types/collection';
import { Record, User, Service } from '../services/database/models';

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const Collection = (await Record.findAll({
                order: [['date', 'DESC']],
                include: [{ model: User }, { model: Service }]
            })) as any;

            const responseBody: APICollection = {
                $schema: 'api:collection',
                items: Collection
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
