import User from "./auth.model.js";

export const findUserByEmail = async (email) => {

  return User.findOne({email});

}

export const createUser = async (userData) => {

  const user = await User.create(userData);

  user.password = undefined;

  return user;

  
}