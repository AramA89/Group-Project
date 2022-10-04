//Food Section Variables
var foodRecipeEl = $('.food-recipe-container');
var drinkRecipeEl = $('.drink-recipe-container');
var myRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
var myDrinks = JSON.parse(localStorage.getItem("savedDrinks"));
console.log(myDrinks)
var recipeBtnContainer;

//Give page time to load the initial array
delayFunction(myRecipes);

function delayFunction(myRecipes) {
}


//Food saved Recipes
createMyFoodList(myRecipes);

function createMyFoodList(recipes) {
  recipes.forEach(function (recipe) {
    var recipeCardParent = $("<div>");
    recipeCardParent.attr({class: "container-fluid pull-right rounded border p-3 cardParent"});
    $(".food-recipe-container").append(recipeCardParent);

    var recipeCard = $("<div>");
    recipeCard.attr({ class: "row g-0" });
    recipeCardParent.append(recipeCard);

    var recipeImgContainer = $("<div>");
    recipeImgContainer.attr({ class: "col-md-2" });
    recipeCard.append(recipeImgContainer);

    var recipeImg = $("<img>");
    recipeImg.attr("src", recipe.image);
    recipeImg.addClass("img-fluid rounded-start");
    recipeImgContainer.append(recipeImg);

    var recipeContentContainer = $("<div>");
    recipeContentContainer.attr({ class: "col-md-10" });
    recipeCard.append(recipeContentContainer);

    var recipeContent = $("<div>");
    recipeContent.attr({ class: "card-body" });
    recipeContentContainer.append(recipeContent);

    var recipeTitle = $("<h5>");
    recipeTitle.addClass("card-title");
    recipeTitle.text(recipe.title);
    recipeContent.append(recipeTitle);

    for (var i = 0; i < recipe.usedIngredients.length; i++) {
      var recipeIngredients = $("<p>");
      recipeIngredients.addClass("card-text");
      recipeIngredients.text(recipe.usedIngredients[i].original
      );
      recipeContent.append(recipeIngredients);
    }
    for (var i = 0; i < recipe.instructionsArr.length; i++) {
      var recipeInstructions = $("<p>");
      recipeInstructions.addClass("card-text steps");
      recipeInstructions.text(
        "Step " + (i+1) + ": " + recipe.instructionsArr[i].step
      );
      recipeContent.append(recipeInstructions);
    }

    var recipeBtnContainer = $("<div>");
    recipeBtnContainer.addClass("d-grid gap-2 d-md-flex justify-content-md-end");
    recipeBtnContainer.attr("id", recipe.id);
    recipeContent.append(recipeBtnContainer);

    recipeBtnContainer.append(
      '<button class="btn btn-success delete-recipe" type="button">Remove</button>'
    );
  });
}
console.log(savedRecipes);
console.log(myRecipes);
console.log(savedDrinks);
console.log(myDrinks);

//Drink saved Recipes
createMyDrinkList(myDrinks);

function createMyDrinkList(recipes) {
  console.log(recipes);
  recipes.forEach(function (recipe) {
    var drinkCardParent = $("<div>");
    drinkCardParent.attr({class: "container-fluid pull-right rounded border p-3 drinkParent"});
    $(".drink-recipe-container").append(drinkCardParent);

    var drinkCard = $("<div>");
    drinkCard.attr({ class: "row g-0" });
    drinkCardParent.append(drinkCard);

    var drinkImgContainer = $("<div>");
    drinkImgContainer.attr({ class: "col-md-2" });
    drinkCard.append(drinkImgContainer);

    var drinkImg = $("<img>");
    drinkImg.attr("src", recipe.strDrinkThumb);
    drinkImg.addClass("img-fluid rounded-start");
    drinkImgContainer.append(drinkImg);

    var drinkContentContainer = $("<div>");
    drinkContentContainer.attr({ class: "col-md-10" });
    drinkCard.append(drinkContentContainer);

    var drinkContent = $("<div>");
    drinkContent.attr({ class: "card-body" });
    drinkContentContainer.append(drinkContent);

    var drinkTitle = $("<h5>");
    drinkTitle.addClass("card-title");
    drinkTitle.text(recipe.name);
    drinkContent.append(drinkTitle);

    for (var i = 0; i < recipe.measures.length; i++) {
      var drinkIngredients = $("<p>");
      drinkIngredients.addClass("card-text");
      drinkIngredients.text(recipe.measures[i]);
      drinkContent.append(drinkIngredients);
    }
   
    var drinkInstructions = $("<p>");
    drinkInstructions.addClass("card-text instructions");
    drinkInstructions.text('Insructions: ' + recipe.instructions);
    drinkContent.append(drinkInstructions);

    var drinkBtnContainer = $("<div>");
    drinkBtnContainer.addClass("d-grid gap-2 d-md-flex justify-content-md-end");
    drinkBtnContainer.attr("id", recipe.idDrink);
    drinkContent.append(drinkBtnContainer);

    drinkBtnContainer.append(
      '<button class="btn btn-success delete-recipe" type="button">Remove</button>'
    );
  });
}

//Food Recipe remove button
function handleRemoveRecipe(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  var removeItem = btnClicked.parent().attr("id", savedRecipes.id);
  console.log(removeItem);

  var removeItem = removeItem[0].id;
  console.log(removeItem[0].id);

  var pushRecipe = [];

  for (var i = 0; i < savedRecipes.length; i++) {
    if (savedRecipes[i].id != removeItem){
    console.log(savedRecipes[i].id);
    console.log(removeItem);    
    pushRecipe.push(savedRecipes[i])
    } 
  }
  savedRecipes = pushRecipe;
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  console.log(savedRecipes);

  $('.cardParent').remove();
  createMyFoodList(savedRecipes);
}

console.log(myDrinks);
//Drink Recipe remove button
function handleRemoveDrink(event) {
  console.log('arrived at remove drinks');
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  var removeItem = btnClicked.parent().attr("id", myDrinks.idDrink);
  console.log(removeItem);
  var removeItem = removeItem[0].id
  console.log(removeItem);
  var pushDrinks = [];

  for (var i = 0; i < myDrinks.length; i++) {
    console.log('at for loop drinks');
    if (myDrinks[i].idDrink !== removeItem){
    console.log(myDrinks[i].idDrink);
    console.log(removeItem);    
    pushDrinks.push(myDrinks[i])
    } 
  }
  myDrinks = pushDrinks;
  localStorage.setItem("savedDrinks", JSON.stringify(myDrinks));
  console.log(myDrinks);

  $('.drinkParent').remove();
  createMyDrinkList(myDrinks);
}
//Drink Remove button click
drinkRecipeEl.on("click", "button.delete-recipe", handleRemoveDrink);

//Food Remove button click
foodRecipeEl.on("click", "button.delete-recipe", handleRemoveRecipe);
