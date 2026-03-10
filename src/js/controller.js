import 'core-js/stable'     // Polyfills Promise, fetch, etc.
import 'regenerator-runtime/runtime'  // Makes async/await work in older browsers

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


if (module.hot) module.hot.accept();


const showRecipe = async function(){

  try {
    
    let res1 = await fetch("https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886")

    if(!res1.ok) throw new Error("couldn't fetch recipe")
    let {data} = await res1.json()
    
    let {recipe:recipeObj} = data
    
    recipeObj = {
      id:recipeObj.id,
      title:recipeObj.title,
      publisher:recipeObj.publisher,
      sourceUrl:recipeObj.source_url,
      img:recipeObj.image_url,
      servings:recipeObj.servings,
      cookingTime:recipeObj.cooking_time,
      ingredients:recipeObj.ingredients
    }

    console.log(recipeObj);
  } catch (error) {
    console.log("showRecipe Error: ", error);
  }

}

showRecipe()

