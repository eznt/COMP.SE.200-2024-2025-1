import { expect } from "chai";
import isEmpty from "../src/isEmpty.js";

describe("isEmpty function", () => {
  // Positive test cases
  it("should return true for null", () => {
    expect(isEmpty(null)).to.be.true;
  });

  it("should return true for undefined", () => {
    expect(isEmpty(undefined)).to.be.true;
  });

  it("should return true for boolean values", () => {
    expect(isEmpty(true)).to.be.true;
    expect(isEmpty(false)).to.be.true;
  });

  it("should return true for numbers", () => {
    expect(isEmpty(0)).to.be.true;
    expect(isEmpty(42)).to.be.true;
    expect(isEmpty(NaN)).to.be.true;
    expect(isEmpty(Infinity)).to.be.true;
  });

  it("should return true for empty strings", () => {
    expect(isEmpty("")).to.be.true;
  });

  it("should return false for non-empty strings", () => {
    expect(isEmpty("abc")).to.be.false;
    expect(isEmpty(" ")).to.be.false; // String with a space
  });

  it("should return true for empty arrays", () => {
    expect(isEmpty([])).to.be.true;
  });

  it("should return false for non-empty arrays", () => {
    expect(isEmpty([1, 2, 3])).to.be.false;
    expect(isEmpty([undefined])).to.be.false;
  });

  it("should return true for empty objects", () => {
    expect(isEmpty({})).to.be.true;
  });

  it("should return false for non-empty objects", () => {
    expect(isEmpty({ a: 1 })).to.be.false;
  });

  it("should return true for empty Maps and Sets", () => {
    expect(isEmpty(new Map())).to.be.true;
    expect(isEmpty(new Set())).to.be.true;
  });

  it("should return false for non-empty Maps and Sets", () => {
    const map = new Map();
    map.set("key", "value");
    const set = new Set();
    set.add(1);
    expect(isEmpty(map)).to.be.false;
    expect(isEmpty(set)).to.be.false;
  });

  // Edge cases
  it("should return true for empty arguments object", () => {
    (function () {
      expect(isEmpty(arguments)).to.be.true;
    })();
  });

  it("should return false for non-empty arguments object", () => {
    (function () {
      expect(isEmpty(arguments)).to.be.false;
    })(1, 2, 3);
  });

  it("should return true for empty buffers", () => {
    const buffer = Buffer.alloc(0);
    expect(isEmpty(buffer)).to.be.true;
  });

  it("should return false for non-empty buffers", () => {
    const buffer = Buffer.from("abc");
    expect(isEmpty(buffer)).to.be.false;
  });

  it("should return true for sparse arrays with no elements", () => {
    const sparseArray = Array(3);
    expect(isEmpty(sparseArray)).to.be.true;
  });

  it("should return false for sparse arrays with some elements", () => {
    const sparseArray = [1, , 3]; // Sparse array
    expect(isEmpty(sparseArray)).to.be.false;
  });

  // Negative test cases
  it("should return false for objects with inherited properties", () => {
    const proto = { inherited: 1 };
    const obj = Object.create(proto);
    expect(isEmpty(obj)).to.be.true; // No own properties
    obj.own = 1;
    expect(isEmpty(obj)).to.be.false; // Has own properties
  });

  it("should handle special objects like Date", () => {
    const date = new Date();
    expect(isEmpty(date)).to.be.false; // Date objects are not considered empty
  });

  it("should return false for custom objects with size or length", () => {
    const custom = { length: 0, size: 0 };
    expect(isEmpty(custom)).to.be.false; // Own enumerable properties
  });

  it("should return true for Symbol", () => {
    expect(isEmpty(Symbol("test"))).to.be.true;
  });

  it("should return true for BigInt", () => {
    expect(isEmpty(BigInt(10))).to.be.true;
  });

  // Special cases
  it("should handle circular references gracefully", () => {
    const circular = {};
    circular.self = circular;
    expect(isEmpty(circular)).to.be.false; // Contains a property
  });

  it("should return false for non-empty strings in objects", () => {
    const obj = { key: "value" };
    expect(isEmpty(obj)).to.be.false;
  });

  it("should return true for objects with no enumerable properties", () => {
    const obj = Object.create(null); // No prototype
    expect(isEmpty(obj)).to.be.true;
  });

  it("should return true for an object that is its own prototype", () => {
    const objectProto = Object.prototype;
    expect(isEmpty(objectProto)).to.be.true;
  });
});
