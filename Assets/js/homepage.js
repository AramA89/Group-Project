var userIngredientsInput = $("#inputingredients");
var ingredientUl = $('#ingredient-list');

var userInput;
var pushIngrToApi;
var ingredientItemEl;
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
checkStorage();

//check storage
function checkStorage(){
  pushIngrToApi = JSON.parse(localStorage.getItem("userInput"));
  //if nothing in local storage then save empty array
  if (!pushIngrToApi){
    pushIngrToApi = [];
    console.log(pushIngrToApi);
  }
}

//listens for the input click and assign value to userInput
$(".form-inline").on("click", "#ingredient-submit-btn", function (event) {
  event.preventDefault();

  userInput = $(this).siblings("#inputingredients").val();
  console.log(userInput);
// check to see if input includes space or comma. if value is not found method will return -1
  if (userInput.indexOf(',') !== -1){
    userInput = userInput.split(",");
    console.log(userInput);
    pushIngrToApi = pushIngrToApi.concat(userInput);
    console.log(pushIngrToApi);
    localStorage.setItem("userInput", JSON.stringify(pushIngrToApi));
  } else if (userInput.indexOf(" ") !== -1){
    userInput = userInput.split(" ");
    pushIngrToApi = pushIngrToApi.concat(userInput);
    console.log(pushIngrToApi);
    localStorage.setItem("userInput", JSON.stringify(pushIngrToApi));
  } else {
  console.log(userInput);
  pushIngrToApi = pushIngrToApi.concat(userInput);
  console.log(pushIngrToApi);
  localStorage.setItem("userInput", JSON.stringify(pushIngrToApi));
}
  
creatListItem();
// getRecipes(userInput);
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
function creatListItem(){
  //first remove all listitems and create them again from the array
  $('#ingredient-list').empty();
  for (var i = 0; i < pushIngrToApi.length; i++) {
    ingredientItemEl = $('<li>'+ pushIngrToApi[i] + '</li>');
    //add delete button
    ingredientItemEl.append('<button class="delete-btn">Remove</button>');
    ingredientUl.append(ingredientItemEl);
    //clear input field
    $('input[name="ingredient-input"]').val('');
  }
}

function handleRemoveIngrItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
var btnClicked = $(event.target);
console.log(btnClicked);
 // get the parent `<li>` element from the button we pressed and remove it
 console.log(btnClicked.parent('li'));
 btnClicked.parent('li').remove();

 //TODO --- need to also remove from localstorage
//  var removeItem = btnClicked.firstChild('data').val();
//  console.log(removeItem);

}
console.log(ingredientItemEl);

ingredientUl.on('click', 'button.delete-btn', handleRemoveIngrItem);



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

