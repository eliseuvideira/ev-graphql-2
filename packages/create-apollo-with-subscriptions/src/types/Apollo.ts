import { ApolloServer } from "apollo-server-express";
import http from "http";
import { Router } from "express";
import { UploadOptions } from "graphql-upload";

export interface Apollo {
  server: ApolloServer;
  start: (httpServer: http.Server) => Promise<void>;
  middleware: (options?: UploadOptions) => Router;
}
