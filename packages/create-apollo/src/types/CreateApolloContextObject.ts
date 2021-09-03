import { ExpressContext } from "apollo-server-express";

export type CreateApolloContextObject<
  T extends ExpressContext = ExpressContext,
> = Omit<Omit<T, "req">, "res">;
