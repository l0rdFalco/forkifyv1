import "core-js/stable"; // Polyfills Promise, fetch, etc.
import "regenerator-runtime/runtime"; // Makes async/await work in older browsers

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

if (module.hot) module.hot.accept();



const controlRecipe = async function () {
  try {
    let recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);

    recipeView.render(model.state.recipe)

  } catch (error) {
    console.log("showRecipe Error: ", error);
  }
};

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, controlRecipe));
