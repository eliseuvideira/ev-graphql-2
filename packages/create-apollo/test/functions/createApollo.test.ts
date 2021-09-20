const hash = () => "" + Date.now() + Math.random();

const any = () => ({ [hash()]: hash() } as any);

const schema = any();

const getMiddleware = jest.fn();
const makeExecutableSchema = jest.fn(() => schema);

const start = jest.fn();

const _apolloServer = { getMiddleware, start };

const ApolloServer = jest.fn(() => _apolloServer);
const graphqlUploadExpress = jest.fn();
const post = jest.fn();
const use = jest.fn();
const _router = { post, use, [hash()]: hash() };
const Router = jest.fn(() => _router);

const formatError = any();

jest.mock("../../src/functions/formatError", () => ({ formatError }));
jest.mock("@graphql-tools/schema", () => ({ makeExecutableSchema }));
jest.mock("apollo-server-express", () => ({ ApolloServer }));
jest.mock("graphql-upload", () => ({ graphqlUploadExpress }));
jest.mock("express", () => ({ Router }));

import { createApollo } from "../../src/functions/createApollo";

describe("createApollo", () => {
  it("creates an object that wraps apollo configs", () => {
    expect.assertions(9);

    const typeDefs = any();

    const resolvers = any();

    const context = any();

    const props = { ...any(), ...any() };

    const introspection = any();

    const apollo = createApollo({
      typeDefs,
      resolvers,
      context,
      introspection,
      ...props,
    });

    const apolloServer = apollo.server;

    const graphqlMiddleware = apollo.middleware();

    expect(makeExecutableSchema).toHaveBeenCalledTimes(1);
    expect(makeExecutableSchema).toHaveBeenCalledWith({ resolvers, typeDefs });
    expect(ApolloServer).toHaveBeenCalledTimes(1);
    expect(ApolloServer).toHaveBeenCalledWith({
      schema,
      context,
      formatError,
      introspection,
      ...props,
    });
    expect(apolloServer).toBe(_apolloServer);
    expect(graphqlUploadExpress).toHaveBeenCalledTimes(1);
    expect(graphqlMiddleware).toEqual(_router);

    expect(start).not.toHaveBeenCalled();

    apollo.start();

    expect(start).toHaveBeenCalledTimes(1);
  });
});
