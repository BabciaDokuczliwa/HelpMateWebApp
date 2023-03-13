import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utilities/email.js";
import sendDynamicEmail from "../utilities/emailDynamic.js";

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    console.log("🚀 ~ hello register ", req.body);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("🚀 ~ register ~ hashedPass", hashedPass);

    req.body.password = hashedPass;

    const user = await User.create(req.body);
    console.log("🚀 ~ register ~ user", user);
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });

    sendEmail(token, user.email);
    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ register ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("🚀 ~ hello login ", req.body);

    const user = await User.findOne({
      $or: [
        { username: req.body.emailOrUsername },
        { email: req.body.emailOrUsername },
      ],
    }).select("-__v");

    console.log("🚀 ~ login ~ user", user);

    if (!user) return res.send({ success: false, errorId: 1 });

    const passMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("🚀 ~ login ~ passMatch", passMatch);

    if (!passMatch) return res.send({ success: false, errorId: 1 });

    const newUser = user.toObject();

    delete newUser.password;

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });
    console.log("🚀 ~ login ~ token", token);

    res.cookie("e04", token);
    res.cookie("e041", "token2");
    res.send({ success: true, user: newUser });
  } catch (error) {
    console.log("🚀 ~ login ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};
export const emailConfirm = async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findByIdAndUpdate(
      { _id: decoded.id },
      { verified: true },
      { new: true }
    );
    console.log("🚀 ~ emailConfirm ~ user", user);
    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ emailConfirm ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};
export const Forgotpass = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { username: req.body.emailOrUsername },
        { email: req.body.emailOrUsername },
      ],
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });
    sendDynamicEmail("fsg", "forgotpass"); //token and template
    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ Forgotpass ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const ChangePassword = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const updated = await User.findByIdAndUpdate(
      decoded.id,
      { password: hashedPass },
      { new: true }
    );
     console.log("🚀 ~ changePass ~ updated", updated);
    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ ChangePassword ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("🚀 ~ hello logout ");

    res.clearCookie("e04");

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ logout ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    }).select("-password -__v");

    if (!user) return res.send({ success: false, errorId: 1 });

    res.send({ success: true, user });
  } catch (error) {
    console.log("🚀 ~ updateProfile ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};
