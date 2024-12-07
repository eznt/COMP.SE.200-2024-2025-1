import { expect } from "chai";
import reduce from "../src/reduce.js";

describe("reduce function", () => {
  // Positive test cases
  it("should reduce an array to a single value with an initial accumulator", () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
    expect(result).to.equal(6);
  });

  it("should use the first element as the initial accumulator if not provided", () => {
    const result = reduce([1, 2, 3], (product, n) => product * n);
    expect(result).to.equal(6); // 1 * 2 * 3
  });

  it("should reduce an object to a single value with an initial accumulator", () => {
    const result = reduce(
      { a: 1, b: 2, c: 1 },
      (result, value, key) => {
        (result[value] || (result[value] = [])).push(key);
        return result;
      },
      {}
    );
    expect(result).to.deep.equal({ 1: ["a", "c"], 2: ["b"] });
  });

  it("should reduce an object to a single value without an initial accumulator", () => {
    const result = reduce({ a: 2, b: 3, c: 4 }, (sum, value) => sum + value);
    expect(result).to.equal(9); // 2 + 3 + 4
  });

  it("should handle strings as collections", () => {
    const result = reduce("hello", (acc, char) => acc + char.toUpperCase(), "");
    expect(result).to.equal("HELLO");
  });

  // Edge cases
  it("should handle an empty array with an initial accumulator", () => {
    const result = reduce([], (sum, n) => sum + n, 0);
    expect(result).to.equal(0);
  });

  it("should throw an error for an empty array without an initial accumulator", () => {
    expect(() => reduce([], (sum, n) => sum + n)).to.throw();
  });

  it("should handle empty objects with an initial accumulator", () => {
    const result = reduce({}, (sum, value) => sum + value, 0);
    expect(result).to.equal(0);
  });

  it("should throw an error for empty objects without an initial accumulator", () => {
    expect(() => reduce({}, (sum, value) => sum + value)).to.throw();
  });

  it("should handle arrays with mixed data types", () => {
    const result = reduce(
      [1, "2", null, undefined, true],
      (acc, value) => acc + (typeof value === "number" ? value : 0),
      0
    );
    expect(result).to.equal(1); // Only 1 is added
  });

  // Negative test cases
  it("should throw an error if the collection is not iterable", () => {
    expect(() => reduce(42, (sum, n) => sum + n, 0)).to.throw();
    expect(() => reduce(true, (sum, n) => sum + n, 0)).to.throw();
  });

  it("should throw an error if iteratee is not a function", () => {
    expect(() => reduce([1, 2, 3], null, 0)).to.throw();
    expect(() => reduce([1, 2, 3], undefined, 0)).to.throw();
    expect(() => reduce([1, 2, 3], "not a function", 0)).to.throw();
  });

  // Special cases
  it("should reduce sparse arrays by skipping undefined elements", () => {
    const sparseArray = [1, , 3]; // Sparse array
    const result = reduce(sparseArray, (sum, n) => sum + (n || 0), 0);
    expect(result).to.equal(4); // 1 + 3
  });

  it("should handle `null` or `undefined` values gracefully if initial accumulator is provided", () => {
    expect(reduce(null, (sum, n) => sum + n, 0)).to.equal(0);
    expect(reduce(undefined, (sum, n) => sum + n, 0)).to.equal(0);
  });

  it("should handle strings with initial accumulators", () => {
    const result = reduce("123", (acc, char) => acc + parseInt(char), 0);
    expect(result).to.equal(6); // 1 + 2 + 3
  });

  it("should handle Maps and Sets correctly", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const mapResult = reduce(map, (sum, value) => sum + value, 0);
    expect(mapResult).to.equal(6); // 1 + 2 + 3

    const set = new Set([1, 2, 3]);
    const setResult = reduce(set, (product, value) => product * value, 1);
    expect(setResult).to.equal(6); // 1 * 2 * 3
  });

  it("should pass the correct arguments to the iteratee", () => {
    const array = [10, 20, 30];
    const result = [];
    reduce(
      array,
      (acc, value, index, collection) => {
        result.push({ acc, value, index, collection });
        return acc + value;
      },
      0
    );
    expect(result).to.deep.equal([
      { acc: 0, value: 10, index: 0, collection: array },
      { acc: 10, value: 20, index: 1, collection: array },
      { acc: 30, value: 30, index: 2, collection: array },
    ]);
  });
});
