import express from 'express';
import osprey from 'osprey';
import { join } from 'path';
import bodyParser from 'body-parser';
import * as routes from './routes';
import { APIError } from './api/schema/types/error';
import { DatabaseService } from './services';

const app = express();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';
const ramlPath = join(__dirname, 'api/raml/api.raml');
const staticDocsPath = join(__dirname, 'docs');

app.use(bodyParser.json());
app.use(express.static(staticDocsPath));

const databaseService = DatabaseService.getInstance(DB_CONNECTION_STRING);
databaseService.init();
databaseService.sync();

osprey
    .loadFile(ramlPath)
    .then((middleware) => {
        app.use(middleware);

        app.use((err, req, res, next) => {
            const errorMessage: APIError = {
                $schema: 'api:error',
                message: err.message
            };

            res.status(err.statusCode).send(errorMessage);
        });

        routes.register(app);
    })
    .catch((e) => {
        console.error('Error loading RAML', e);
    });

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
