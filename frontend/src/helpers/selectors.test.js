import { expect, test } from 'vitest'
import { getCategoriesForList } from "./selectors";

const state = {
  categories: {
    "1": {
      name: "Caffeine",
      fields: ["Caffeine Content (mg)", "Source"],
      presets: [
        {
          name: "Office Coffee",
          values: {"Caffeine Content (mg)": 100, "Source": "Coffee"}
        },
        {
          name: "Rockstar",
          values: {"Caffeine Content (mg)": 160, "Source": "Energy Drink"}
        },
      ]
    },
    "2": {
      name: "Sleep",
      fields: ["Duration (hrs)", "Quality"],
      presets: [
        {
          name: "Good Sleep",
          values: {"Duration (hrs)": 8, "Quality": "Good"}
        },
        {
          name: "Bad Sleep",
          values: {"Duration (hrs)": 8, "Quality": "Bad"}
        },
      ]
    },
  },
};

test("getCategoriesForList returns an array", () => {
  const result = getCategoriesForList(state);
  expect(Array.isArray(result)).toBe(true);
});

test("getCategoriesForList returns an array with a length matching the number of categories", () => {
  const result = getCategoriesForList(state);
  expect(result.length).toEqual(2);
});
