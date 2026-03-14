import { API_URL } from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: []
  }
};

export const loadRecipe = async function (recipeId) {
  try {
    let res1 = await fetch(`${API_URL}${recipeId}`);

    if (!res1.ok) throw new Error("couldn't fetch recipe");
    let { data } = await res1.json();

    let { recipe: recipeObj } = data;

    state.recipe = {
      id: recipeObj.id,
      title: recipeObj.title,
      publisher: recipeObj.publisher,
      sourceUrl: recipeObj.source_url,
      image: recipeObj.image_url,
      servings: recipeObj.servings,
      cookingTime: recipeObj.cooking_time,
      ingredients: recipeObj.ingredients,
    };
  } catch (error) {
    console.log("loadRecipe error: ", error);
    throw new Error(error);
  }
};

export const loadSearchResults = async function (query) {
  try {
    let res1 = await fetch(`${API_URL}?search=${query}`);

    if (!res1.ok) throw new Error("couldn't fetch recipes");
    let { data } = await res1.json();

    let { recipes: recipesArr } = data;

    recipesArr = recipesArr.map((rec) => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });

    state.search.query = query;
    state.search.results = recipesArr;

  } catch (error) {
    console.log("loadSearchResults error:", error);
    throw new Error(error);
  }
};
