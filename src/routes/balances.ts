import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APICollection } from '../api/schema/types/collection';
import { Record } from '../services/database/models';

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const userBalanceCollection = (await Record.findBalances()) as any;

            const responseBody: APICollection = {
                $schema: 'api:collection',
                items: userBalanceCollection
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
