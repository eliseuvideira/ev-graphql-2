import { ApolloServer } from "apollo-server-express";
import { Router } from "express";
import { UploadOptions } from "graphql-upload";

export interface Apollo {
  server: ApolloServer;
  start: () => Promise<void>;
  middleware: (options?: UploadOptions) => Router;
}
