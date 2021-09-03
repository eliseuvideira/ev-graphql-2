import { GraphQLResolveInfo } from "graphql";

export type Resolver<Source, Result, Args, Context> = (
  source: Source,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<Result | void>;
