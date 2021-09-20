const hash = () => "" + Date.now() + Math.random();

const uploadExpress = { [hash()]: hash() };

const post = jest.fn();
const use = jest.fn();
const _router = { post, use, [hash()]: hash() };
const Router = jest.fn(() => _router);
const graphqlUploadExpress = jest.fn(() => uploadExpress);

jest.mock("express", () => ({ Router }));
jest.mock("graphql-upload", () => ({ graphqlUploadExpress }));

import { createMiddleware } from "../../src/functions/createMiddleware";

describe("createMiddleware", () => {
  it("creates a middleware factory function", () => {
    expect.assertions(9);

    const graphqlMiddleware = { [hash()]: hash() };

    const getMiddleware = jest.fn(() => graphqlMiddleware);

    const apolloServer = { [hash()]: hash(), getMiddleware } as any;

    const middleware = createMiddleware(apolloServer);

    const options = { [hash()]: hash() };

    const router = middleware(options);

    expect(Router).toHaveBeenCalledTimes(1);
    expect(getMiddleware).toHaveBeenCalledTimes(1);
    expect(graphqlUploadExpress).toHaveBeenCalledTimes(1);
    expect(graphqlUploadExpress).toHaveBeenCalledWith(options);
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("/graphql", uploadExpress);
    expect(use).toHaveBeenCalledTimes(1);
    expect(use).toHaveBeenCalledWith("/graphql", graphqlMiddleware);
    expect(router).toBe(_router);
  });
});
