//Food Section Variables
var foodRecipeEl = $('.food-recipe-container');
var myRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
var myDrinks = JSON.parse(localStorage.getItem("savedDrinks"));
console.log(myDrinks)
console.log(myDrinks[0].measures)
var recipeBtnContainer;

//Give page time to load the initial array
delayFunction(myRecipes);

function delayFunction(myRecipes) {
  console.log(myRecipes);
}

//Drinks section Variables
var drinkRecipeEl = $('.drink-recipe-container');
var myDrinks = JSON.parse(localStorage.getItem("savedDrinks"));

//Food saved Recipes
createMyFoodList(myRecipes);

function createMyFoodList(recipes) {
  console.log(recipes);
  recipes.forEach(function (recipe) {
    var recipeCardParent = $("<div>");
    recipeCardParent.attr({class: "container-fluid pull-right rounded border mt-5 p-3 cardParent"});
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
      recipeIngredients.text(
        "Ingredient: " + recipe.usedIngredients[i].original
      );
      recipeContent.append(recipeIngredients);
    }
    for (var i = 0; i < recipe.instructionsArr.length; i++) {
      var recipeInstructions = $("<p>");
      recipeInstructions.addClass("card-text");
      recipeInstructions.text(
        "Step " + i + ": " + recipe.instructionsArr[i].step
      );
      recipeContent.append(recipeInstructions);
    }

    var recipeBtnContainer = $("<div>");
    recipeBtnContainer.addClass("d-grid gap-2 d-md-flex justify-content-md-end");
    recipeBtnContainer.attr("id", recipe.id);
    recipeContent.append(recipeBtnContainer);

    recipeBtnContainer.append(
      '<button class="btn btn-primary delete-recipe" type="button">Remove</button>'
    );
  });
}
console.log(savedRecipes);

//Drink saved Recipes
// createMyDrinkList(myDrinks);

function createMyDrinkList(recipes) {
  console.log("drinks object " + recipes);
  recipes.forEach(function (recipe) {
    var drinkCardParent = $("<div>");
    drinkCardParent.attr({class: "container-fluid pull-right rounded border mt-5 p-3 drinkParent"});
    $(".drink-recipe-container").append(drinkCardParent);

    var drinkCard = $("<div>");
    drinkCard.attr({ class: "row g-0" });
    drinkCardParent.append(drinkCard);

    var drinkImgContainer = $("<div>");
    drinkImgContainer.attr({ class: "col-md-2" });
    drinkCard.append(drinkImgContainer);

    var drinkImg = $("<img>");
    drinkImg.attr("src", recipe.image);
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
    drinkTitle.text(drink.title);
    drinkContent.append(drinkTitle);

    //***JAMES & ARAM DRINK ARRAY */
    // for (var i = 0; i < recipe.usedIngredients.length; i++) {
    //   var recipeIngredients = $("<p>");
    //   recipeIngredients.addClass("card-text");
    //   recipeIngredients.text(
    //     "Ingredient: " + recipe.usedIngredients[i].original
    //   );
    //   recipeContent.append(recipeIngredients);
    // }
    // for (var i = 0; i < recipe.instructionsArr.length; i++) {
    //   var recipeInstructions = $("<p>");
    //   recipeInstructions.addClass("card-text");
    //   recipeInstructions.text(
    //     "Step " + i + ": " + recipe.instructionsArr[i].step
    //   );
    //   recipeContent.append(recipeInstructions);
    // }

    var drinkBtnContainer = $("<div>");
    drinkBtnContainer.addClass("d-grid gap-2 d-md-flex justify-content-md-end");
    drinkBtnContainer.attr("id", recipe.id);
    drinkContent.append(drinkBtnContainer);

    drinkBtnContainer.append(
      '<button class="btn btn-primary delete-recipe" type="button">Remove</button>'
    );
  });
}
console.log(savedDrinks);

//Food Recipe remove button
function handleRemoveRecipe(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
    var removeItem = btnClicked.parent().attr("id", savedRecipes.id);
  var removeItem = removeItem[0].id;

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
//Food Remove button click
foodRecipeEl.on("click", "button.delete-recipe", handleRemoveRecipe);

//Drink Recipe remove button
function handleRemoveDrink(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
    var removeItem = btnClicked.parent().attr("id", savedDrinks.id);
  var removeItem = removeItem[0].id;

  var pushDrinks = [];

  for (var i = 0; i < savedDrinks.length; i++) {
    if (savedDrinks[i].id != removeItem){
    console.log(savedDrinks[i].id);
    console.log(removeItem);    
      pushDrinks.push(savedDrinks[i])
    } 
  }
  savedDrinks = pushDrinks;
  localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks));
  console.log(savedDrinks);

  $('.cardParent').remove();
  // createMyDrinkList(savedDrinks);
}
//Drink Remove button click
drinkRecipeEl.on("click", "button.delete-recipe", handleRemoveDrink);
