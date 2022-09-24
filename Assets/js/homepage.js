var userIngredientsInput = $("#inputingredients");
var ingredientSubmit = $("#ingredientBtn");
console.log(ingredientBtn);
console.log(userIngredientsInput);
console.log(userIngredientsInput.val());
var userInput;
var forSearch;
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
  console.log(forSearch);
  console.log(userInput)
  // searchFoodApi();
  var pushToApi = userInput.split(" ");
  console.log(pushToApi);
//   const foodOptions = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3edfd13894msh663a8d5ce798f38p1cf2e4jsn7b8ca7705e2a',
// 		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
// 	}
// };

// fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=test&number=20&ignorePantry=false', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
creatListItem(pushToApi);

});

var ingredientListEl = $('#ingredient-list');

//display list of items the user inputs
function creatListItem(pushToApi){
  for (var i = 0; i < pushToApi.length; i++) {
    ingredientListEl.append('<li>'+ pushToApi[i] + '</li>');
    //clear input field
    $('input[name="ingredient-input"]').val('');
  }

}