import {
    findUserByEmail,
    createUser,
} from "./auth.repository.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";

export const registerUser = async (userData) => {

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    return createUser({
        ...userData,
        password: hashedPassword,
    });

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

  user.password = undefined;

  return {
    user,
    token,
  };
};