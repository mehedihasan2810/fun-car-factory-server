import { testServer } from ".";

const GET_CARS = `#graphql 
query GetCars {
     getCars {
        name
        email
        price
        rating
        url
     } 
    }`;

const GET_CAR = `#graphql 
query GetCar($id: String!) {
     getCar(id: $id) {
        name
        email
        price
        rating
        url
     } 
    }`;

describe("Car Queries", () => {
  test("Should fetch a list of cars with field name, email, price, rating, url", async () => {
    const getCarsRes = await testServer.executeOperation({
      query: GET_CARS,
    });

    expect((getCarsRes.body as any).singleResult.errors).toBeUndefined();
    expect(getCarsRes).toMatchSnapshot();
  }, 120000);

  test("Should fetch a single car based on a unique id", async () => {
    const getCarRes = await testServer.executeOperation({
      query: GET_CAR,
      variables: { id: "64671a8fe81294b16783e44d" },
    });

    expect((getCarRes.body as any).singleResult.errors).toBeUndefined();
    expect(getCarRes).toMatchSnapshot();
  }, 120000);
});
