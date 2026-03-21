import { API_URL, RES_PER_PAGE } from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
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

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    state.search.query = query;
    state.search.results = recipesArr;
    state.search.page = 1;
  } catch (error) {
    console.log("loadSearchResults error:", error);
    throw new Error(error);
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * RES_PER_PAGE;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServingsNum) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServingsNum) / state.recipe.servings;
  });

  state.recipe.servings = newServingsNum;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

};
