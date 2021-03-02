import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APISuccess } from '../api/schema/types/success';
import { APICollection, APIService } from '../api/schema/types/collection';
import { APIOperationResult } from '../api/schema/types/operationResult';
import { Service, Record } from '../services/database/models';
import { OperationService } from '../services/internal';
import { AuthenticationService, RandomService } from '../services/external';

const successMessage: APISuccess = {
    $schema: 'api:success',
    message: ''
};

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const serviceCollection = (await Service.findAll()) as any;

            const responseBody: APICollection = {
                $schema: 'api:collection',
                items: serviceCollection
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });

    route.post(async (req, res) => {
        try {
            let service = req.body as Service;

            service = await Service.create(service);
            res.status(201).send(service);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};

export const registerDetail = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const serviceType = req.params['service'];

            const service = await Service.findOne({
                where: {
                    type: serviceType
                }
            });

            res.send(service);
        } catch (err) {
            errorHandler(err, res);
        }
    });

    route.patch(async (req, res) => {
        try {
            const serviceType = req.params['service'];

            const service = await Service.update(req.body, {
                where: {
                    type: serviceType
                }
            });
            res.status(200).send(service);
        } catch (err) {
            errorHandler(err, res);
        }
    });

    route.delete(async (req, res) => {
        try {
            const serviceType = req.params['service'];

            await Service.destroy({
                where: {
                    type: serviceType
                }
            });

            successMessage.message = 'Service deleted';
            res.status(201).send(successMessage);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};

export const registerOperation = (route: IRoute) => {
    route.post(async (req, res) => {
        try {
            let serviceResult;
            let currentUsername = AuthenticationService.getCurrentUsername();
            const serviceType = req.params['service'];
            const parameters = req.body['parameters'];

            if (!currentUsername) {
                throw new Error('The current user is not signed in');
            }

            switch (serviceType) {
                case 'addition':
                    serviceResult = OperationService.addition(parameters);
                    break;
                case 'substraction':
                    serviceResult = OperationService.substraction(parameters);
                    break;
                case 'multiplication':
                    serviceResult = OperationService.multiplication(parameters);
                    break;
                case 'division':
                    serviceResult = OperationService.division(parameters);
                    break;
                case 'square_root':
                    serviceResult = OperationService.squareRoot(parameters);
                    break;
                case 'random_string':
                    serviceResult = await RandomService.randomString(
                        parameters
                    );
                    break;
                default:
                    throw new Error(
                        `Service type '${serviceType}' is not allowed`
                    );
            }

            await Record.insert(
                currentUsername,
                serviceType,
                serviceResult.toString()
            );

            const responseBody: APIOperationResult = {
                $schema: 'api:operationResult',
                result: serviceResult
            };

            res.status(200).send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
