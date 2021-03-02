import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APISuccess } from '../api/schema/types/success';
import { APICollection } from '../api/schema/types/collection';
import { Record } from '../services/database/models';

const successMessage: APISuccess = {
    $schema: 'api:success',
    message: ''
};

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const Collection = (await Record.findAll()) as any;

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
