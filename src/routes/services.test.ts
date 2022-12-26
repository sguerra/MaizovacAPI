import app from '../apptest';
import request from 'supertest';
import { APIService } from '../api/schema/types/service';
import { APICollection } from '../api/schema/types/collection';
import mockServices from '../mocks/services.json';

jest.mock('../services/database/models/service', () => {
    return {
        Service: {
            findAll() {
                return Promise.resolve(mockServices);
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
