var myRecipes = JSON.parse(localStorage.getItem("savedRecipes"));

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
    recipeCardParent.attr({class: "container-fluid pull-right rounded border mt-5 p-3", 
    id: "cardParent"});
    $(".food-recipe-container").append(recipeCardParent);
    var recipeCard = $("<div>");
    recipeCard.attr({ class: "row g-0" });
    recipeCard.attr("recipe-card-id", recipe.id);
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

    console.log(recipe.usedIngredients);
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
    recipeBtnContainer.addClass(
      "d-grid gap-2 d-md-flex justify-content-md-end"
    );
    recipeContent.append(recipeBtnContainer);

    recipeBtnContainer.append(
      '<button class="btn btn-primary" type="button">Remove</button>'
    );
  });
}

// (<span class="text-muted">Ingredients: </span>)
