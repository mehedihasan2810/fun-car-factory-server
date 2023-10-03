import { testServer } from ".";

describe("Car Queries", () => {
  it("checking jest", async () => {
    const response = await testServer.executeOperation({
      query: `#graphql 
      query GetCars {
           getCars {
              name
           } 
          }`,
      // variables: { name: "world" },
    });

    expect(response).toMatchSnapshot();
  });
});
