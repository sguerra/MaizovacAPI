import app from '../apptest';
import request from 'supertest';
import mockProfile from '../mocks/profile_balance.json';
import { APIBalance } from '../api/schema/types/balance';

const CURRENT_USERNAME = 'root@example.com';

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
        Record: {
            async findCurrentBalance() {
                return mockProfile;
            }
        }
    };
});

describe('/profile', () => {
    test('getting current user /profile', async () => {
        const res = await request(app).get('/v1/profile');
        const apiResponse = JSON.parse(res.text) as APIBalance;

        expect(res.status).toBe(200);
        expect(apiResponse.$schema).toBe('api:balance');
        expect(apiResponse.User.username).toBe(CURRENT_USERNAME);
        expect(apiResponse.balance).not.toBeNaN();
    });
});
