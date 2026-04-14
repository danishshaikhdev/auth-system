import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../services/authService.js";

export const register = async (req, res) => {
  try {
    // call registerUser service
    const user = await registerUser(req.body);

    // send 201 status code (201 means created)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    // send 400 status code (400 means bad request)
    console.error(err.message);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    // call loginUser service
    const data = await loginUser(req.body);

    // set cookie
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    // send 200 status code (200 means ok)
    res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (err) {
    // send 400 status code (400 means bad request)
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    const data = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false, // false for development purpose since true means cookie only goes to HTTPS
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const data = await logoutUser(req.user.id);

    res.status(200).json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
