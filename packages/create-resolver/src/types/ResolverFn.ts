import { GraphQLResolveInfo } from "graphql";

export type ResolverFn<Source, Result, Args, Context> = (
  source: Source,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<Result | void>;
