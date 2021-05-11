import 'dotenv/config';
import express from 'express';

import './db';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => {
  console.info('Server started at port 3000 🚀');
});
