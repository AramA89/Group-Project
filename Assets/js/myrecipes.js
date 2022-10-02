var myRecipes = JSON.parse(localStorage.getItem('savedRecipes'));

//Give page time to load the initial array
delayFunction(myRecipes);

function delayFunction(myRecipes){
console.log(myRecipes);
}

createMyRecipeList(myRecipes);

function createMyRecipeList(recipe) {
   console.log(recipe);
  for (var i = 0; i < myRecipes.length; i++) {
      var recipeCard = $("<div>");
      recipeCard.attr({ class: "row g-0" });
      recipeCard.attr("recipe-card-id", recipe[i].id);
      $('.food-recipe-container').append(recipeCard);
      
      var recipeImgContainer = $("<div>");
      recipeImgContainer.attr({ class: "col-md-2" });
      recipeCard.append(recipeImgContainer);

      var recipeImg = $("<img>");
      recipeImg.attr("src", recipe[i].image);
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
      recipeTitle.text(recipe[i].title);
      recipeContent.append(recipeTitle);
      
      for (var i = 0; i < recipe.usedIngredients.length; i++){
      var recipeIngredients = $("<p>");
      recipeIngredients.addClass("card-text");
      recipeIngredients.text('Ingredients: ' + recipe.usedIngredients);
      recipeContent.append(recipeIngredients);
    }

      var recipeInstructions = $("<p>");
      recipeInstructions.addClass("card-text");
      recipeInstructions.text('Instructions: ' + recipe[i].instructionsArr);
      recipeContent.append(recipeInstructions);

      var recipeBtnContainer = $("<div>");
      recipeBtnContainer.addClass("d-grid gap-2 d-md-flex justify-content-md-end");
      recipeContent.append(recipeBtnContainer);

      recipeBtnContainer.append(
        '<button class="btn btn-primary" type="button">Remove</button>');
    
  }
}

// (<span class="text-muted">Ingredients: </span>)