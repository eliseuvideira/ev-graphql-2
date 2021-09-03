import { ExpressContext } from "apollo-server-express";
import { ResolverFn } from "../types/ResolverFn";

export const createResolver =
  <T extends ExpressContext = ExpressContext>() =>
  <
    Source = null,
    Result = Record<string, never>,
    Args = Record<string, never>,
    Context extends T = T,
  >(
    ...fns: ResolverFn<Source, Result, Args, Context>[]
  ): ResolverFn<Source, Result, Args, Context> =>
  async (source, args, ctx, info): Promise<Result | void> => {
    for (const fn of fns) {
      const value = await fn(source, args, ctx, info);
      if (value != null) {
        return value;
      }
    }
  };
