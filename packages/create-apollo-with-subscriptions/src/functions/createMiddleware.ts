import { ApolloServer } from "apollo-server-express";
import { Router } from "express";
import { graphqlUploadExpress, UploadOptions } from "graphql-upload";

export const createMiddleware =
  (apolloServer: ApolloServer) =>
  (options?: UploadOptions): Router => {
    const router = Router();

    router.post("/graphql", graphqlUploadExpress(options));

    router.use(
      "/graphql",
      apolloServer.getMiddleware({ cors: false, path: "/" }),
    );

    return router;
  };
