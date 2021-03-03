import express from 'express';
import cors from 'cors';
import osprey from 'osprey';
import jwt from 'express-jwt';
import { join } from 'path';
import bodyParser from 'body-parser';
import * as routes from './routes';
import { APIError } from './api/schema/types/error';
import { DatabaseService, AuthenticationService} from './services';

const app = express();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';
const ramlPath = join(__dirname, 'api/raml/api.raml');
const staticDocsPath = join(__dirname, 'docs');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(staticDocsPath));

const databaseService = DatabaseService.getInstance(DB_CONNECTION_STRING);
databaseService.init();
databaseService.sync();

const jwtCheck = jwt(AuthenticationService.getJWTConfig());

osprey
    .loadFile(ramlPath)
    .then((middleware) => {
        app.use(middleware);

        app.use((err, req, res, next) => {
            const errorMessage: APIError = {
                $schema: 'api:error',
                message: err.message
            };

            res.status(err.statusCode).json(errorMessage);
        });

        app.use(jwtCheck);

        routes.register(app);
    })
    .catch((e) => {
        console.error('Error loading RAML', e);
    });

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
