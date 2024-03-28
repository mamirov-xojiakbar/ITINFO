const myJwt = require("../services/jwt_service");
const { to } = require("../helpers/to_promise");

module.exports = function (roles) {
  return async function (req, res, next) {
    try {
      const authorization = req.headers.authorization;
      console.log(authorization);
      if (!authorization) {
        return res.status(403).json({ message: "Avtor ro'xatdan o'tmagan" });
      }
      const bearer = authorization.split(" ")[0];
      const token = authorization.split(" ")[1];
      if (bearer != "Bearer" || !token)
        return res
          .status(403)
          .json({ message: "Avtor ro'xatdan o'tmagan (token berilmagan)" });

      const [error, decodeToken] = await to(myJwt.verifyAccessToken(token));
      if (error) {
        return res.status(403).json({ message: error.message });
      }

      console.log(decodeToken);
      req.author = decodeToken;

      const { is_expert, authorRoles } = decodeToken;
      let hasRole = false;

      authorRoles.forEach(authorRole => {
        if(roles.includes(authorRole)) hasRole = true
      });

      if (!is_expert || !hasRole){
        return res.status(401).send({ message: "Sizga bunday huquq barilmagan" })
      }

      next();
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .send({ message: "Avtor royxatdan otmagan (token notogri)" });
    }
  };
};
