import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APISuccess } from '../api/schema/types/success';
import { APICollection } from '../api/schema/types/collection';
import { APIOperationResult } from '../api/schema/types/operationResult';
import { Service } from '../services/database/models';
import axios from 'axios';

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

export const registerAddition = (route: IRoute) => {
    route.post(async (req, res) => {
        try {
            const { firstOperand, secondOperand } = req.body.parameters;

            const responseBody: APIOperationResult = {
                $schema: 'api:operationResult',
                result: Number(firstOperand) + Number(secondOperand)
            };

            res.status(200).send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};

export const registerSubstraction = (route: IRoute) => {
    route.post(async (req, res) => {
        try {
            const { firstOperand, secondOperand } = req.body.parameters;

            const responseBody: APIOperationResult = {
                $schema: 'api:operationResult',
                result: Number(firstOperand) - Number(secondOperand)
            };

            res.status(200).send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};

export const registerMultiplication = (route: IRoute) => {
    route.post(async (req, res) => {
        try {
            const { firstOperand, secondOperand } = req.body.parameters;

            const responseBody: APIOperationResult = {
                $schema: 'api:operationResult',
                result: Number(firstOperand) * Number(secondOperand)
            };

            res.status(200).send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};

export const registerDivision = (route: IRoute) => {
    route.post(async (req, res) => {
        try {
            const { firstOperand, secondOperand } = req.body.parameters;

            if (Number(secondOperand) === 0) {
                throw new Error('Division by zero is not allowed');
            }

            const responseBody: APIOperationResult = {
                $schema: 'api:operationResult',
                result: Number(firstOperand) / Number(secondOperand)
            };

            res.json(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};

export const registerSquareRoot = (route: IRoute) => {
    route.post(async (req, res) => {
        try {
            const { operand } = req.body.parameters;

            if (operand === undefined) {
                throw new Error(
                    'Square root operation is missing required property: /parameters/operand'
                );
            }
            if (operand < 0) {
                throw new Error(
                    'Square root operation property /parameters/operand cannot be a negative number'
                );
            }

            const responseBody: APIOperationResult = {
                $schema: 'api:operationResult',
                result: Math.sqrt(Number(operand))
            };

            res.status(200).send(responseBody);
        } catch (err) {
            errorHandler(err, res, 400);
        }
    });
};

export const registerRandomString = (route: IRoute) => {
    route.post(async (req, res) => {
        try {
            const {
                length,
                digits,
                lowerAlphabetic,
                upperAlphabetic,
                unique
            } = req.body.parameters;

            const externalServiceURL = `https://www.random.org/strings/?num=1&len=${
                length || 10
            }&digits=${digits ? 'on' : 'off'}&upperalpha=${
                upperAlphabetic ? 'on' : 'off'
            }&loweralpha=${lowerAlphabetic ? 'on' : 'off'}&unique=${
                unique ? 'on' : 'off'
            }&format=plain&rnd=new`;

            const externalServiceResponse = await axios.get<string>(
                externalServiceURL
            );
            const randomString = externalServiceResponse.data.replace('\n', '');

            const responseBody: APIOperationResult = {
                $schema: 'api:operationResult',
                result: randomString
            };

            res.status(200).send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
