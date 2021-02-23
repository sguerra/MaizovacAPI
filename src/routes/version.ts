import { IRoute } from 'express';
import { APIVersion } from '../api/schema/types/version';
import { APIError } from '../api/schema/types/error';

export const register = (route: IRoute) => {
    route.get((req, res) => {
        const version = req.params['version'];

        const responseBody: APIVersion = {
            $schema: 'api:version',
            version: 'v1'
        };

        if (version === responseBody.version) {
            res.send(responseBody);
        } else {
            const errorResponse: APIError = {
                $schema: 'api:error',
                message: `Version "${version}" is not supported`
            };

            res.status(404);
            res.send(errorResponse);
        }
    });
};
