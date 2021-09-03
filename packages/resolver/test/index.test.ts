const hash = () => "" + Date.now() + Math.random();

const any = () => ({ [hash()]: hash() } as any);

const _createResolver = any();

jest.mock("../src/functions/createResolver", () => ({
  createResolver: _createResolver,
}));

describe("createResolver", () => {
  it("exports createResolver package", () => {
    expect.assertions(1);

    const exported = require("../src/index");

    expect(exported).toEqual({ createResolver: _createResolver });
  });
});
