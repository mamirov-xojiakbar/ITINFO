const mongoose = require("mongoose");
const Admin = require("../schema/Admin");
const errorHandler = require("../helpers/error_hendler");
const { adminValidate } = require("../validations/admin.validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const myJwt = require("../services/jwt_service");
const { to } = require("../helpers/to_promise");
const uuid = require("uuid");
const mail_service = require("../services/mail_service");

const getAllAdmin = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Avtor ro'xatdan o'tmagan" });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer != "Bearer" || !token) {
      return res
        .status(403)
        .json({ message: "Avtor ro'xatdan o'tmagan (token berilmagan)" });
    }

    const decodeToken = jwt.verify(token, config.get("tokenKey"));
    console.log(decodeToken);

    const getAdmins = await Admin.find({});
    res.status(200).send({ getAdmins });
  } catch (error) {
    errorHandler(res, error);
  }
};

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidate(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const {
      admin_name,
      admin_email,
      admin_password,
      admin_photo,
      admin_is_active,
      admin_is_creator,
      created_date,
      updated_date,
    } = value;

    const hashedPassword = bcrypt.hashSync(admin_password, 7);

    const admin_activation_link = uuid.v4();

    const addNew = await Admin({
      admin_name,
      admin_email,
      admin_password: hashedPassword,
      admin_photo,
      admin_is_active,
      admin_is_creator,
      created_date,
      updated_date,
      admin_activation_link,
    });
    await addNew.save();

    await mail_service.sendActivationMail(
      admin_email,
      `${config.get("api_url")}:${config.get(
        "port"
      )}/api/admin/activate/${admin_activation_link}`
    );

    const payload = {
      _id: addNew._id,
      admin_is_active: addNew.admin_is_active,
    };

    const tokens = myJwt.generateTokens(payload);

    addNew.admin_token = tokens.refreshToken;

    await addNew.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.status(200).send({ payload, tokens });
  } catch (error) {
    console.log(error);
  }
};

const getAdminsById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const getAdmin = await Admin.findOne({ _id: req.params.id });
    res.status(200).send({ getAdmin });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidate(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const {
      admin_name,
      admin_email,
      admin_password,
      admin_photo,
      admin_is_active,
      admin_is_creator,
      created_date,
      updated_date,
    } = value;

    const addNew = await Admin.updateOne(
      { _od: req.params.id },
      {
        admin_name,
        admin_email,
        admin_password,
        admin_photo,
        admin_is_active,
        admin_is_creator,
        created_date,
        updated_date,
      }
    );
    res.status(200).send({ message: "Updated admin", addNew });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Error: "Serverda xatolik" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const deleteAdmin = await Admin.deleteOne({ _id: req.params.id });
    res.status(200).send({ deleteAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const admin1 = await Admin.findOne({ admin_email });
    if (!admin1) {
      return res.status(400).send({ message: `error in email or password` });
    }

    const validPassword = bcrypt.compareSync(
      admin_password,
      admin1.admin_password
    );

    if (!validPassword) {
      console.log("xato");
      return res.status(400).send({ message: `error in email or password` });
    }

    const payload = {
      _id: Admin._id,
    };

    const tokens = myJwt.generateTokens(payload);

    admin1.admin_token = tokens.refreshToken;

    await admin1.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
    });

    res.status(200).send({ tokens });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      let admin = await Admin.findOneAndUpdate(
        { admin_token: refreshToken },
        { admin_token: "" },
        { new: true }
      );

      if (!admin) {
        return res.status(400).send({ message: "The admin is not found" });
      }

      res.clearCookie("refreshToken");
      return res.send({ admin });
    }
    return res
      .status(400)
      .send({ message: "There is no refresh tokens in cookie" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(403).send({ message: "Cookie da refresh topilmadi" });
    }

    const [error, adminDataFromCookie] = await to(
      myJwt.verifyRefreshToken(refreshToken)
    );

    if (error) {
      return res.status(403).send({ message: "Admin royxatdan o'tmagan" });
    }

    const adminDataFromDB = await Admin.findOne({
      admin_token: refreshToken,
    });

    if (!adminDataFromDB) {
      return res.status(403).send({ message: "Ruxsat etilmagan (Admin yoq)" });
    }

    const payload = {
      _id: adminDataFromDB._id,
      adminRoles: ["READ", "WRITE"],
    };

    const tokens = myJwt.generateTokens(payload);

    adminDataFromDB.admin_token = tokens.refreshToken;

    await adminDataFromDB.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const adminActivate = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      admin_activation_link: req.params.link,
    });

    if (!admin) {
      return res.status(400).send({ message: "Bunday Admin topilmadi1" });
    }

    if (admin.admin_is_active) {
      return res.status(400).send({ message: "Admin allaqachon active" });
    }

    admin.admin_is_active = true;
    await admin.save();

    res.send({
      admin_is_active: admin.admin_is_active,
      message: "Admin faollashdi",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAllAdmin,
  addAdmin,
  getAdminsById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
  adminActivate,
};
