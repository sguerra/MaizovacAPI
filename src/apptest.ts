import express from 'express';
import cors from 'cors';
import { join } from 'path';
import bodyParser from 'body-parser';
import * as routes from './routes';
import { APIError } from './api/schema/types/error';

const app = express();
const staticDocsPath = join(__dirname, 'docs');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(staticDocsPath));

routes.register(app);

app.use((err, req, res, next) => {
    const errorMessage: APIError = {
        $schema: 'api:error',
        message: `${err.name} : ${err.message}`
    };

    res.status(err.statusCode || err.status || 500).json(errorMessage);
});

export default app;
