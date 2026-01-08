import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errors } from 'celebrate';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import diariesRoutes from './routes/diariesRoutes.js';
import weeksRoutes from './routes/weeksRoutes.js';
import taskRouter from './routes/tasksRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(cookieParser());

// routes
app.use(weeksRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(diariesRoutes);
app.use(taskRouter);

// handlers
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
