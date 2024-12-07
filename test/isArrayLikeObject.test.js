import { expect } from "chai";
import isArrayLikeObject from "../src/isArrayLikeObject.js";

describe("isArrayLikeObject function", () => {
  // Positive test cases
  it("should return true for arrays", () => {
    expect(isArrayLikeObject([1, 2, 3])).to.be.true;
  });

  it("should return true for array-like objects such as `arguments`", () => {
    (function () {
      expect(isArrayLikeObject(arguments)).to.be.true;
    })(1, 2, 3);
  });

  it("should return true for NodeList or HTMLCollection", () => {
    if (typeof document !== "undefined") {
      const children = document.body.children;
      expect(isArrayLikeObject(children)).to.be.true;
    }
  });

  it("should return true for objects with `length` property and numeric indices", () => {
    const customArrayLike = { 0: "a", 1: "b", length: 2 };
    expect(isArrayLikeObject(customArrayLike)).to.be.true;
  });

  // Edge cases
  it("should return false for strings", () => {
    expect(isArrayLikeObject("abc")).to.be.false;
  });

  it("should return false for functions", () => {
    expect(isArrayLikeObject(function () {})).to.be.false;
    expect(isArrayLikeObject(() => {})).to.be.false;
  });

  it("should return false for objects without a `length` property", () => {
    expect(isArrayLikeObject({ a: 1, b: 2 })).to.be.false;
  });

  it("should return false for objects with a non-numeric `length` property", () => {
    const invalidArrayLike = { 0: "a", 1: "b", length: "2" };
    expect(isArrayLikeObject(invalidArrayLike)).to.be.false;
  });

  it("should return false for objects with a negative `length` property", () => {
    const invalidArrayLike = { 0: "a", 1: "b", length: -1 };
    expect(isArrayLikeObject(invalidArrayLike)).to.be.false;
  });

  it("should return false for objects with a `length` property that is not an integer", () => {
    const invalidArrayLike = { 0: "a", 1: "b", length: 1.5 };
    expect(isArrayLikeObject(invalidArrayLike)).to.be.false;
  });

  // Negative test cases
  it("should return false for null", () => {
    expect(isArrayLikeObject(null)).to.be.false;
  });

  it("should return false for undefined", () => {
    expect(isArrayLikeObject(undefined)).to.be.false;
  });

  it("should return false for plain numbers", () => {
    expect(isArrayLikeObject(123)).to.be.false;
  });

  it("should return false for booleans", () => {
    expect(isArrayLikeObject(true)).to.be.false;
    expect(isArrayLikeObject(false)).to.be.false;
  });

  it("should return false for symbols", () => {
    expect(isArrayLikeObject(Symbol("test"))).to.be.false;
  });

  it("should return false for BigInts", () => {
    expect(isArrayLikeObject(BigInt(10))).to.be.false;
  });

  it("should return false for arrays created with `Object.create(null)`", () => {
    const nullProtoArrayLike = Object.create(null);
    nullProtoArrayLike[0] = "a";
    nullProtoArrayLike[1] = "b";
    nullProtoArrayLike.length = 2;
    expect(isArrayLikeObject(nullProtoArrayLike)).to.be.false;
  });

  // Special cases
  it("should return false for objects with length property but no numeric indices", () => {
    const invalidArrayLike = { length: 2 };
    expect(isArrayLikeObject(invalidArrayLike)).to.be.false;
  });

  it("should return true for arrays with sparse elements", () => {
    const sparseArray = [1, , 3]; // Sparse array
    expect(isArrayLikeObject(sparseArray)).to.be.true;
  });
});
