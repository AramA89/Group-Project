var ingredientUl = $('#ingredient-list');
var drinkUl = $('#drink-list');

var userInput;
var pushIngrToApi;
var ingredientItemEl;

var userDrinkInput;
var pushDrinkToApi;
var drinkItemEl;

var responses = [];

// run event on click for the ingredient submit button
init();

// Ingredients + Drinks:
//set ingredient storage to an empty array when page is refreshed
function init(){
  pushIngrToApi = [];
  localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
  pushDrinkToApi = [];
  localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
}

//Ingredients:
//listens for the input click and assign value to ingredients
$("#ingredient-form").on("click", "#ingredient-submit-btn", function (event) {
  event.preventDefault();

 // check selected checkbox ingredients
  $.each($('.ingrcb:checkbox:checked'), function() {
    pushIngrToApi.push($(this).siblings('label').text());
    //Clear checkboxes
    $('input[type="checkbox"]').prop('checked', false);
  });

  userInput = $(this).siblings("#inputingredients").val();
// check to see if input includes space or comma. if value is not found method will return -1
  if (userInput.indexOf(',') !== -1){
    userInput = userInput.split(",");
    pushIngrToApi = pushIngrToApi.concat(userInput);
    localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
  } else if (userInput.indexOf(" ") !== -1){
    userInput = userInput.split(" ");
    pushIngrToApi = pushIngrToApi.concat(userInput);
    localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
  } else if (userInput === ""){
    localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
  } else {    
  pushIngrToApi = pushIngrToApi.concat(userInput);
  localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
}
  
creatIngredientList();
getRecipes(userInput);
});

//Drinks:
//listens for the input click and assign value to drinks
$("#drink-form").on("click", "#drink-submit-btn", function (event) {
  event.preventDefault();

   // check selected checkbox drinks
  $.each($('.drinkcb:checkbox:checked'), function() {
    pushDrinkToApi.push($(this).siblings('label').text());
    //clear checkboxes
    $('input[type="checkbox"]').prop('checked', false);
  });

  userDrinkInput = $(this).siblings("#inputdrinks").val();
  // check to see if input includes space or comma. if value is not found method will return -1
  if (userDrinkInput.indexOf(',') !== -1){
    userDrinkInput = userDrinkInput.split(",");
    pushDrinkToApi = pushDrinkToApi.concat(userDrinkInput);
    localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
  } else if (userDrinkInput.indexOf(" ") !== -1){
    userDrinkInput = userDrinkInput.split(" ");
    pushDrinkToApi = pushDrinkToApi.concat(userDrinkInput);
    localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
  } else if (userDrinkInput === ""){
    localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
  } else {    
    pushDrinkToApi = pushDrinkToApi.concat(userDrinkInput);
    localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
}
creatDrinkList();
// getRecipes(userInput);
});


//Ingredients:
//display list of items the user inputs
function creatIngredientList(){
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

//Drinks:
//display list of items the user inputs
function creatDrinkList(){
  //first remove all listitems and create them again from the array
  $('#drink-list').empty();
  for (var i = 0; i < pushDrinkToApi.length; i++) {
    drinkItemEl = $('<li>')
    var drinkText = $('<span>').text(pushDrinkToApi[i]);
    drinkItemEl.append(drinkText)
    //add delete button
    drinkItemEl.append('<button class="ml-2 mb-2 delete-btn">Remove</button>');
    drinkUl.append(drinkItemEl);
    //clear input field
    $('input[name="drink-input"]').val('');
  }
}

//Ingredients: 
//Remove list item from li and storage
function handleRemoveIngrItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
var btnClicked = $(event.target);
 // get the parent `<li>` element from the button we pressed and remove it
var removeItem = btnClicked.siblings().text()
 pushIngrToApi = pushIngrToApi.filter(function(ing) {
  return ing !== removeItem
 })
 localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
 btnClicked.parent('li').remove();
}

ingredientUl.on('click', 'button.delete-btn', handleRemoveIngrItem);

//Drinks: 
//Remove list item from li and storage
function handleRemoveDrinkItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  // get the parent `<li>` element from the button we pressed and remove it
   var removeItem = btnClicked.siblings().text()
  pushDrinkToApi = pushDrinkToApi.filter(function(ing) {
  return ing !== removeItem
 })
 localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
 btnClicked.parent('li').remove();

}

drinkUl.on('click', 'button.delete-btn', handleRemoveDrinkItem);

//get recipe array based on user input of
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
        // console.log('data', data)
        responses = [...responses, ...data]
        console.log('responses', responses)
        getInstructions(responses)
        displayRecipes(data)
      })
      .catch(err => console.error(err));
    }

// get recipe instructions by using recipe ID from getRecipes results
function getInstructions(recipeArr) {
  console.log("recipeArr", recipeArr)
  recipeArr.forEach(function(recipeArr){
    console.log(recipeArr.id)
    const instructions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3edfd13894msh663a8d5ce798f38p1cf2e4jsn7b8ca7705e2a',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
    
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeArr.id + "/analyzedInstructions?stepBreakdown=true", instructions)
      .then(response => response.json())
      .then(function(data){
        recipeID = data
        console.log(recipeID)
        console.log(recipeID[0].steps)
        for (var i = 0; i < recipeID[0].steps.length; i++){
        console.log(recipeID[0].steps[i])
        }
      })
      .catch(err => console.error(err));
  })
}

// Function to populate screen with recipes found
function displayRecipes(recipes) {
  // console.log('recipes', recipes)
  // console.log('responses', responses)
  recipes.forEach(function(recipe) {
    // console.log(recipe.title)
    recipe.usedIngredients.forEach(function(usedIng) {
      // console.log(usedIng.originalName)
    })
  })

}

const userOptions = getRecipes;

var ingredientListEl = $('#ingredient-list');


ingredientUl.on('click', 'button.delete-btn', handleRemoveIngrItem);





// cocktail section
var drinkInput = $("#inputdrinks");
var drinkSubmit = $("drinkBtn");
console.log(drinkSubmit);
console.log(drinkInput);
console.log(drinkInput.val());

var userDrinkInput = $("#inputdrinks");
var drinkUl = $("drink-list");
var drinkItemEl = $("drink-list");


function createDrinkList(){
  $("#inputdrinks").empty();
  for (var i = 0; i < pushIngrToApi.length; i++) {
    drinkItemEl = $('<li>'+ pushIngrToApi[i] + '</li>');
    drinkItemEl.append('<button class="delete-btn">Remove</button>');
    userDrinkInput.append(drinkItemEl);
    $('input[name="drink-input"]').val('');
  }
}




