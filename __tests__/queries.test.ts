import { describe, expect, test } from "vitest";
import { Car, User } from "../src/types/types";
import { testServer } from "./utils";

// Describe block for queries
describe("Queries", () => {
  // Test: Returns user list with name field
  test(
    "Returns user list with name field",
    async () => {
      const response = await testServer.executeOperation({
        query: `query GetUsers {
        getUsers {
          name
        }
      }`,
      });

      if (response.body.kind === "single") {
        const users = response.body.singleResult.data?.getUsers as User[];

        // Assertion: Check if there are no errors and users are defined
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(users).toBeDefined();
      }
    },
    { retry: 3 }
  );

  // Test: Should return a user with email field with the provided email
  test(
    "Should return a user with email field with the provided email",
    async () => {
      const response = await testServer.executeOperation({
        query: `query GetUser($email: String!) {
        getUser(email: $email) {
          email
        }
      }`,
        variables: { email: "test@gmail.com" },
      });

      if (response.body.kind === "single") {
        const user = response.body.singleResult.data?.getUser as Pick<
          User,
          "email"
        >;

        // Assertion: Check if there are no errors, user is defined, and email matches
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(user).toBeDefined();
        expect(user.email).toEqual("test@gmail.com");
      }
    },
    { retry: 3 }
  );

  // Test: Should return Car list with the field name
  test(
    "Should return Car list with the field name",
    async () => {
      const response = await testServer.executeOperation({
        query: `query GetCars {
        getCars {
          name
        }
      }`,
      });

      if (response.body.kind === "single") {
        const cars = response.body.singleResult.data?.getCars as Car[];

        // Assertion: Check if there are no errors and cars are defined
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(cars).toBeDefined();
      }
    },
    { retry: 3 }
  );

  // Test: Should return a car data with name field with the provided id variable
  test("Should return a car data with name field with the provided id variable", async () => {
    const response = await testServer.executeOperation({
      query: `query GetCar($id: String!) {
        getCar(id: $id) {
          name
        }
      }`,
      variables: { id: "64671a8fe81294b16783e44d" },
    });

    if (response.body.kind === "single") {
      const car = response.body.singleResult.data?.getCar as Pick<Car, "name">;

      // Assertion: Check if there are no errors, car is defined, and name matches
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(car).toBeDefined();
      expect(car.name).toEqual("Ferrari 2021");
    }
  });
});
