import { describe, expect, test } from "vitest";
import { testServer } from "./utils";
import { Car, CreateUserResponse, User } from "../src/types/types";

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

describe("Mutations", () => {
  test(
    "Should Create a car data with the provided input variable",
    async () => {
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
        const createdCar = createdCarRes.body.singleResult.data
          ?.createCar as CreatedCarRes;
        id = createdCar.car.id as string;
        expect(createdCar.car.name).toEqual("testing createCar");
      }

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
        const deletedCar = deleteCarRes.body.singleResult.data
          ?.deleteCar as Pick<Car, "name">;
        expect(deletedCar.name).toEqual("testing createCar");
        console.log(deletedCar);
      }
    },
    { retry: 3 }
  );

  test(
    "Should Create a user with the provided data and delete a user with the provided email variable",
    async () => {
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
    },
    { retry: 3 }
  );
});
