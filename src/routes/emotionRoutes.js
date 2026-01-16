import { Router } from "express";
import { authenticate } from '../middlewares/authenticate.js';
import ctrlWrapper from '../helper/ctrlWrapper.js';
import { getAllEmotions } from '../controllers/emotionController.js';


const emotionRoutes = Router();

emotionRoutes.use(authenticate);

emotionRoutes.get('/api/emotions', ctrlWrapper(getAllEmotions));

export default emotionRoutes;
