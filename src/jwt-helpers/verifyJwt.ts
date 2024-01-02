import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

/**
 * Verify JWT token for user authentication.
 *
 * @param authorization - Authorization header containing the JWT token.
 * @returns Decoded user information if authentication is successful.
 * @throws GraphQLError with code "UNAUTHENTICATED" if authentication fails.
 */
export const verifyJwt = (authorization: string | undefined) => {
  if (!authorization) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    return decoded;
  } catch (error) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
