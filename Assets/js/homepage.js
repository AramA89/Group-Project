var userIngredientsInput = $("#inputingredients");
var ingredientUl = $('#ingredient-list');

var userInput;
var pushIngrToApi;
var ingredientItemEl;
var response;
var responses;

// run event on click for the ingredient submit button
init();

// Ingredients + Drinks:
//set ingredient storage to an empty array when page is refreshed
function init(){
  pushIngrToApi = [];
  localStorage.setItem("userInput", JSON.stringify(pushIngrToApi));
}
//Ingredients:
//listens for the input click and assign value to userInput
$(".form-inline").on("click", "#ingredient-submit-btn", function (event) {
  event.preventDefault();

  userInput = $(this).siblings("#inputingredients").val();
// check to see if input includes space or comma. if value is not found method will return -1
  if (userInput.indexOf(',') !== -1){
    userInput = userInput.split(",");
    pushIngrToApi = pushIngrToApi.concat(userInput);
    localStorage.setItem("userInput", JSON.stringify(pushIngrToApi));
  } else if (userInput.indexOf(" ") !== -1){
    userInput = userInput.split(" ");
    pushIngrToApi = pushIngrToApi.concat(userInput);
    localStorage.setItem("userInput", JSON.stringify(pushIngrToApi));
  } else {
  pushIngrToApi = pushIngrToApi.concat(userInput);
  localStorage.setItem("userInput", JSON.stringify(pushIngrToApi));
}
  
creatListItem();
getRecipes(userInput);
});

var ingredientListEl = $('#ingredient-list');

//display list of items the user inputs
function creatListItem(){
  //first remove all listitems and create them again from the array
  $('#ingredient-list').empty();
  for (var i = 0; i < pushIngrToApi.length; i++) {
    ingredientItemEl = $('<li>')
    var ingText = $('<span>').text(pushIngrToApi[i]);
    ingredientItemEl.append(ingText)
    //add delete button
    ingredientItemEl.append('<button class="ml-2 mb-2 delete-btn">Remove</button>');
    ingredientUl.append(ingredientItemEl);
    //clear input field
    $('input[name="ingredient-input"]').val('');
  }
}

function handleRemoveIngrItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
var btnClicked = $(event.target);
 // get the parent `<li>` element from the button we pressed and remove it
 console.log(btnClicked.parent('li').children().eq(0).text());
//  var removeItem = btnClicked.parent('li').text().split('Remove')[0]
var removeItem = btnClicked.siblings().text()
 console.log({removeItem})
 console.log('before', pushIngrToApi)
 pushIngrToApi = pushIngrToApi.filter(function(ing) {
  return ing !== removeItem
 })
 console.log('after', pushIngrToApi)
 localStorage.setItem("userInput", JSON.stringify(pushIngrToApi));
 btnClicked.parent('li').remove();

}

ingredientUl.on('click', 'button.delete-btn', handleRemoveIngrItem);

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


// // cocktail section

// var userDrinkInput = $("#inputdrinks");
// var drinkUl = $("drink-list");
// var drinkItemEl = $("drink-list");
// console.log(drinkUl);
// console.log(userDrinkInput);
// console.log(userDrinkInput.val());

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'e1e7badd01msh59a701f1225e72ep1d550ajsnd6058ae1acbd',
// 		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
// 	}
// };

// fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i=' + userDrinkInput, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// $(".form-inline").on("click", "#drinkBtn", function (event) {
//   event.preventDefault();

//   userInput = $(this).siblings("#inputdrinks").val();
// cocktail section
var drinkInput = $("#inputdrinks");
var drinkSubmit = $("drinkBtn");
console.log(drinkSubmit);
console.log(drinkInput);
console.log(drinkInput.val());

//   localStorage.setItem("userInput", JSON.stringify(userInput));
//   forSearch = JSON.parse(localStorage.getItem("userInput"));
//   pushToApi = userInput.split(" ");
//   userInput.replace(" ", ",");
//   console.log(userInput);
// creatListItem(pushToApi);
// getRecipes(userInput);
// });

// function createDrinkList(){
//   $("#inputdrinks").empty();
//   for (var i = 0; i < pushIngrToApi.length; i++) {
//     drinkItemEl = $('<li>'+ pushIngrToApi[i] + '</li>');
//     drinkItemEl.append('<button class="delete-btn">Remove</button>');
//     userDrinkInput.append(drinkItemEl);
//     $('input[name="drink-input"]').val('');
//   }
// }

// function handleRemoveIngrItem(event) {
// var btnClicked = $(event.target);
// console.log(btnClicked);
// console.log(btnClicked.parent('li'));
// btnClicked.parent('li').remove();

// }
// console.log(drinkItemEl);

// drinkUl.on('click', 'button.delete-btn', handleRemoveIngrItem);
