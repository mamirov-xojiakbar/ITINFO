const path = require("path");

const createViewPath = (page) => {
  return path.resolve(__dirname, "../views", `${page}.hbs`);
};

module.exports = {
  createViewPath,
};
