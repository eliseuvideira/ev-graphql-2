import { ExpressContext } from "apollo-server-express";
import { CreateApolloContextFunction } from "./CreateApolloContextFunction";
import { CreateApolloContextObject } from "./CreateApolloContextObject";
import { CreateApolloBaseProps } from "./CreateApolloBaseProps";
import { GraphQLSchema } from "graphql";

export interface CreateApolloProps<T extends ExpressContext = ExpressContext>
  extends CreateApolloBaseProps {
  schema: GraphQLSchema;
  context?: CreateApolloContextObject<T> | CreateApolloContextFunction<T>;
}
