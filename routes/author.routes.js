const express = require("express");
const {
  addAuthor,
  updateAuthor,
  getAuthorById,
  deleteAuthor,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  getAllAuthor,
  authorActivate,
} = require("../controllers/author.controller");
const authorPolice = require("../middleware/author_police");
const authorRolesPolice = require("../middleware/author_roles_police");

express.Router.prefix = function (path, subRouter) {
  const router = express.Router();
  this.use(path, router);
  subRouter(router);
  return router;
};

const router = express.Router();

router.prefix("/", (authorRote) => {
  authorRote.get("/", authorPolice, getAllAuthor);
  authorRote.post("/", addAuthor);
  authorRote.put("/:id", updateAuthor);
  authorRote.get("/:id", authorRolesPolice(["read"]), getAuthorById);
  authorRote.delete("/:id", deleteAuthor);
  authorRote.post("/login", loginAuthor);
  authorRote.post("/logout", logoutAuthor);
  authorRote.post("/refresh", refreshAuthorToken);
  authorRote.get("/activate/:link", authorActivate);

  // authorRote.prefix("/dict", (authorDictRoute) => {
  //   authorDictRoute.post("/", addTerm);
  //   authorDictRoute.get("/", getAllTerms);
  //   authorDictRoute.get("/:id", getTermById);
  //   authorDictRoute.get("/term/:term", getTermByTerm);
  //   authorDictRoute.get("/letter/:letter", getTermByLetter);
  // });
});

module.exports = router;
