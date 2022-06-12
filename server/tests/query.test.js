const { ApolloServer } = require("apollo-server-express");
const { readFile } = require("fs/promises");
const mocks = require("./mocks.js");

jest.setTimeout(10000);

let typeDefs;
let testServer;

beforeEach(async () => {
  typeDefs = await readFile("./schema.graphql", "utf8");
  testServer = new ApolloServer({
    typeDefs,
    mocks,
  });
});

it("returns machine name", async () => {
  const result = await testServer.executeOperation({
    query: "query { machine {name} }",
  });

  expect(typeof result.data.machine.name).toBe("string");
});

it("returns sensor data", async () => {
  const result = await testServer.executeOperation({
    query:
      "query ($id: ID!, $from: String!, $to: String!) { sensorData(id: $id, from: $from, to: $to) { timestamp }}",
    variables: {
      id: "sjkfhsjkfhjshgjlwheglkhe",
      from: "1994-04-11 12:32:04",
      to: "1992-09-09 20:46:39",
    },
  });

  expect(typeof result.data.sensorData).toBe("object");
  expect(result.data.sensorData.length > 0).toBeTruthy();
});
