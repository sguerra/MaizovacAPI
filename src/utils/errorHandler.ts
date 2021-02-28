import { Response } from 'express';
import { APIError } from '../api/schema/types/error';

const errorHandler = (err: Error, res: Response, errorStatus: number = 500) => {
    const error: APIError = {
        $schema: 'api:error',
        message: err.message
    };

    res.status(errorStatus).json(error);
};

export default errorHandler;
