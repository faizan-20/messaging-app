import asyncHandler from "express-async-handler";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  )
    return res.status(400).json({ msg: "All fields are required" });

  const exsistingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (exsistingUser)
    return res.status(400).json({ msg: "username already exsists" });

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath)
    return res.status(400).json({ msg: "Avatar is requried" });

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) return res.status(400).json({ msg: "avatar is requried" });

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser)
    return res.status(500).json({ msg: "something went wrong" });

  return res.status(201).json(createdUser);
});

const generateUserAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    return accessToken;
  } catch (error) {
    console.log(error);
    return;
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username && !email)
    return res.status(400).json({ msg: "username or email is required" });

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) return res.status(404).json({ msg: "user does not exsist" });

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid)
    return res.status(400).json({ msg: "password is not valid" });

  const accessToken = await generateUserAccessToken(user._id);
  console.log("ACCESS TOKEN: ", accessToken);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(loggedInUser);
});

const logoutUser = (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ msg: "logout successful" });
};

export { registerUser, loginUser, generateUserAccessToken, logoutUser };
