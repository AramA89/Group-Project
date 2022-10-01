// Function to populate screen with recipes found
function displayRecipes(recipes) {
  // create section to contain grabbed recipes
    var foodSection = $("#food")
    // userRecipeSection.attr("class", "col-6")
    // $("#content").append(userRecipeSection)
  // Loop through grabbed recipes to populate page with image and name of recipes
    recipes.forEach(function(recipe) {
      // Pattern is create element -- stlye element -- append element
      var recipeRow = $("<div>")
      recipeRow.attr("class", "row mt-2")
      foodSection.append(recipeRow)
      var recipeCol = $("<div>")
      recipeCol.attr("class", "col-8")
      recipeRow.append(recipeCol)
      var recipeCard = $("<div>")
      recipeCard.addClass("card")
      recipeRow.append(recipeCard)
      var recipeImg = $("<img>")
      recipeImg.attr("src", recipe.image);
      recipeImg.addClass("card-img-top")
      recipeCard.append(recipeImg)
      var recipeCardBody = $("<div>")
      recipeCardBody.attr("class", "card-body")
      recipeCard.append(recipeCardBody)
      var recipeCardTitle = $("<h5>")
      recipeCardTitle.addClass("card-title")
      recipeCardTitle.text(recipe.title)
      recipeCard.append(recipeCardTitle)
    })
  }