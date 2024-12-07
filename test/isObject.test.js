import { expect } from "chai";
import isObject from "../src/isObject.js";

describe("isObject function", () => {
  // Positive cases
  it("should return true for plain objects", () => {
    expect(isObject({})).to.be.true;
  });

  it("should return true for arrays", () => {
    expect(isObject([1, 2, 3])).to.be.true;
  });

  it("should return true for functions", () => {
    expect(isObject(() => {})).to.be.true;
    expect(isObject(function () {})).to.be.true;
  });

  it("should return true for object wrappers (e.g., new Number, new String)", () => {
    expect(isObject(new Number(0))).to.be.true;
    expect(isObject(new String(""))).to.be.true;
  });

  it("should return true for regex objects", () => {
    expect(isObject(/abc/)).to.be.true;
    expect(isObject(new RegExp("abc"))).to.be.true;
  });

  // Edge cases
  it("should return false for null", () => {
    expect(isObject(null)).to.be.false;
  });

  it("should return false for undefined", () => {
    expect(isObject(undefined)).to.be.false;
  });

  it("should return false for primitive values", () => {
    expect(isObject(42)).to.be.false;
    expect(isObject("string")).to.be.false;
    expect(isObject(true)).to.be.false;
  });

  it("should handle special numbers (e.g., Infinity, NaN)", () => {
    expect(isObject(Infinity)).to.be.false;
    expect(isObject(NaN)).to.be.false;
  });

  // Negative cases
  it("should return false for non-values like symbols and bigints", () => {
    expect(isObject(Symbol("symbol"))).to.be.false;
    expect(isObject(BigInt(10))).to.be.false;
  });

  it("should return false for null", () => {
    expect(isObject(null)).to.be.false; // Important edge case
  });

  it("should return false for primitive values", () => {
    expect(isObject(42)).to.be.false;
    expect(isObject("text")).to.be.false;
    expect(isObject(true)).to.be.false;
  });

  it("should return false for special numbers like Infinity and NaN", () => {
    expect(isObject(Infinity)).to.be.false;
    expect(isObject(NaN)).to.be.false;
  });
});
