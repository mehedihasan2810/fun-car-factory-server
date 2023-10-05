import { testServer } from ".";
import { prisma } from "../prisma/index.prisma";

const GET_USERS = `#graphql 
query GetUsers {
     getUsers {
        name
        email
        role
     } 
    }`;

const GET_USER = `#graphql 
query GetUser($email: String!) {
     getUser(email: $email) {
        name
        email
        role
     } 
    }`;

const CREATE_USER = `#graphql
mutation CreateUser($input: UserInput!) {
     createUser(input: $input) {
        email
        name
        role
     }
    }`;

const mockUser = {
  email: "usertestjest@gmail.com",
  name: "mehedi",
  role: "user",
};

describe("User Queries", () => {
  beforeAll(async () => {
    const isUserExists = await prisma.user.findUnique({
      where: {
        email: mockUser.email,
      },
    });

    if (isUserExists) {
      await prisma.user.delete({
        where: {
          email: mockUser.email,
        },
      });
    }
  }, 120000);

  test("Should fetch a list of users", async () => {
    const getUsersRes = await testServer.executeOperation({
      query: GET_USERS,
    });

    expect((getUsersRes.body as any).singleResult.errors).toBeUndefined();
    expect(getUsersRes).toMatchSnapshot();
  }, 120000);

  test("Should fetch a single user based on a unique email", async () => {
    const getUserRes = await testServer.executeOperation({
      query: GET_USER,
      variables: { email: "test@gmail.com" },
    });

    expect((getUserRes.body as any).singleResult.errors).toBeUndefined();
    expect(getUserRes).toMatchSnapshot();
  }, 120000);
});

describe("User Mutations", () => {
  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: mockUser.email,
      },
    });
  }, 120000);

  test("should create a user with the field email, name, role and return the created data", async () => {
    const createUserRes = await testServer.executeOperation({
      query: CREATE_USER,
      variables: {
        input: mockUser,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email: mockUser.email,
      },
      select: {
        email: true,
        name: true,
        role: true,
      },
    });
    expect(user).toEqual(mockUser);
    expect((createUserRes.body as any).singleResult.errors).toBeUndefined();
    // expect(createUserRes).toMatchSnapshot();
  }, 120000);
});
