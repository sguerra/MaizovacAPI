import jwks from 'jwks-rsa';

const AuthenticationService = {
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

    getCurrentUsername() {
        return process.env.DEFAULT_USERNAME;
    }
};

export default AuthenticationService;
