const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { message, userId } = await authService.register(
      req.body.username,
      req.body.email,
      req.body.password
    );
    res.status(201).json({ message, userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, userId } = await authService.login(
      req.body.email,
      req.body.password
    );
    res.status(200).json({ token, userId });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await authService.getProfile(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
