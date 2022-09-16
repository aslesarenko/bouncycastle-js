const {
  bouncyCastle,
  createByteArrayFromData,
  createByteArray,
} = require("../../target/generated/js/teavm/classes.js");

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

  it("createBlake2bDigest() should return digest with methods", () => {
    var digest = bouncyCastle.createBlake2bDigest(32 * 8);
    expect(digest).not.toBeNull();
    digest.$update(createByteArrayFromData([1, 2, 3]), 0, 3);
    var res = createByteArray(32);
    digest.$doFinal(res, 0);
    expect(res).not.toBeNull();
    expect(res).toEqual(
      createByteArrayFromData([
        17, -64, -25, -101, 113, -61, -105, 108, -51, 12, 2, -47, 49, 14, 37,
        22, -64, -114, -36, -99, -117, 111, 87, -52, -42, -128, -42, 58, 77,
        -114, 114, -38,
      ])
    );
  });
});
