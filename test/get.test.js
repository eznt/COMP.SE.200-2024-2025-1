import { expect } from "chai";
import get from "../src/get.js";

describe("get function", () => {
  // Positive test cases
  it("should return the value at the specified path in an object", () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, "a[0].b.c")).to.equal(3);
    expect(get(object, ["a", "0", "b", "c"])).to.equal(3);
  });

  it("should return the default value if the resolved value is undefined", () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, "a.b.c", "default")).to.equal("default");
  });

  it("should handle paths with array indices correctly", () => {
    const object = { a: [{ b: { c: 3 } }, { b: { c: 4 } }] };
    expect(get(object, "a[1].b.c")).to.equal(4);
  });

  it("should return default if an empty path is provided", () => {
    const object = { a: 1 };
    expect(get(object, "", "default")).to.equal("default");
  });

  // Edge cases
  it("should return undefined for nonexistent paths without a default value", () => {
    const object = { a: 1 };
    expect(get(object, "b.c")).to.be.undefined;
  });

  it("should handle deeply nested paths gracefully", () => {
    const object = { a: { b: { c: { d: { e: { f: 42 } } } } } };
    expect(get(object, "a.b.c.d.e.f")).to.equal(42);
    expect(get(object, ["a", "b", "c", "d", "e", "f"])).to.equal(42);
  });

  it("should handle null and undefined objects gracefully", () => {
    expect(get(null, "a.b.c", "default")).to.equal("default");
    expect(get(undefined, "a.b.c", "default")).to.equal("default");
  });

  it("should return undefined for invalid path types (e.g., numbers)", () => {
    const object = { a: 1 };
    expect(get(object, 42)).to.be.undefined;
  });

  it("should handle default values of different types", () => {
    const object = { a: 1 };
    expect(get(object, "b", 42)).to.equal(42);
    expect(get(object, "b", null)).to.equal(null);
    expect(get(object, "b", false)).to.equal(false);
  });

  // Negative test cases
  it("should throw an error for invalid objects (non-objects)", () => {
    expect(() => get(42, "a.b.c")).to.throw();
    expect(() => get("string", "a.b.c")).to.throw();
    expect(() => get(true, "a.b.c")).to.throw();
  });

  it("should handle circular references without causing infinite loops", () => {
    const circular = {};
    circular.self = circular;
    expect(get(circular, "self.self.self", "default")).to.equal(circular);
  });

  it("should return undefined for empty objects even with valid paths", () => {
    const emptyObject = {};
    expect(get(emptyObject, "a.b.c")).to.be.undefined;
  });

  it("should return undefined if the path cannot be resolved", () => {
    const object = { a: { b: 1 } };
    expect(get(object, "a.x.y.z")).to.be.undefined;
  });

  it("should handle invalid paths gracefully (e.g., boolean or null as path)", () => {
    const object = { a: { b: 1 } };
    expect(get(object, true)).to.be.undefined;
    expect(get(object, null)).to.be.undefined;
  });

  // Special cases
  it("should handle objects with prototype properties", () => {
    const object = Object.create({ inherited: "value" });
    expect(get(object, "inherited")).to.equal("value");
  });

  it("should handle symbols in object paths", () => {
    const sym = Symbol("key");
    const object = { [sym]: 42 };
    expect(get(object, sym)).to.equal(42);
  });

  it("should handle objects with sparse arrays", () => {
    const object = { a: [1, , 3] }; // Sparse array
    expect(get(object, "a[1]", "default")).to.equal("default");
  });
});
