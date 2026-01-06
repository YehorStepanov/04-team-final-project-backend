import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import { uploadToCloudinary } from '../helper/cloudinary.js';

export const getCurrentUserController = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved user info!',
    data: user,
  });
};

export const updateAvatarController = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'Avatar file is required');
  }

  const uploadResult = await uploadToCloudinary(req.file);

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: uploadResult.secure_url },
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated avatar!',
    data: updatedUser,
  });
};

export const updateUserController = async (req, res) => {
  const { name, gender, theme, dueDate } = req.body;

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (gender !== undefined) updateData.gender = gender;
  if (theme !== undefined) updateData.theme = theme;
  if (dueDate !== undefined) updateData.dueDate = dueDate;

  if (Object.keys(updateData).length === 0) {
    throw createHttpError(400, 'No valid fields to update');
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user!',
    data: updatedUser,
  });
};
