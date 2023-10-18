import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const verifyJwt = (req) => {
  const authorization = req.headers.authorization;
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
