const hash = () => "" + Date.now() + Math.random();

const uploadExpress = { [hash()]: hash() };

const post = jest.fn();
const _router = { post, [hash()]: hash() };
const Router = jest.fn(() => _router);
const graphqlUploadExpress = jest.fn(() => uploadExpress);

jest.mock("express", () => ({ Router }));
jest.mock("graphql-upload", () => ({ graphqlUploadExpress }));

import { createMiddleware } from "../../src/functions/createMiddleware";

describe("createMiddleware", () => {
  it("creates a middleware factory function", () => {
    expect.assertions(8);

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
    expect(post).toHaveBeenCalledTimes(2);
    expect(post.mock.calls[0]).toEqual(["/graphql", uploadExpress]);
    expect(post.mock.calls[1]).toEqual(["/graphql", graphqlMiddleware]);
    expect(router).toBe(_router);
  });
});
