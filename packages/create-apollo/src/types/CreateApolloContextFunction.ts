import { ExpressContext } from "apollo-server-express";

export type CreateApolloContextFunction<
  T extends ExpressContext = ExpressContext,
> = (context: T) => T;
