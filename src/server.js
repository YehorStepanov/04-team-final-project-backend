import express from 'express';
import { logger } from './middlewares/logger.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//Emotion — довідкова модель,
//потрібна для populate, сервер має знати при старті
import './models/emotion.js';

import weeksRoutes from './routes/weeksRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRouter from './routes/tasksRoutes.js';
import diaryRouter from './routes/diaryRoutes.js';
import emotionRoutes from './routes/emotionRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(cookieParser());

//! приклад як та куди додавати маршрути: app.use(authRoutes);
app.use(weeksRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(taskRouter);
app.use(diaryRouter);
app.use(emotionRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
