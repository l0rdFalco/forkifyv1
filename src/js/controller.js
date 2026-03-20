import "core-js/stable"; // Polyfills Promise, fetch, etc.
import "regenerator-runtime/runtime"; // Makes async/await work in older browsers

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";

if (module.hot) module.hot.accept();

const controlRecipe = async function () {
  try {
    let recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);

    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log("controlRecipe error: ", error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    let searchQuery = searchView.getQuery();

    await model.loadSearchResults(searchQuery);

    let resultsArr = model.state.search.results;

    if (resultsArr.length === 0 || !resultsArr)
      throw new Error("no recipes for that query");

    //resultsView.render(resultsArr)// renders all results
    resultsView.render(model.getSearchResultsPage()); // renders paginated results

    //rebder pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log("controlSearchResults error:", error);
    resultsView.renderError(error);
  }
};

const controlPagination = function (page) {
  console.log("page:", page);
  resultsView.render(model.getSearchResultsPage(page)); // renders paginated results

  paginationView.render(model.state.search);
};

const controlServings = function (newServingsVal) {
  /**
   * 1. update the recipe servings in the state
   * 2. update the recipeView
   */

  model.updateServings(newServingsVal);
  recipeView.render(model.state.recipe); // inefficient to rerender the whole page on each update
};

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings)
}

init();
