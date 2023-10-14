import { describe, expect, test } from "vitest";
import { testServer } from "./utils";
import { CreateUserResponse, User } from "../src/types/types";

type CreatedUser = {
  message: string;
  user: {
    id: string;
    email: string;
  };
};

describe("Mutations", () => {
  test("Should Create a user with the provided data and delete a user with the provided email variable", async () => {
    // create user test starts
    const createdUserRes = await testServer.executeOperation({
      query: `mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
          message
          user {
            id
            email
          }
        }
      }`,
      variables: {
        input: {
          email: "test6@gmail.com",
          name: "john doe",
          role: "user",
        },
      },
    });

    let id: unknown;

    if (createdUserRes.body.kind === "single") {
      const createdUser = createdUserRes.body.singleResult.data
        ?.createUser as CreatedUser;
      id = createdUser.user.id as string;

      expect(createdUserRes.body.singleResult.errors).toBeUndefined();
      expect(createdUser.user.email).toEqual("test6@gmail.com");
      //   console.log(createdUser);
    }
    // create user test ends

    // delete user test starts
    const deletedUserRes = await testServer.executeOperation({
      query: `mutation DeleteUser($email: String!) {
            deleteUser(email: $email) {
             email
            }
          }`,
      variables: {
        email: "test6@gmail.com",
      },
    });

    if (deletedUserRes.body.kind === "single") {
      const deletedUser = deletedUserRes.body.singleResult.data
        ?.deleteUser as Pick<User, "email">;
      expect(deletedUser.email).toEqual("test6@gmail.com");
    }
    // delete user test ends
  });
});
