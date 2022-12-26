import app from '../apptest';
import request from 'supertest';
import mockRecords from '../mocks/records.json';
import { APICollection } from '../api/schema/types/collection';

jest.mock('../services/database/models', () => {
    return {
        Record: {
            async findAll() {
                return mockRecords;
            }
        }
    };
});

describe('/records', () => {
    test('getting current user /records', async () => {
        const res = await request(app).get('/v1/records');
        const apiResponse = JSON.parse(res.text) as APICollection;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:collection');
        expect(apiResponse.items.length).toBeGreaterThan(0);
        expect(apiResponse.items[0]).toHaveProperty('uuid');
        expect(apiResponse.items[0]).toHaveProperty('serviceId');
        expect(apiResponse.items[0]).toHaveProperty('userId');
        expect(apiResponse.items[0]).toHaveProperty('cost');
        expect(apiResponse.items[0]).toHaveProperty('response');
    });
});
