import "core-js/stable"; // Polyfills Promise, fetch, etc.
import "regenerator-runtime/runtime"; // Makes async/await work in older browsers

import icons from "url:../img/icons.svg"; // parcel 1 doesnt need the url: part
const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

if (module.hot) module.hot.accept();

function generateMarkup(data) {
  return `
      <figure class="recipe__fig">
        <img src="${data.image}" alt="${data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${
              data.servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              data.servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${data.key ? "" : "hidden"}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
              data.bookmarked ? "-fill" : ""
            }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${data.ingredients.map(generateMarkupIngredient).join("")}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
}

function generateMarkupIngredient(ing) {
  return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ing.quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
}

function renderSpinner(parentEl) {
  const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
}

const showRecipe = async function () {
  try {
    let recipeId = window.location.hash.slice(1);

    if(!recipeId) return

    renderSpinner(recipeContainer);

    let res1 = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${recipeId}`,
    );

    if (!res1.ok) throw new Error("couldn't fetch recipe");
    let { data } = await res1.json();

    let { recipe: recipeObj } = data;

    recipeObj = {
      id: recipeObj.id,
      title: recipeObj.title,
      publisher: recipeObj.publisher,
      sourceUrl: recipeObj.source_url,
      image: recipeObj.image_url,
      servings: recipeObj.servings,
      cookingTime: recipeObj.cooking_time,
      ingredients: recipeObj.ingredients,
    };

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", generateMarkup(recipeObj));
  } catch (error) {
    console.log("showRecipe Error: ", error);
  }
};

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
