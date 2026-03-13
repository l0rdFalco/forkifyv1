import {API_URL} from "./config.js"

export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    let res1 = await fetch(
      `${API_URL}${recipeId}`,
    );

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
    throw new Error(`loadRecipe error: ${error}`)
  }
};
