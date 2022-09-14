const bouncyCastle = require("../../target/generated/js/teavm/classes.js");

describe("Smoke tests for API binding", () => {
  it("Should have interpolate() method", () => {
    expect(bouncyCastle.interpolate).not.toBeUndefined();
  });

  it("Should have fromByteArray() method", () => {
    expect(bouncyCastle.fromByteArray).not.toBeUndefined();
  });

  it("Should have create_GF_192() method", () => {
    expect(bouncyCastle.create_GF_192).not.toBeUndefined();
  });

  it("Should have createBlake2bDigest() method", () => {
    expect(bouncyCastle.createBlake2bDigest).not.toBeUndefined();
  });
});
