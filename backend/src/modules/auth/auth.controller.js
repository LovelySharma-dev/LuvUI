import User from "../../models/user.model.js";
//signup
export const signup = async (req, res) => {};

// login
export const login = async (req, res) => {};

// logout
export const logout = async (_, res) => {};

// update-profile
export const updateProfile = async (req, res) => {
  res.status(200).json(req.user);
};
