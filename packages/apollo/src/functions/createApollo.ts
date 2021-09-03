import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { CreateApolloProps } from "../types/CreateApolloProps";
import { createMiddleware } from "./createMiddleware";
import { formatError } from "./formatError";

export const createApollo = <T extends ExpressContext = ExpressContext>({
  typeDefs,
  resolvers,
  context,
  ...props
}: CreateApolloProps<T>) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer<T>({
    schema,
    context,
    formatError,
    ...props,
  });

  const start = () => server.start();

  const middleware = createMiddleware(server);

  return {
    server,
    start,
    middleware,
  };
};
