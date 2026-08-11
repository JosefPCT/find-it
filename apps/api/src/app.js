import express from 'express';

import apiRouter from './api/v1/routes.js';

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use("/", apiRouter);


export { app }

