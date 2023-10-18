import { CreateUserResponse, User, UserInput } from "types";
import { prisma } from "../../../prisma/index.prisma";
import chalk from "chalk";
import { signJwt } from "../../jwt-helpers/signJwt";

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

export const getUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------

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
      token: null,
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

export const deleteUser = async (email: string): Promise<User> => {
  const deletedUser = await prisma.user.delete({
    where: {
      email,
    },
  });

  return deletedUser;
};
