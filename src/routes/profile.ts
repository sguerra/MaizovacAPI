import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APIBalance } from '../api/schema/types/balance';
import { APICollection } from '../api/schema/types/collection';
import { AuthenticationService } from '../services/external';
import { User, Record } from '../services/database/models';

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            let currentUsername = AuthenticationService.getCurrentUsername();

            const user = (await User.findOne({
                where: {
                    username: currentUsername
                }
            })) as any;

            const record = (await Record.findOne({
                where: {
                    userId: user['uuid']
                },
                order: [['date', 'DESC']]
            })) as any;

            let balance = 0;

            if (record) {
                balance = record['balance'];
            }

            const responseBody: APIBalance = {
                $schema: 'api:balance',
                user: user,
                balance: balance
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};

export const registerRecords = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            let currentUsername = AuthenticationService.getCurrentUsername();

            const user = (await User.findOne({
                where: {
                    username: currentUsername
                }
            })) as any;

            const records = (await Record.findAll({
                where: {
                    userId: user['uuid']
                },
                order: [['date', 'DESC']]
            })) as any;

            const responseBody: APICollection = {
                $schema: 'api:collection',
                items: records
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
