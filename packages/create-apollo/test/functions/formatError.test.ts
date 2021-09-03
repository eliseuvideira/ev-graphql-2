import { GraphQLError } from "graphql";
import { formatError } from "../../src/functions/formatError";

describe("formatError", () => {
  const hash = () => "" + Date.now() + Math.random();

  it("prints to the console on INTERNAL_SERVER_ERROR", () => {
    expect.assertions(3);

    const consoleError = jest.fn();

    const _ = console.error;

    console.error = consoleError;

    try {
      const originalError = { key: hash() };

      const extensions = { code: "INTERNAL_SERVER_ERROR", key: hash() };

      const message = hash();

      const error = {
        message,
        originalError,
        extensions,
      } as any;

      formatError(error);

      expect(consoleError).toHaveBeenCalledTimes(2);
      expect(consoleError.mock.calls[0]).toEqual([error]);
      expect(consoleError.mock.calls[1]).toEqual([originalError]);
    } finally {
      console.error = _;
    }
  });

  it("replaces the message to INTERNAL_SERVER_ERROR on PRODUCTION", () => {
    expect.assertions(5);

    const consoleError = jest.fn();

    const _ = console.error;

    console.error = consoleError;

    try {
      const originalError = { key: hash() };

      const extensions = { code: "INTERNAL_SERVER_ERROR", key: hash() };

      const message = hash();

      const error = {
        message,
        originalError,
        extensions,
      } as any;

      let formatedError: GraphQLError;

      const __NODE_ENV = process.env.NODE_ENV;

      process.env.NODE_ENV = "production";
      try {
        formatedError = formatError(error);
      } finally {
        process.env.NODE_ENV = __NODE_ENV;
      }

      expect(consoleError).toHaveBeenCalledTimes(2);
      expect(consoleError.mock.calls[0]).toEqual([error]);
      expect(consoleError.mock.calls[1]).toEqual([originalError]);
      expect(formatedError.message).not.toBe(message);
      expect(formatedError.message).toBe("Internal server error");
    } finally {
      console.error = _;
    }
  });

  it("doesn't print to the console on junk errors", () => {
    expect.assertions(1);

    const consoleError = jest.fn();

    const _ = console.error;

    console.error = consoleError;

    try {
      const originalError = { key: hash() };

      const extensions1 = { code: "INTERNAL_SERVER_ERROR", key: hash() };

      const extensions2 = { code: "ANYTHING", key: hash() };

      const error1 = { originalError } as any;

      const error2 = {
        extensions: extensions1,
      } as any;

      const error3 = {
        originalError,
        extensions: extensions2,
      } as any;

      const error4 = new Error() as any;

      formatError(error1);
      formatError(error2);
      formatError(error3);
      formatError(error4);

      expect(consoleError).toHaveBeenCalledTimes(0);
    } finally {
      console.error = _;
    }
  });
});
