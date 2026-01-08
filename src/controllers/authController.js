import {
  createSession,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';
import { Session } from '../models/session.js';
import { clearSession, setSessionCookies } from '../helper/authHelpers.js';

export const registerUserController = async (req, res) => {
  console.log('1. Контролер реєстрації викликано!'); // <--- ДОДАЙ ЦЕ
  console.log('2. Тіло запиту:', req.body); // <--- ДОДАЙ ЦЕ
  const user = await registerUser(req.body);

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);

  await Session.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: user,
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await logoutUser(sessionId);
  }

  clearSession(res);

  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);
  setSessionCookies(res, session);

  res.status(200).json({ message: 'Successfully refreshed a session!' });
};
