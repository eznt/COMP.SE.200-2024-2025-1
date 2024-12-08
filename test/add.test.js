import { expect } from "chai";
import add from "../src/add.js";

describe("add.js - Unit Tests", () => {
  // Positive cases
  it("should add two positive integers", () => {
    expect(add(6, 4)).to.equal(10);
  });

  it("should add a positive integer and zero", () => {
    expect(add(6, 0)).to.equal(6);
  });

  it("should add two zeros", () => {
    expect(add(0, 0)).to.equal(0);
  });

  it("should add a positive and a negative number", () => {
    expect(add(6, -4)).to.equal(2);
  });

  it("should handle decimal numbers with two decimal places", () => {
    expect(add(10.5, 20.25)).to.equal(30.75);
  });

  it("should add two negative numbers", () => {
    expect(add(-6, -4)).to.equal(-10);
  });

  it("should add a negative number and zero", () => {
    expect(add(-6, 0)).to.equal(-6);
  });

  it("should return the given value when only one argument is provided", () => {
    expect(add(6)).to.equal(6);
  });

  it("should return zero when no arguments are provided", () => {
    expect(add()).to.equal(0);
  });

  it("should be able to add together string representations of numbers", () => {
    expect(add("6", "4")).to.equal(10);
  });

  it("should be able to add together string representation of number and integer", () => {
    expect(add("6", 4)).to.equal(10);
  });


  // Edge cases
  it("should handle very large numbers", () => {
    expect(add(1e12, 1e12)).to.equal(2e12);
  });

  it("should handle very small floating-point numbers", () => {
    expect(add(1e-12, 1e-12)).to.be.closeTo(2e-12, 0.0000001);
  });

  it("should return Infinity when adding Infinity to a number", () => {
    expect(add(Infinity, 1)).to.equal(Infinity);
  });

  it("should return NaN when adding Infinity and -Infinity", () => {
    expect(add(Infinity, -Infinity)).to.be.NaN;
  });

  // Negative cases
  it("should return NaN for invalid input types", () => {
    expect(add(3, {"foo":"bar"})).to.be.NaN;
  });

  it("should return NaN for symbol input types", () => {
    const sym = Symbol.for("1");
    expect(add(sym, 1)).to.be.NaN;
  });

  it("should return NaN for NaN input type", () => {
    expect(add(3, NaN)).to.be.NaN;
  });
});
