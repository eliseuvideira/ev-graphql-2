import { ApolloServerExpressConfig } from "apollo-server-express";

export type CreateApolloBaseProps = Omit<
  Omit<
    Omit<Omit<ApolloServerExpressConfig, "typeDefs">, "resolvers">,
    "schema"
  >,
  "context"
>;
