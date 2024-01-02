import jwt from "jsonwebtoken";

/*
 * Sign JWT token with user email for authentication.
 *
 * @param email - User email to include in the JWT payload.
 * @returns Signed JWT token.
 */
export const signJwt = (email: string) => {
  const token = jwt.sign({ email }, process.env.SECRET_KEY as string, {
    expiresIn: "30d",
  });

  return token;
};
