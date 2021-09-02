import { createApollo } from "../src/functions/createApollo";

describe("createApollo", () => {
  it("creates an apollo server instance", () => {
    expect.assertions(1);

    const apollo = createApollo();

    expect(apollo).toBeDefined();
  });
});
