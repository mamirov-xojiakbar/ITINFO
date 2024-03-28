const mongoose = require("mongoose");
const User = require("../schema/User");
const errorHandler = require("../helpers/error_hendler");
const { userValidate } = require("../validations/user.validation");
const bcrypt = require("bcrypt");
const myJwt = require("../services/jwt_service");
const config = require("config");
const uuid = require("uuid");
const mail_service = require("../services/mail_service");

const getAllUser = async (req, res) => {
  try {
    const getUsers = await User.find({});
    res.status(200).send({ getUsers });
  } catch (error) {
    errorHandler(res, error);
  }
};

const addUser = async (req, res) => {
  try {
    const { error, value } = userValidate(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const {
      user_name,
      user_email,
      user_password,
      user_info,
      user_photo,
      created_date,
      updated_date,
      user_is_active,
    } = value;

    const hashedPassword = bcrypt.hashSync(user_password, 7);

    const user_activation_link = uuid.v4();

    const addNew = await User({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_info,
      user_photo,
      created_date,
      updated_date,
      user_is_active,
      user_activation_link,
    });
    await addNew.save();

    await mail_service.sendActivationMail(
      user_email,
      `${config.get("api_url")}:${config.get(
        "port"
      )}/api/user/activate/${user_activation_link}`
    );

    const payload = {
      _id: addNew._id,
      user_is_active: addNew.user_is_active,
    };

    const tokens = myJwt.generateTokens(payload);

    addNew.user_token = tokens.refreshToken;

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.status(200).send({ payload, tokens });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getUsersById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const getUser = await User.findOne({ _id: req.params.id });
    res.status(200).send({ getUser });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { error, value } = userValidate(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const {
      user_name,
      user_email,
      user_password,
      user_info,
      user_photo,
      created_date,
      updated_date,
      user_is_active,
    } = value;

    const addNew = await User.updateOne(
      { _od: req.params.id },
      {
        user_name,
        user_email,
        user_password,
        user_info,
        user_photo,
        created_date,
        updated_date,
        user_is_active,
      }
    );
    res.status(200).send({ message: "Updated user", addNew });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Error: "Serverda xatolik" });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const deleteUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).send({ deleteUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(400).send({ message: `error in email or password` });
    }

    const validPassword = bcrypt.compareSync(user_password, user.user_password);

    if (!validPassword) {
      console.log("xato");
      return res.status(400).send({ message: `error in email or password` });
    }

    const payload = {
      _id: User._id,
    };

    const tokens = myJwt.generateTokens(payload);

    user.user_token = tokens.refreshToken;

    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
    });

    res.status(200).send({ tokens });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      let user = await User.findOneAndUpdate(
        { user_token: refreshToken },
        { user_token: "" },
        { new: true }
      );

      if (!user) {
        return res.status(400).send({ message: "The user is not found" });
      }

      res.clearCookie("refreshToken");
      return res.send({ user });
    }
    return res
      .status(400)
      .send({ message: "There is no refresh tokens in cookie" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const refreshUserToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(403).send({ message: "Cookie da refresh topilmadi" });
    }

    const [error, userDataFromCookie] = await to(
      myJwt.verifyRefreshToken(refreshToken)
    );

    if (error) {
      return res.status(403).send({ message: "User royxatdan o'tmagan" });
    }

    const userDataFromDB = await User.findOne({
      user_token: refreshToken,
    });

    if (!userDataFromDB) {
      return res.status(403).send({ message: "Ruxsat etilmagan (User yoq)" });
    }

    const payload = {
      _id: userDataFromDB._id,
      adminRoles: ["READ", "WRITE"],
    };

    const tokens = myJwt.generateTokens(payload);

    userDataFromDB.user_token = tokens.refreshToken;

    await userDataFromDB.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const userActivate = async (req, res) => {
  try {
    const user = await User.findOne({
      user_activation_link: req.params.link,
    });
    if (!user) {
      return res.status(400).send({ message: "Bunday Admin topilmadi1" });
    }

    if (user.user_is_active) {
      return res.status(400).send({ message: "User allaqachon active" });
    }

    user.user_is_active = true;

    res.send({
      user_is_active: user.user_is_active,
      message: "User faollashdi",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAllUser,
  addUser,
  getUsersById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  userActivate,
};
