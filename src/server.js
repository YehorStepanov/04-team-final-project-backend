import express from 'express';
import { logger } from './middlewares/logger.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import weeksRoutes from './routes/weeksRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRouter from './routes/tasksRoutes.js';

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

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
