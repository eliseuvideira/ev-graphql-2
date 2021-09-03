import { ResolverFn } from "./ResolverFn";

export type Resolver<Source, Result, Args, Context> = (
  ...fns: ResolverFn<Source, Result, Args, Context>[]
) => ResolverFn<Source, Result, Args, Context>;
