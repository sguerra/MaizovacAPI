import app from '../apptest';
import request from 'supertest';
import { APICollection } from '../api/schema/types/collection';
import { APIOperationResult } from '../api/schema/types/operationResult';
import mockServices from '../mocks/services.json';

const CURRENT_USERNAME = 'root@example.com';
const RANDOM_STRING = 'k2rVC';

jest.mock('../services', () => {
    return {
        AuthenticationService: {
            getCurrentUsername() {
                return CURRENT_USERNAME;
            }
        }
    };
});

jest.mock('../services/database/models', () => {
    return {
        Service: {
            async findAll() {
                return mockServices;
            }
        },
        Record: {
            insert: jest.fn()
        }
    };
});

jest.mock('../services/external', () => {
    return {
        RandomService: {
            randomString() {
                return RANDOM_STRING;
            }
        }
    };
});

describe('/services', () => {
    test('getting existing services /services', async () => {
        const res = await request(app).get('/v1/services');
        const apiResponse = JSON.parse(res.text) as APICollection;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:collection');
        expect(apiResponse.items).toHaveLength(6);
        expect(apiResponse.items[0]).toHaveProperty('type');
        expect(apiResponse.items[0]).toHaveProperty('cost');
    });
});

describe('/services/{service}/calculate', () => {
    test('/calculate addition: 2 + 4', async () => {
        const res = await request(app)
            .post('/v1/services/addition/calculate')
            .send({
                parameters: {
                    firstOperand: 2,
                    secondOperand: 4,
                    type: 'addition'
                }
            });
        const apiResponse = JSON.parse(res.text) as APIOperationResult;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:operationResult');
        expect(apiResponse.result).toBe(6);
    });
    test('/calculate subtraction: 4 - 2', async () => {
        const res = await request(app)
            .post('/v1/services/subtraction/calculate')
            .send({
                parameters: {
                    firstOperand: 4,
                    secondOperand: 2,
                    type: 'subtraction'
                }
            });
        const apiResponse = JSON.parse(res.text) as APIOperationResult;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:operationResult');
        expect(apiResponse.result).toBe(2);
    });
    test('/calculate multiplication: 4 * 2', async () => {
        const res = await request(app)
            .post('/v1/services/multiplication/calculate')
            .send({
                parameters: {
                    firstOperand: 4,
                    secondOperand: 2,
                    type: 'multiplication'
                }
            });
        const apiResponse = JSON.parse(res.text) as APIOperationResult;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:operationResult');
        expect(apiResponse.result).toBe(8);
    });
    test('/calculate division: 4 * 2', async () => {
        const res = await request(app)
            .post('/v1/services/division/calculate')
            .send({
                parameters: {
                    firstOperand: 4,
                    secondOperand: 2,
                    type: 'division'
                }
            });
        const apiResponse = JSON.parse(res.text) as APIOperationResult;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:operationResult');
        expect(apiResponse.result).toBe(2);
    });
    test('/calculate random string: length 5 with digits, A-z, unique', async () => {
        const res = await request(app)
            .post('/v1/services/random_string/calculate')
            .send({
                parameters: {
                    length: 5,
                    digits: true,
                    lowerAlphabetic: true,
                    upperAlphabetic: true,
                    unique: true
                }
            });
        const apiResponse = JSON.parse(res.text) as APIOperationResult;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:operationResult');
        expect(apiResponse.result).toHaveLength(5);
        expect(apiResponse.result).toBe(RANDOM_STRING);
    });
});
