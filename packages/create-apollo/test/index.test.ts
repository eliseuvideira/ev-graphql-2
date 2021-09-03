const hash = () => "" + Date.now() + Math.random();

const any = () => ({ [hash()]: hash() } as any);

const _createApollo = any();

jest.mock("../src/functions/createApollo", () => ({
  createApollo: _createApollo,
}));

describe("apollo", () => {
  it("exports createApollo package", () => {
    expect.assertions(1);

    const exported = require("../src/index");

    expect(exported).toEqual({ createApollo: _createApollo });
  });
});
