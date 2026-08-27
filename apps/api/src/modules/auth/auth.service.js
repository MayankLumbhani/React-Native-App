import {
    findUserByEmail,
    createUser,
} from "./auth.repository.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";
import { toUserDTO } from "./auth.dto.js";

export const registerUser = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

if (existingUser) {
  const error = new Error("User already exists");
  error.statusCode = 409;
  throw error;
}

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const user = await createUser({
    ...userData,
    password: hashedPassword,
  });

  return toUserDTO(user);
};

export const loginUser = async (credentials) => {
  const user = await findUserByEmail(credentials.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

const token = jwt.sign(
  { userId: user._id },
  JWT_SECRET,
  { expiresIn: "7d" }
);

return {
  user: toUserDTO(user),
  token,
};};