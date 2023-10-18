import jwt from "jsonwebtoken";

export const signJwt = (email: string) => {
  const token = jwt.sign({ email }, process.env.SECRET_KEY as string, {
    expiresIn: "30d",
  });

  return token;
};
