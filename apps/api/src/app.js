import express from 'express';
import cors from 'cors'

import apiRouter from './api/v1/routes.js';
import { notFoundErrorHandler } from './middleware/NotFoundHandler.js';
import { globalErrorHandler } from './middleware/GlobalErrorHandler.js';

const app = express();

// CORS configuration
const allowedOrigins = [
  `http://localhost:5172`,
  `http://localhost:5173`,
  `https://netlify.app`,
  `https://blogfrontapp.netlify.app`,
  `https://blogauthorapp.netlify.app`
];

const corsOptions = {
  origin: function (origin, callback){
    // Check if the origin is in the whitelist or if it's a local/server-to-server request (no origin)
    if (!origin || allowedOrigins.includes(origin)){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use("/api/v1", apiRouter);
app.use(notFoundErrorHandler);
app.use(globalErrorHandler)


export { app }

