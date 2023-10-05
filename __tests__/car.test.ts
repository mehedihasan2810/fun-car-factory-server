import { testServer } from ".";
import { prisma } from "../prisma/index.prisma";

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

const CREATE_CAR = `#graphql
mutation CreateCar($carInput: CarInput!) {
    createCar(carInput: $carInput) {
    code
    message
    success
    car {
      id
      description
    }
     }
    }`;

const mockCar = {
  category: "Taxi",
  description: "A Colorful Taxi",
  email: "cartestjest@gmail.com",
  name: "TaTa Taxi",
  price: 20,
  quantity: 30,
  rating: 5,
  sellerName: "Kane william",
  url: "https://images.unsplash.com/photo-1510073666657-90dd548ff9dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
};

describe("Car Queries", () => {
  beforeAll(async () => {
    const isCarExists = await prisma.car.findFirst({
      where: {
        email: mockCar.email,
      },
    });

    if (isCarExists) {
      await prisma.car.deleteMany({
        where: {
          email: mockCar.email,
        },
      });
    }
  }, 120000);

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

describe("Car Mutations", () => {
  afterAll(async () => {
    await prisma.car.deleteMany({
      where: {
        email: mockCar.email,
      },
    });
  }, 120000);
  test("should create a car", async () => {
    const createdCarRes = await testServer.executeOperation({
      query: CREATE_CAR,
      variables: {
        carInput: mockCar,
      },
    });

    const car = await prisma.car.findUnique({
      where: {
        id: (createdCarRes.body as any).singleResult.data.createCar.car.id,
      },
      select: {
        category: true,
        description: true,
        email: true,
        name: true,
        price: true,
        quantity: true,
        rating: true,
        sellerName: true,
        url: true,
      },
    });

    expect(car).toEqual(mockCar);
    expect((createdCarRes.body as any).singleResult.errors).toBeUndefined();
    // expect(createUserRes).toMatchSnapshot();
  }, 120000);
});
