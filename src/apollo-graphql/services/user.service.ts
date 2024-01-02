import { CreateUserResponse, User, UserInput } from "types";
import { prisma } from "../../../prisma/index.prisma";
import chalk from "chalk";
import { signJwt } from "../../jwt-helpers/signJwt";

/**
 * Gets a user by email from the database.
 * @param email - The email of the user.
 * @returns A promise resolving to the user found or null if not found.
 */
export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------------

/**
 * Gets all users from the database.
 * @returns A promise resolving to an array of users.
 */
export const getUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------

/**
 * Creates a new user in the database.
 * @param name - The name of the user.
 * @param email - The email of the user.
 * @param role - The role of the user.
 * @returns A promise resolving to the response containing the user and a JWT token.
 */
export const createUser = async ({
  name,
  email,
  role,
}: UserInput): Promise<CreateUserResponse> => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    });

    const userRes = {
      code: 200,
      message: "User succesfully created.",
      success: true,
      token: signJwt(user.email),
      user,
    };

    return userRes;
  } catch (error: any) {
    console.log(chalk.bold.red(error.message));
    const userFailedRes = {
      code: 400,
      message: "Email Already Exist!",
      success: false,
      token: signJwt(email),
      user: null,
    };
    if (error.message.includes("users_email_key")) {
      return userFailedRes;
    } else {
      userFailedRes.message = "Something went wrong! Try Again";
      return userFailedRes;
    }
  }
};

// -----------------------------------------------------

/**
 * Deletes a user from the database.
 * @param email - The email of the user to be deleted.
 * @returns A promise resolving to the deleted user.
 */
export const deleteUser = async (email: string): Promise<User> => {
  const deletedUser = await prisma.user.delete({
    where: {
      email,
    },
  });

  return deletedUser;
};
