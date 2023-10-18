import jwt from "jsonwebtoken";

export const signJwt = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: "2h",
  });

  return token;
};
