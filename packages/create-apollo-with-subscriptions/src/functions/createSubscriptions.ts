import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { ServerOptions, SubscriptionServer } from "subscriptions-transport-ws";
import http from "http";

export const createSubscriptions =
  (apolloServer: ApolloServer) => async (httpServer: http.Server) => {
    const options: ServerOptions = {
      execute,
      subscribe,
    };

    const subscriptionServer = SubscriptionServer.create(options, {
      server: httpServer,
      path: apolloServer.graphqlPath,
    });

    httpServer.on("close", () => {
      subscriptionServer.close();
    });

    return subscriptionServer;
  };
