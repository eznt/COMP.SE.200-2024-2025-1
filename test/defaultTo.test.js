import { expect } from "chai";
import defaultTo from "../src/defaultTo.js";

describe("defaultTo function", () => {
  // Positive test cases
  it("should return the provided value if it is not NaN, null, or undefined", () => {
    expect(defaultTo(1, 10)).to.equal(1);
    expect(defaultTo("value", "default")).to.equal("value");
    expect(defaultTo(false, true)).to.equal(false);
  });

  it("should return the default value if the provided value is undefined", () => {
    expect(defaultTo(undefined, 10)).to.equal(10);
    expect(defaultTo(undefined, "default")).to.equal("default");
  });

  it("should return the default value if the provided value is null", () => {
    expect(defaultTo(null, 10)).to.equal(10);
  });

  it("should return the default value if the provided value is NaN", () => {
    expect(defaultTo(NaN, 10)).to.equal(10);
  });

  // Edge cases
  it("should return the default value if the provided value is explicitly `undefined`", () => {
    expect(defaultTo(undefined, 0)).to.equal(0);
  });

  it("should handle objects and arrays correctly", () => {
    const obj = { key: "value" };
    const arr = [1, 2, 3];
    expect(defaultTo(obj, {})).to.equal(obj);
    expect(defaultTo(arr, [])).to.equal(arr);
  });

  it("should handle falsy values other than NaN, null, or undefined", () => {
    expect(defaultTo(0, 100)).to.equal(0); // 0 is falsy but valid
    expect(defaultTo("", "default")).to.equal(""); // Empty string is falsy but valid
    expect(defaultTo(false, true)).to.equal(false); // False is falsy but valid
  });

  it("should return the default value if the first argument is a result of invalid math", () => {
    expect(defaultTo(0 / 0, "default")).to.equal("default"); // 0/0 results in NaN
  });

  it("should handle default values that are functions or objects", () => {
    const defaultFunc = () => "default";
    const defaultObj = { key: "default" };
    expect(defaultTo(null, defaultFunc)).to.equal(defaultFunc);
    expect(defaultTo(undefined, defaultObj)).to.equal(defaultObj);
  });

  // Negative test cases
  it("should return the default value if the first argument is explicitly NaN", () => {
    expect(defaultTo(NaN, 42)).to.equal(42);
  });

  it("should throw an error if the default value is missing", () => {
    expect(() => defaultTo(null)).to.throw();
  });

  it("should not coerce non-NaN, null, or undefined values to default", () => {
    expect(defaultTo("valid", "default")).to.equal("valid");
    expect(defaultTo(true, false)).to.equal(true);
    expect(defaultTo([], ["default"])).to.deep.equal([]);
  });

  // Special cases
  it("should return undefined if both the value and default are undefined", () => {
    expect(defaultTo(undefined, undefined)).to.be.undefined;
  });

  it("should handle default values that are falsy", () => {
    expect(defaultTo(undefined, "")).to.equal("");
    expect(defaultTo(null, 0)).to.equal(0);
    expect(defaultTo(NaN, false)).to.equal(false);
  });

  it("should return the same value when the value is valid and equal to the default", () => {
    expect(defaultTo(42, 42)).to.equal(42);
    expect(defaultTo("default", "default")).to.equal("default");
  });
});
