import { ExpressContext } from "apollo-server-express";
import { CreateApolloContextFunction } from "./CreateApolloContextFunction";
import { CreateApolloContextObject } from "./CreateApolloContextObject";
import { CreateApolloBaseProps } from "./CreateApolloBaseProps";
import { CreateApolloResolvers } from "./CreateApolloResolvers";
import { CreateApolloTypeDefs } from "./CreateApolloTypeDefs";

export interface CreateApolloProps<T extends ExpressContext = ExpressContext>
  extends CreateApolloBaseProps {
  resolvers: CreateApolloResolvers[];
  typeDefs: CreateApolloTypeDefs[];
  context?: CreateApolloContextObject<T> | CreateApolloContextFunction<T>;
}
