var foodRecipeEl = $('.food-recipe-container');
var myRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
var recipeBtnContainer;

//Give page time to load the initial array
delayFunction(myRecipes);

function delayFunction(myRecipes) {
  console.log(myRecipes);
}

createMyRecipeList(myRecipes);

function createMyRecipeList(recipes) {
  console.log(recipes);
  recipes.forEach(function (recipe) {
    var recipeCardParent = $("<div>");
    recipeCardParent.attr({class: "container-fluid pull-right rounded border mt-5 p-3 cardParent"});
    $(".food-recipe-container").append(recipeCardParent);
    var recipeCard = $("<div>");
    recipeCard.attr({ class: "row g-0" });
    // recipeCard.attr("recipecardid", recipe.id);
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

//Remove Recipe button
function handleRemoveRecipe(event) {
  console.log('arrived at delete function');
  console.log('savedrecipes before ' + savedRecipes);
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  
  var removeItem = btnClicked.parent().attr("id", savedRecipes.id);
  var pushRecipe = [];
  console.log(removeItem);
  var removeItem = removeItem[0].id;
  console.log(removeItem);
  console.log(savedRecipes.length);

  for (var i = 0; i < savedRecipes.length; i++) {
    if (savedRecipes[i].id != removeItem){
    console.log(savedRecipes[i].id);
    console.log(removeItem);    
      pushRecipe.push(savedRecipes[i])
    }}
    console.log(pushRecipe);
  savedRecipes = pushRecipe
  console.log(savedRecipes);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

  // savedRecipes = savedRecipes.filter(function (ing) {
  //   return ing.id !== removeItem;
  //   // return ing !== removeItem;
  // });
  // console.log('savedRecipes after ' + savedRecipes);
  // localStorage.setItem("saveRecipes", JSON.stringify(savedRecipes));

  $('.cardParent').remove();

  createMyRecipeList(savedRecipes);
  // btnClicked.parent("li").remove();
  // //remove DisplayIngredient list
  // foodSection.children($("#recipeContainer")).remove();
  // getRecipes(pushIngrToApi)
}


foodRecipeEl.on("click", "button.delete-recipe", handleRemoveRecipe);

   
  //   var recipeBtn = $("<button>");
  //   recipeBtn.addClass("btn btn-primary delete-recipe");
  //   recipeBtn.attr("type", "button");
  //   recipeBtn.text("Remove");
  //   recipeBtnContainer.append(recipeBtn);

  //  var buttonIdText = $("<span>").text(recipe.id);
  // //  buttonIdText.style.visibility = 'hidden';
  //  recipeBtn.append(buttonIdText); 