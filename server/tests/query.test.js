const { gql, ApolloServer } = require("apollo-server-express");
const { readFile } = require("fs/promises");
const casual = require("casual");
// For clarity in this example we included our typeDefs and resolvers above our test,
// but in a real world situation you'd be importing these in from different files
// const typeDefs = gql`
//   type Query {
//     sensorData(id: ID!, from: String!, to: String!): String!
//   }
// `;

const mocks = {
  String: () => casual.name,
  Int: () => casual.integer(1, 10),
  GPSPosition: () => ({
    latitude: casual.latitude,
    longitude: casual.longitude,
  }),
  DateTime: () => ({
    datetime: `${casual.date()} ${casual.time()}`,
  }),
};

it("returns machine name", async () => {
  const typeDefs = await readFile("./schema.graphql", "utf8");
  const testServer = new ApolloServer({
    typeDefs,
    mocks,
  });

  // const result = await testServer.executeOperation({
  //   query:
  //     "query ($id: ID!, $from: String!, $to: String!) { sensorData(id: $id, from: $from, to: $to) { timestamp { datetime }}}",
  //   variables: {
  //     id: "sjkfhsjkfhjshgjlwheglkhe",
  //     from: "1994-04-11 12:32:04",
  //     to: "1992-09-09 20:46:39",
  //   },
  // });

  const result = await testServer.executeOperation({
    query: "query { machine {name} }",
  });

  expect(typeof result.data.machine.name).toBe("string");
});
