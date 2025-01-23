const jwt = require("jsonwebtoken")

export function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(400);

  const match = token.match(/^Bearer (.+)$/);
  if (!match[1]) return res.sendStatus(400);

  jwt.verify(match[1], process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}
