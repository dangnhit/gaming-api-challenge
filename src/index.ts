import 'dotenv/config';
import './utils/response';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import routes from './routes';
import { connectDataSource } from 'orm/connection';
import { errorHandler } from 'middleware';

export const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);
app.use(errorHandler);

const port = process.env.PORT || 5000;

(async () => {
  await connectDataSource();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
