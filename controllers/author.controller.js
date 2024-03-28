const author = require("../schema/Author");
const mongoose = require("mongoose");
const { authorValidation } = require("../validations/author.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const myJwt = require("../services/jwt_service");
const { to } = require("../helpers/to_promise");
const uuid = require("uuid");
const mail_service = require("../services/mail_service");

const getAllAuthor = async (req, res) => {
  try {
    const authors = await author.find({});
    res.status(200).send({ data: authors });
  } catch (err) {
    errorHandler(res, err);
  }
};

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    console.log(value); 

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password,
      author_info,
      author_position,
      is_expert,
      author_is_active,
    } = value;

    const hashedPassword = bcrypt.hashSync(author_password, 7);

    const author_activation_link = uuid.v4();

    const getAuthor = await author({
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password: hashedPassword,
      author_info,
      author_position,
      is_expert,
      author_is_active,
      author_activation_link,
    });
    await getAuthor.save();

    await mail_service.sendActivationMail(
      author_email,
      `${config.get("api_url")}:${config.get(
        "port"
      )}/api/author/activate/${author_activation_link}`
    );

    const payload = {
      _id: getAuthor._id,
      is_expert: getAuthor.is_expert,
      authorRoles: ["READ", "WRITE"],
      author_is_active: getAuthor.author_is_active,
    };

    const tokens = myJwt.generateTokens(payload);

    getAuthor.author_token = tokens.refreshToken;

    await getAuthor.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(201).send({ payload, ...tokens });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password,
      author_info,
      author_position,
      is_expert,
      author_is_active,
    } = value;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getAuthor = await author.updateOne(
      { _id: req.params.id },
      {
        author_first_name,
        author_last_name,
        author_nick_name,
        author_email,
        author_phone,
        author_password,
        author_info,
        author_position,
        is_expert,
        author_is_active,
      }
    );
    res.status(201).send({ getAuthor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.author._id);

    if (req.params.id !== req.author._id) {
      return res
        .status(403)
        .send({ message: "Ozingiz haqizda malumot ololas xolos" });
    }

    const getAuthor = await author.findOne({ _id: req.params.id });
    res.status(200).send({ getAuthor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getAuthor = await author.deleteOne({ _id: req.params.id });
    res.status(200).send({ getAuthor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { author_email, author_password } = req.body;
    const author1 = await author.findOne({ author_email });
    if (!author1) {
      return res.status(400).send({ message: `error in email or password` });
    }

    const validPassword = bcrypt.compareSync(
      author_password,
      author1.author_password
    );

    if (!validPassword) {
      return res.status(400).send({ message: `error in email or password` });
    }

    const payload = {
      _id: author1._id,
      is_expert: author1.is_expert,
      authorRoles: ["READ", "WRITE"],
    };

    const tokens = myJwt.generateTokens(payload);
    console.log(tokens);

    author1.author_token = tokens.refreshToken;

    await author1.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send(tokens);
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const logoutAuthor = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    if (refreshToken) {
      let Author = await author.findOneAndUpdate(
        { author_token: refreshToken },
        { author_token: "" },
        { new: true }
      );

      if (!Author)
        return res.status(400).send({ message: "The author is not found" });

      res.clearCookie("refreshToken", { httpOnly: true });
      return res.send({ Author });
    }
    return res
      .status(400)
      .send({ message: "There is no refresh tokens in cookie" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

const refreshAuthorToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).send({ message: "Cookie da refresh topilmadi" });
    }

    const [error, authorDataFromCookie] = await to(
      myJwt.verifyRefreshToken(refreshToken)
    );

    if (error) {
      return res.status(403).send({ message: error.message });
    }

    const authorDataFromDB = await author.findOne({
      author_token: refreshToken,
    });

    if (!authorDataFromDB) {
      return res.status(403).send({ message: "Ruxsat etilmagan (Avtor yoq)" });
    }

    const payload = {
      _id: authorDataFromDB._id,
      is_expert: authorDataFromDB.is_expert,
      authorRoles: ["READ", "WRITE"],
    };

    const tokens = myJwt.generateTokens(payload);
    console.log(tokens);

    authorDataFromDB.author_token = tokens.refreshToken;

    await authorDataFromDB.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send(tokens);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const authorActivate = async (req, res) => {
  try {
    const Author = await author.findOne({
      author_activation_link: req.params.link,
    });

    if (!Author) {
      return res.status(400).send({ message: "Bunday Author topilmadi1" });
    }
    if (Author.author_is_active) {
      return res.status(400).send({ message: "Author allaqachon active" });
    }

    Author.author_is_active = true;
    await Author.save();

    res.send({
      author_is_active: Author.author_is_active,
      message: "Author faollashdi",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAllAuthor,
  addAuthor,
  updateAuthor,
  getAuthorById,
  deleteAuthor,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate,
};
