import axios from 'axios';
import jwks from 'jwks-rsa';

const AuthenticationService = {
    /**
     * Get JWT configuration
     */
    getJWTConfig() {
        const authenticationURI = `https://${process.env.AUTHORIZATION_DOMAIN}`;

        return {
            secret: jwks.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${authenticationURI}/.well-known/jwks.json`
            }),
            audience: process.env.AUTHORIZATION_AUDIENCE,
            issuer: `${authenticationURI}/`,
            algorithms: ['RS256']
        };
    },

    /**
     * Get current username from authentication token
     * @param {object} req - Request object
     */
    async getCurrentUsername(req) {
        let userRequest = req['user'];

        const aud = userRequest['aud'];
        const userInfoURI = aud[1];

        const authResponse = await axios.get<string>(userInfoURI, {
            headers: {
                Authorization: req['headers']['authorization']
            }
        });

        return authResponse.data['name'];
    }
};

export default AuthenticationService;
