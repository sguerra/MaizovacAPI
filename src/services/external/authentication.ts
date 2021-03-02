const AuthenticationService = {
    getCurrentUsername() {
        return process.env.DEFAULT_USERNAME;
    }
};

export default AuthenticationService;
