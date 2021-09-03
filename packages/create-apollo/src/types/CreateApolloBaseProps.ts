import { ApolloServerExpressConfig } from "apollo-server-express";

export type CreateApolloBaseProps = Omit<
  Omit<Omit<ApolloServerExpressConfig, "typeDefs">, "resolvers">,
  "context"
>;
