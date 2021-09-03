import { createResolver } from "../../src/functions/createResolver";
import { ExpressContext } from "apollo-server-express";

const hash = () => "" + Date.now() + Math.random();

const any = () => ({ [hash()]: hash() } as any);

describe("createResolver", () => {
  it("creates a function that creates a resolver function", async () => {
    interface CustomContext extends ExpressContext {
      pubsub: any;
    }

    const resolver = createResolver<CustomContext>();

    expect.assertions(2);

    const fn = jest.fn();

    const instance = resolver<null>(fn);

    const parent = any();
    const args = any();
    const context = any();
    const info = any();

    await instance(parent, args, context, info);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(parent, args, context, info);
  });

  it("allows better intellisense", async () => {
    expect.assertions(7);

    interface CustomContext extends ExpressContext {
      pubsub: any;
    }

    interface CustomReturn {
      value: string;
    }

    interface CustomSource {
      id: number;
    }

    interface CustomArgs {
      value: number;
    }

    const resolver = createResolver<CustomContext>();

    const fn = jest.fn();

    const _source = any();
    const _args = any();
    const _context = any();
    const _info = any();
    const _returnValue = any();

    const instance = resolver<
      CustomSource,
      CustomReturn,
      CustomArgs,
      CustomContext
    >((source, args, context, info) => {
      expect(source).toEqual(_source);
      expect(args).toEqual(_args);
      expect(context).toEqual(_context);
      expect(info).toEqual(_info);
      fn(_returnValue);
      return _returnValue;
    });

    const returnValue = await instance(_source, _args, _context, _info);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(_returnValue);
    expect(returnValue).toEqual(_returnValue);
  });
});
