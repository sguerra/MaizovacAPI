import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APICollection } from '../api/schema/types/collection';
import { AuthenticationService } from '../services/external';
import { User, Record } from '../services/database/models';

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            let currentUsername = AuthenticationService.getCurrentUsername();

            const currentBalance = await Record.findCurrentBalance(
                currentUsername
            );

            const responseBody = {
                $schema: 'api:balance',
                User: currentBalance['User'],
                balance: currentBalance['balance']
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

            const currentRecords = await Record.findCurrentRecords(
                currentUsername
            );

            const responseBody = {
                $schema: 'api:collection',
                items: currentRecords
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
