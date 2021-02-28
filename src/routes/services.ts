import { IRoute } from 'express';
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
        const serviceCollection = (await Service.findAll()) as any;

        const responseBody: APICollection = {
            $schema: 'api:collection',
            items: serviceCollection
        };

        res.send(responseBody);
    });

    route.post(async (req, res) => {
        let service = req.body as Service;

        service = await Service.create(service);
        res.status(201).send(service);
    });
};

export const registerDetail = (route: IRoute) => {
    route.get(async (req, res) => {
        const serviceType = req.params['service'];

        const service = await Service.findOne({
            where: {
                type: serviceType
            }
        });

        res.send(service);
    });

    route.patch(async (req, res) => {
        const serviceType = req.params['service'];

        const service = await Service.update(req.body, {
            where: {
                type: serviceType
            }
        });
        res.status(200).send(service);
    });

    route.delete(async (req, res) => {
        const serviceType = req.params['service'];

        await Service.destroy({
            where: {
                type: serviceType
            }
        });

        successMessage.message = 'Service deleted';
        res.status(201).send(successMessage);
    });
};

export const registerAddition = (route: IRoute) => {
    route.post(async (req, res) => {
        const { firstOperand, secondOperand } = req.body;

        const responseBody: APIOperationResult = {
            $schema: 'api:operationResult',
            result: Number(firstOperand) + Number(secondOperand)
        };

        res.status(200).send(responseBody);
    });
};

export const registerSubstraction = (route: IRoute) => {
    route.post(async (req, res) => {
        const { firstOperand, secondOperand } = req.body;

        const responseBody: APIOperationResult = {
            $schema: 'api:operationResult',
            result: Number(firstOperand) - Number(secondOperand)
        };

        res.status(200).send(responseBody);
    });
};

export const registerMultiplication = (route: IRoute) => {
    route.post(async (req, res) => {
        const { firstOperand, secondOperand } = req.body;

        const responseBody: APIOperationResult = {
            $schema: 'api:operationResult',
            result: Number(firstOperand) * Number(secondOperand)
        };

        res.status(200).send(responseBody);
    });
};

export const registerDivision = (route: IRoute) => {
    route.post(async (req, res) => {
        const { firstOperand, secondOperand } = req.body;

        const responseBody: APIOperationResult = {
            $schema: 'api:operationResult',
            result: Number(firstOperand) / Number(secondOperand)
        };

        res.status(200).send(responseBody);
    });
};

export const registerSquareRoot = (route: IRoute) => {
    route.post(async (req, res) => {
        const { operand } = req.body;

        const responseBody: APIOperationResult = {
            $schema: 'api:operationResult',
            result: Math.sqrt(Number(operand))
        };

        res.status(200).send(responseBody);
    });
};

export const registerRandomString = (route: IRoute) => {
    route.post(async (req, res) => {
        const {
            length,
            digits,
            lowerAlphabetic,
            upperAlphabetic,
            unique
        } = req.body;

        const externalServiceURL = `https://www.random.org/strings/?num=1&len=${
            length || 10
        }&digits=${digits ? 'on' : 'off'}&upperalpha=${
            upperAlphabetic ? 'on' : 'off'
        }&loweralpha=${lowerAlphabetic ? 'on' : 'off'}&unique=${
            unique ? 'on' : 'off'
        }&format=plain&rnd=new`;

        console.log('externalServiceURL', externalServiceURL);

        const externalServiceResponse = await axios.get<string>(
            externalServiceURL
        );
        const randomString = externalServiceResponse.data;

        const responseBody: APIOperationResult = {
            $schema: 'api:operationResult',
            result: randomString
        };

        res.status(200).send(responseBody);
    });
};
