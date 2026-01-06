import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';

export const createSession = async (userId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...payload, password: hashedPassword });
  return newUser;
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  return user;
};

export const logoutUser = async (sessionId) => {
  await Session.findOneAndDelete({ _id: sessionId });
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await Session.findOneAndDelete({ _id: sessionId, refreshToken });

  const newSession = await createSession(session.userId);
  return newSession;
};
