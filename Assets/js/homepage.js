var userIngredientsInput = $("#inputingredients");
var ingredientSubmit = $("#ingredientBtn");
console.log(ingredientBtn);
console.log(userIngredientsInput);
console.log(userIngredientsInput.val());
var userInput;
var forSearch;
var pushToApi;
var response;
var responses;
// const drinkOptions = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3edfd13894msh663a8d5ce798f38p1cf2e4jsn7b8ca7705e2a',
// 		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
// 	}
// };

// fetch('https://the-cocktail-db.p.rapidapi.com/search.php?s=vodka', drinkOptions)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// run event on click for the ingredient submit button
$(".form-inline").on("click", "#ingredientBtn", function (event) {
  event.preventDefault();

  userInput = $(this).siblings("#inputingredients").val();

  localStorage.setItem("userInput", JSON.stringify(userInput));
  forSearch = JSON.parse(localStorage.getItem("userInput"));
  pushToApi = userInput.split(" ");
  userInput.replace(" ", ",");
  console.log(userInput);
creatListItem(pushToApi);
getRecipes(userInput);
});

function getRecipes(ingredients) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3edfd13894msh663a8d5ce798f38p1cf2e4jsn7b8ca7705e2a',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

   fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + ingredients + "&number=5&ignorePantry=true&ranking=1", options)
      .then(function(response) { return response.json()})
      .then(function(data) { 
        console.log('data', data)
        responses = data
        console.log('responses', responses)
        displayRecipes(data)
      })
      .catch(err => console.error(err));
}

// Function to populate screen with recipes found
function displayRecipes(recipes) {
  console.log('recipes', recipes)
  // console.log('responses', responses)
  recipes.forEach(function(recipe) {
    console.log(recipe.title)
    recipe.usedIngredients.forEach(function(usedIng) {
      console.log(usedIng.originalName)
    })
  })

}

const userOptions = getRecipes;
console.log(userOptions)

var ingredientListEl = $('#ingredient-list');

//display list of items the user inputs
function creatListItem(pushToApi){
  for (var i = 0; i < pushToApi.length; i++) {
    ingredientListEl.append('<li>'+ pushToApi[i] + '</li>');
    //clear input field
    $('input[name="ingredient-input"]').val('');
  }


}

}


// cocktail section
var drinkInput = $("#inputdrinks");
var drinkSubmit = $("drinkBtn");
console.log(drinkSubmit);
console.log(drinkInput);
console.log(drinkInput.val());

$(".form-inline").on("click", "#drinkBtn", function (event) {
  event.preventDefault();

  userInput = $(this).siblings("#inputdrinks").val();

  localStorage.setItem("userInput", JSON.stringify(userInput));
  forSearch = JSON.parse(localStorage.getItem("userInput"));
  pushToApi = userInput.split(" ");
  userInput.replace(" ", ",");
  console.log(userInput);
creatListItem(pushToApi);
getRecipes(userInput);
});

