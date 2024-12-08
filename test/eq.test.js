import { expect } from "chai";
import eq from "../src/eq.js";

describe("eq function", () => {
  // Positive test cases
  it("should return true for the same object reference", () => {
    const object = { a: 1 };
    expect(eq(object, object)).to.be.true;
  });

  it("should return false for different objects with the same structure", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(eq(obj1, obj2)).to.be.false;
  });

  it("should return true for identical primitive values", () => {
    expect(eq(42, 42)).to.be.true;
    expect(eq("hello", "hello")).to.be.true;
    expect(eq(true, true)).to.be.true;
  });

  it("should return true for `NaN` compared with `NaN`", () => {
    expect(eq(NaN, NaN)).to.be.true;
  });

  it("should return true for `0` and `-0`", () => {
    expect(eq(0, -0)).to.be.true; // SameValueZero treats these as equal
  });

  // Edge cases
  it("should return false for primitive values and their object wrappers", () => {
    expect(eq("a", Object("a"))).to.be.false;
    expect(eq(1, Object(1))).to.be.false;
    expect(eq(true, Object(true))).to.be.false;
  });

  it("should return true for undefined compared to undefined", () => {
    expect(eq(undefined, undefined)).to.be.true;
  });

  it("should return true for null compared to null", () => {
    expect(eq(null, null)).to.be.true;
  });

  it("should return false for null and undefined", () => {
    expect(eq(null, undefined)).to.be.false;
  });

  it("should return true for equal symbols", () => {
    const sym = Symbol("test");
    expect(eq(sym, sym)).to.be.true;
  });

  it("should return false for different symbols with the same description", () => {
    expect(eq(Symbol("test"), Symbol("test"))).to.be.false; // Symbol values are unique by reference
  });

  // Negative cases
  it("should return false for objects with the same contents but different references", () => {
    const obj1 = { a: [1, 2, 3] };
    const obj2 = { a: [1, 2, 3] };
    expect(eq(obj1, obj2)).to.be.false;
  });

  it("should return false for arrays with the same elements but different references", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(eq(arr1, arr2)).to.be.false;
  });

  it("should return false for functions, even if they are structurally identical", () => {
    const func1 = () => {};
    const func2 = () => {};
    expect(eq(func1, func2)).to.be.false;
  });

  // Smart cases (uncommon but valid scenarios)
  it("should handle sparse arrays correctly", () => {
    const sparseArray = [1, , 3];
    const denseArray = [1, undefined, 3];
    expect(eq(sparseArray, denseArray)).to.be.false; // Sparse and dense are not equivalent
  });

  it("should return false for deeply nested structures with the same values but different references", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 1 } } };
    expect(eq(obj1, obj2)).to.be.false;
  });

  it("should return true for references to the same array", () => {
    const arr = [1, 2, 3];
    expect(eq(arr, arr)).to.be.true;
  });

  it("should return true for deeply nested structures with identical references", () => {
    const shared = { c: 1 };
    const obj1 = { a: { b: shared } };
    const obj2 = { a: { b: shared } };
    expect(eq(obj1.a.b, obj2.a.b)).to.be.true;
  });

  it("should handle circular references gracefully", () => {
    const circular1 = {};
    circular1.self = circular1;

    const circular2 = {};
    circular2.self = circular2;

    expect(eq(circular1, circular2)).to.be.false; // Different references
    expect(eq(circular1, circular1)).to.be.true; // Same reference
  });

  // Special cases
  it("should return false for int and its string representation", () => {
    expect(eq(42, "42")).to.be.false;
  });

  it("should return false for int and its boolean representation", () => {
    expect(eq(false, 0)).to.be.false;
    expect(eq(true, 1)).to.be.false;
  });


  it("should handle BigInt values correctly", () => {
    expect(eq(BigInt(123), BigInt(123))).to.be.true;
    expect(eq(BigInt(123), 123)).to.be.false;
  });

});
