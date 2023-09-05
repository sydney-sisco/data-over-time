import { expect, test } from 'vitest'
import reducer from "./application";

test("thows an error with an unsupported type", () => {
  expect(() => reducer({}, { type: null })).toThrowError(/tried to reduce with unsupported action type/i)
});

test("SET_CATEGORY deletes a category when category is null", () => {
  const state = {
    categories: {
      "1": { name: "abc"},
      "2": { name: "def"}
    }
  };

  const action = { type: "SET_CATEGORY", id: "1", category: null };

  const result = reducer(state, action);

  expect(result).toEqual({
    categories: {
      "2": { name: "def"}
    }
  });
});

test("SET_CATEGORY correctly adds a category", () => {
  const state = {
    categories: {
      "1": { name: "abc"},
      "2": { name: "def"}
    }
  };

  const action = { type: "SET_CATEGORY", id: null, category: { name: "ghi" } };

  const result = reducer(state, action);

  expect(Object.keys(result.categories).length).toEqual(3);
});

test("SET_CATEGORY correctly updates a category", () => {
  const state = {
    categories: {
      "1": { name: "abc"},
      "2": { name: "def"}
    }
  };

  const action = { type: "SET_CATEGORY", id: "2", category: { name: "deff" } };

  const result = reducer(state, action);

  expect(result).toEqual({
    categories: {
      "1": { name: "abc"},
      "2": { name: "deff"}
    }
  });
});

test("ADD_ENTRY correctly adds an entry", () => {
  const state = {
    entries: [
      { id: 1, name: "a"},
      { id: 2, name: "b"}
    ]
  };

  const action = { type: "ADD_ENTRY", entry: { id: 3, name: "c" } };

  const result = reducer(state, action);

  expect(result).toEqual({
    entries: [
      { id: 3, name: "c"},
      { id: 1, name: "a"},
      { id: 2, name: "b"}
    ]
  });
});
