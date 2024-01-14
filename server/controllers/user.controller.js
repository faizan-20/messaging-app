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
    return res.status(400).josn({ msg: "username already exsists" });

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

export { registerUser };
