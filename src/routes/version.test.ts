import app from '../apptest';
import request from 'supertest';
import { APIVersion } from '../api/schema/types/version';
import { APIError } from 'src/api/schema/types/error';

describe('/version', () => {
    test('succesful GET v1', async () => {
        const res = await request(app).get('/v1');
        const apiResponse = JSON.parse(res.text) as APIVersion;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:version');
        expect(apiResponse.version).toBe('v1');
    });
    test('error GET v2', async () => {
        const res = await request(app).get('/v2');
        const apiResponse = JSON.parse(res.text) as APIError;

        expect(res.status).toBe(404);
        expect(apiResponse.$schema).toBe('api:error');
    });
});
