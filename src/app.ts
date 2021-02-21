import express from 'express';
import * as routes from './routes';
const app = express();

const PORT = process.env.PORT || 3000;

routes.register(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
