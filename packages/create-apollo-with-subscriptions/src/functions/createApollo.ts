import { ApolloServer, ExpressContext } from "apollo-server-express";
import { Apollo } from "../types/Apollo";
import { CreateApolloProps } from "../types/CreateApolloProps";
import { createMiddleware } from "./createMiddleware";
import { formatError } from "./formatError";

export const createApollo = <T extends ExpressContext = ExpressContext>({
  schema,
  context,
  ...props
}: CreateApolloProps<T>): Apollo => {
  const server = new ApolloServer<T>({
    schema,
    context,
    formatError,
    ...props,
  });

  const start = async () => {
    await server.start();
  };

  const middleware = createMiddleware(server);

  return {
    server,
    start,
    middleware,
  };
};
