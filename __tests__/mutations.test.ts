import { describe, expect, test } from "vitest";
import { testServer } from "./utils";
import { Car, CreateUserResponse, User } from "../src/types/types";

// Define types for created user and car responses
type CreatedUser = {
  message: string;
  user: {
    id: string;
    email: string;
  };
};

type CreatedCarRes = {
  message: string;
  car: {
    id: string;
    name: string;
  };
};

// Describe block for mutations
describe("Mutations", () => {
  // Test for creating a car and then deleting it
  test(
    "Should Create a car data with the provided input variable",
    async () => {
      // Create a car
      const createdCarRes = await testServer.executeOperation({
        query: `
        mutation CreateCar($carInput: CarInput!) {
            createCar(carInput: $carInput) {
              message
              car {
                id
                name
              }
            }
          }
        `,
        variables: {
          carInput: {
            category: "mock category",
            description: "a",
            email: "a",
            name: "testing createCar",
            price: 23,
            quantity: 44,
            rating: 5,
            sellerName: "a",
            url: "http",
          },
        },
      });

      let id: unknown;

      if (createdCarRes.body.kind === "single") {
        // Extract the id from the created car response
        const createdCar = createdCarRes.body.singleResult.data
          ?.createCar as CreatedCarRes;
        id = createdCar.car.id as string;

        // Assertion: Check if the created car has the expected name
        expect(createdCar.car.name).toEqual("testing createCar");
      }

      // Delete the created car
      const deleteCarRes = await testServer.executeOperation({
        query: `
        mutation DeleteCar($id: String!) {
            deleteCar(id: $id) {
              name
            }
          }
          
        `,
        variables: { id },
      });

      if (deleteCarRes.body.kind === "single") {
        // Extract the name from the deleted car response
        const deletedCar = deleteCarRes.body.singleResult.data
          ?.deleteCar as Pick<Car, "name">;

        // Assertion: Check if the deleted car has the expected name
        expect(deletedCar.name).toEqual("testing createCar");
      }
    },
    { retry: 3 }
  );

  // Test for creating a user and then deleting it
  test(
    "Should Create a user with the provided data and delete a user with the provided email variable",
    async () => {
      // Create a user
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
        // Extract the id from the created user response
        const createdUser = createdUserRes.body.singleResult.data
          ?.createUser as CreatedUser;
        id = createdUser.user.id as string;

        // Assertion: Check if the created user has the expected email
        expect(createdUserRes.body.singleResult.errors).toBeUndefined();
        expect(createdUser.user.email).toEqual("test6@gmail.com");
      }

      // Delete the created user
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
        // Extract the email from the deleted user response
        const deletedUser = deletedUserRes.body.singleResult.data
          ?.deleteUser as Pick<User, "email">;

        // Assertion: Check if the deleted user has the expected email
        expect(deletedUser.email).toEqual("test6@gmail.com");
      }
    },
    { retry: 3 }
  );
});
