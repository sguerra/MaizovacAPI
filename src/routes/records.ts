import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APICollection } from '../api/schema/types/collection';
import { Record, User, Service } from '../services/database/models';
import { APISuccess } from '../api/schema/types/success';

const successMessage: APISuccess = {
    $schema: 'api:success',
    message: ''
};

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

export const registerDetail = (route: IRoute) => {
    route.delete(async (req, res) => {
        try {
            const record = req.params['record'];

            await Record.destroy({
                where: {
                    uuid: record
                }
            });

            successMessage.message = 'Record deleted';
            res.status(201).send(successMessage);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
