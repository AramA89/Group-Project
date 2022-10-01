var ingredientUl = $("#ingredient-list");
var drinkUl = $("#drink-list");

var userInputSection = $(".pantry");

var userInput;
var pushIngrToApi;
var ingredientItemEl;

var userDrinkInput;
var pushDrinkToApi;
var drinkItemEl;

var responsesFood = [];
var responsesDrinks = [];
var drinkID = [];
var recipeInstructions = [];
var savedRecipes = [];
var recipeRow = $("<div>");
var foodSection = $("#food");
var savedRecipes = [];

// run event on click for the ingredient submit button
init();

// Ingredients + Drinks:
//set ingredient storage to an empty array when page is refreshed
function init() {
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
  $.each($(".ingrcb:checkbox:checked"), function () {
    pushIngrToApi.push($(this).siblings("label").text());
    //Clear checkboxes
    $('input[type="checkbox"]').prop("checked", false);
  });

  userInput = $(this).siblings("#inputingredients").val();
  // check to see if input includes space or comma. if value is not found method will return -1
  if (userInput.indexOf(",") !== -1) {
    userInput = userInput.split(",");
    pushIngrToApi = pushIngrToApi.concat(userInput);
    localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
  } else if (userInput.indexOf(" ") !== -1) {
    userInput = userInput.split(" ");
    pushIngrToApi = pushIngrToApi.concat(userInput);
    localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
  } else if (userInput === "") {
    localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
  } else {
    pushIngrToApi = pushIngrToApi.concat(userInput);
    localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));
  }

  getRecipes(pushIngrToApi);
  creatIngredientList();
});

//Drinks:
//listens for the input click and assign value to drinks
$("#drink-form").on("click", "#drink-submit-btn", function (event) {
  event.preventDefault();

  // check selected checkbox drinks
  $.each($(".drinkcb:checkbox:checked"), function () {
    pushDrinkToApi.push($(this).siblings("label").text());
    //clear checkboxes
    $('input[type="checkbox"]').prop("checked", false);
  });

  userDrinkInput = $(this).siblings("#inputdrinks").val();
  // check to see if input includes space or comma. if value is not found method will return -1
  if (userDrinkInput.indexOf(",") !== -1) {
    userDrinkInput = userDrinkInput.split(",");
    pushDrinkToApi = pushDrinkToApi.concat(userDrinkInput);
    localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
  } else if (userDrinkInput.indexOf(" ") !== -1) {
    userDrinkInput = userDrinkInput.split(" ");
    pushDrinkToApi = pushDrinkToApi.concat(userDrinkInput);
    localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
  } else if (userDrinkInput === "") {
    localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
  } else {
    pushDrinkToApi = pushDrinkToApi.concat(userDrinkInput);
    localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
  }
  creatDrinkList();
  getDrinkRecipes(pushDrinkToApi);
  // getRecipes(userInput);
});

//Ingredients:
//display list of items the user inputs
function creatIngredientList() {
  //first remove all listitems and create them again from the array
  $("#ingredient-list").empty();
  $("#food").empty();
  console.log(recipeRow);
  for (var i = 0; i < pushIngrToApi.length; i++) {
    ingredientItemEl = $("<li>");
    var ingText = $("<span>").text(pushIngrToApi[i]);
    ingredientItemEl.append(ingText);
    //add delete button
    ingredientItemEl.append(
      '<button class="ml-2 mb-2 delete-btn">Remove</button>'
    );
    ingredientUl.append(ingredientItemEl);
    //clear input field
    $('input[name="ingredient-input"]').val("");
  }
}

//Drinks:
//display list of items the user inputs
function creatDrinkList() {
  //first remove all listitems and create them again from the array
  $("#drink-list").empty();
  for (var i = 0; i < pushDrinkToApi.length; i++) {
    drinkItemEl = $("<li>");
    var drinkText = $("<span>").text(pushDrinkToApi[i]);
    drinkItemEl.append(drinkText);
    //add delete button
    drinkItemEl.append('<button class="ml-2 mb-2 delete-btn">Remove</button>');
    drinkUl.append(drinkItemEl);
    //clear input field
    $('input[name="drink-input"]').val("");
  }
}

//Ingredients:
//Remove list item from li and storage
function handleRemoveIngrItem(event) {
  console.log('IngArray before remove ' + pushIngrToApi)
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  // get the parent `<li>` element from the button we pressed and remove it
  var removeItem = btnClicked.siblings().text();
  pushIngrToApi = pushIngrToApi.filter(function (ing) {
    return ing !== removeItem;
  });
  localStorage.setItem("ingredients", JSON.stringify(pushIngrToApi));

  btnClicked.parent("li").remove();
  //remove DisplayIngredient list
  foodSection.children($("#recipeContainer")).remove();
  getRecipes(pushIngrToApi)
}

ingredientUl.on("click", "button.delete-btn", handleRemoveIngrItem);

//Drinks:
//Remove list item from li and storage
function handleRemoveDrinkItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);
  // get the parent `<li>` element from the button we pressed and remove it
  var removeItem = btnClicked.siblings().text();
  pushDrinkToApi = pushDrinkToApi.filter(function (ing) {
    return ing !== removeItem;
  });
  localStorage.setItem("drinks", JSON.stringify(pushDrinkToApi));
  btnClicked.parent("li").remove();
}

drinkUl.on("click", "button.delete-btn", handleRemoveDrinkItem);

//get recipe array based on user input of
async function getRecipes(ingredients) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3edfd13894msh663a8d5ce798f38p1cf2e4jsn7b8ca7705e2a",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
  try {
    var response = await fetch(
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" +
      ingredients +
      "&number=5&ignorePantry=true&ranking=1",
      options
    );
    var data = await response.json();
    getInstructions(data);
  } catch (err) {
    console.error(err);
  }
}

// get recipe instructions by using recipe ID from getRecipes results
async function getInstructions(recipes) {
  recipes.forEach(async function (recipe) {
    console.log(recipe);
    const instructions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3edfd13894msh663a8d5ce798f38p1cf2e4jsn7b8ca7705e2a",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    try {
      var response = await fetch(
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
        recipe.id +
        "/analyzedInstructions?stepBreakdown=true",
        instructions
      );
      var data = await response.json();
      // console.log(data);
      if (data !== []) {
        if (data[0].steps) {
          recipe.instructionsArr = data[0].steps;
          pushIngrToApi = [...pushIngrToApi, recipe];
          displayRecipes(recipe);
        }
      }
    } catch (err) {
      console.error(err);
    }
    console.log(pushIngrToApi);
  });
}

// Function to populate screen with recipes found
function displayRecipes(recipe) {
<<<<<<< Updated upstream
  console.log(recipe);
  // create section to contain grabbed recipes

  // Pattern is create element -- stlye element -- append element
  var recipeRow = $("<div>");
  recipeRow.attr("class", "row mt-2");
  recipeRow.attr("id", "recipeContainer");
  foodSection.append(recipeRow);
  var recipeCol = $("<div>");
  recipeCol.attr("class", "col-8");
  recipeRow.append(recipeCol);
  var recipeCard = $("<div>");
  recipeCard.attr({ class: "card" });
  recipeCard.attr("data-recipe-id", recipe.id);
  recipeCard.attr("data-toggle", "modal");
  recipeCard.attr("data-target", `#modal-${recipe.id}`);
  recipeRow.append(recipeCard);
  var recipeImg = $("<img>");
  recipeImg.attr("src", recipe.image);
  recipeImg.addClass("card-img-top");
  recipeCard.append(recipeImg);
  var recipeCardBody = $("<div>");
  recipeCardBody.attr("class", "card-body");
  recipeCard.append(recipeCardBody);
  var recipeCardTitle = $("<h5>");
  recipeCardTitle.addClass("card-title");
  recipeCardTitle.text(recipe.title);
  recipeCard.append(recipeCardTitle);
  var modal = createModal(recipe);
  $("#food").append(modal);
=======
	console.log(recipe);
	// create section to contain grabbed recipes
	
	// Pattern is create element -- stlye element -- append element
  var recipeRow = $("<div>")
	recipeRow.attr('class', 'row mt-2');
  recipeRow.attr("id", "recipeContainer")
	foodSection.append(recipeRow);
	var recipeCol = $('<div>');
	recipeCol.attr('class', 'col-8');
	recipeRow.append(recipeCol);
	var recipeCard = $('<div>');
	recipeCard.attr({ class: 'card' });
	recipeCard.attr('data-recipe-id', recipe.id);
	recipeCard.attr('data-toggle', 'modal');
	recipeCard.attr('data-target', `#modal-${recipe.id}`);
	recipeRow.append(recipeCard);
	var recipeImg = $('<img>');
	recipeImg.attr('src', recipe.image);
	recipeImg.addClass('card-img-top');
	recipeCard.append(recipeImg);
	var recipeCardBody = $('<div>');
	recipeCardBody.attr('class', 'card-body');
	recipeCard.append(recipeCardBody);
	var recipeCardTitle = $('<h5>');
	recipeCardTitle.addClass('card-title');
	recipeCardTitle.text(recipe.title);
	recipeCard.append(recipeCardTitle);
	var modal = createModal(recipe);
	$('#food').append(modal);
>>>>>>> Stashed changes
}

// Get Drink Recipes by Ingredient
function getDrinkRecipes(ingredients) {
  const options = {
    method: "GET",
    headers: {
<<<<<<< Updated upstream
      "X-RapidAPI-Key": "e1e7badd01msh59a701f1225e72ep1d550ajsnd6058ae1acbd",
=======
      "X-RapidAPI-Key": "3edfd13894msh663a8d5ce798f38p1cf2e4jsn7b8ca7705e2a",
>>>>>>> Stashed changes
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  fetch(
<<<<<<< Updated upstream
    "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + ingredients,
=======
    "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + ingredients + "",
>>>>>>> Stashed changes
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      responsesDrinks = [...responsesDrinks, ...data.drinks];
      console.log("responsesDrinks", responsesDrinks);
      getDrinkDetails(responsesDrinks);
      displayDrinks(responsesDrinks);
    })
    .catch((err) => console.error(err));
}
<<<<<<< Updated upstream
// grab drink ID and fetch full cocktail details by ID

=======

// grab drink ID and fetch full cocktail details by ID
// strInstructions
// strIngredient
// strMeasure
// strImageSource
>>>>>>> Stashed changes
function getDrinkDetails(drinkArr) {
  console.log("drinkArr", drinkArr);
  for (var i = 0; i < 5; i++) {
    const options = {
      method: "GET",
      headers: {
<<<<<<< Updated upstream
        "X-RapidAPI-Key": "e1e7badd01msh59a701f1225e72ep1d550ajsnd6058ae1acbd",
=======
        "X-RapidAPI-Key": "3edfd13894msh663a8d5ce798f38p1cf2e4jsn7b8ca7705e2a",
>>>>>>> Stashed changes
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };

    fetch(
      "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" +
<<<<<<< Updated upstream
      drinkArr[i].idDrink,
=======
        drinkArr[i].idDrink,
>>>>>>> Stashed changes
      options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
<<<<<<< Updated upstream
        drinkID = data;
        console.log("drinkID", drinkID);
        var drinkIngredients = [];
        var drinkMeasurements = [];
        var drinkIngMeasure = [];
        var drinkInstructions = drinkID.drinks[0].strInstructions;
        console.log(drinkID.drinks[0]);
        for (var num = 1; num <= 15; num++) {
          var strIng = "strIngredient" + num.toString();
          var strMeasure = "strMeasure" + num.toString();
          var wantedIng = drinkID.drinks[0][strIng];
          var wantedMeasure = drinkID.drinks[0][strMeasure];
          if (wantedIng && wantedMeasure) {
            drinkIngredients.push(wantedIng.trim());
            drinkMeasurements.push(wantedMeasure.trim());
            drinkIngMeasure.push(
              wantedMeasure.trim() + " of " + wantedIng.trim()
            );
          }
        }
        console.log(drinkIngMeasure + drinkInstructions);
=======
        console.log("data", data);
        drinkID = data;
        console.log("drinkID", drinkID);
        console.log(drinkID.drinks[0].strDrink);
        console.log(drinkID.drinks[0].strInstructions);
        console.log(drinkID.drinks[0].strIngredient1);
        console.log(drinkID.drinks[0].strMeasure1);

        // need to grab all ingredients and measurements
>>>>>>> Stashed changes
      })
      .catch((err) => console.error(err));
  }
}

// Function to populate screen with drinks found
function displayDrinks(recipe) {
  // create section to contain grabbed recipes
  var drinkSection = $("#drinks");
  console.log(drinkSection);
  // userRecipeSection.attr("class", "col-6")
  // $("#content").append(userRecipeSection)
  // Loop through grabbed recipes to populate page with image and name of recipes
  for (var i = 0; i < 5; i++) {
    // Pattern is create element -- stlye element -- append element
    var recipeRow = $("<div>");
    recipeRow.attr("class", "row mt-2");
    drinkSection.append(recipeRow);

    var recipeCol = $("<div>");
    recipeCol.attr("class", "col-4");
    recipeRow.append(recipeCol);

    var recipeCard = $("<div>");
    recipeCard.addClass("card");
    recipeRow.append(recipeCard);

    var recipeImg = $("<img>");
    recipeImg.attr("src", recipe[i].strDrinkThumb);
    recipeImg.addClass("card-img-top");
    recipeCard.append(recipeImg);

    var recipeCardBody = $("<div>");
    recipeCardBody.attr("class", "card-body");
    recipeCard.append(recipeCardBody);
    
    var recipeCardTitle = $("<h5>");
    recipeCardTitle.addClass("card-title");
    recipeCardTitle.text(recipe[i].strDrink);
    recipeCard.append(recipeCardTitle);
  }
}

// modal to populate when recipe is clicked
// $(".food").on("click", ".card",
function createModal(recipe) {
  // create and style modal elemenets

  var modal = $("<div>");
  modal.attr({
    class: "modal fade",
    tabindex: "-1",
    role: "dialog",
    id: `modal-${recipe.id}`,
  });
  modal.attr("data-recipe-id", recipe.id);
  modal.attr("aria-labelledby", "recipeModalLabel");
  modal.attr("aria-hidden", "true");
  var modalDialog = $("<div>");
  modalDialog.attr({
    class: "modal-dialog",
    role: "document",
  });
  var modalContent = $("<div>");
  modalContent.attr("class", "modal-content");
  var modalHeader = $("<div>");
  modalHeader.attr("class", "modal-header");
  var modalTitle = $("<h5>");
  modalTitle.attr({
    class: "modal-title",
    id: "recipeModalLabel",
  });
  modalTitle.text(recipe.title);
  modalHeader.append(modalTitle);
  var modalExitBtn = $("<button>");
  modalExitBtn.attr({
    type: "button",
    class: "close",
  });
  modalExitBtn.attr("data-dismiss", "modal");
  modalExitBtn.attr("aria-label", "Close");
  modalHeader.append(modalExitBtn);
  var modalSpan = $("<span>");
  modalSpan.attr("aria-hidden", "true");
  modalSpan.text("X");
  modalExitBtn.append(modalSpan);
  modalContent.append(modalHeader);
  var modalBody = $("<div>");
  modalBody.attr("class", "modal-body");
  modalBody.text("");
  modalContent.append(modalBody);
  var modalBodyIngr = $("<div>")
  modalBodyIngr.attr("id", "modalBodyIngr")
  modalBodyIngr.text("INGREDIENTS:")
  modalBody.append(modalBodyIngr)
  var modalBodyInst = $("<div>")
  modalBodyInst.attr("id", "modalBodyInst")
  modalBodyInst.text("INSTRUCTIONS:")
  modalBody.append(modalBodyInst)
  console.log(recipe)
  for (var i = 0; i < recipe.usedIngredients.length; i++) {
    var modalBodySpanIncl = $("<div>");
    modalBodySpanIncl.text(recipe.usedIngredients[i].name + ": " + recipe.usedIngredients[i].original + " ");
    modalBodyIngr.append(modalBodySpanIncl)
  }
  for (var i = 0; i < recipe.missedIngredients.length; i++) {
    var modalBodySpanMis = $("<div>");
    modalBodySpanMis.text(recipe.missedIngredients[i].name + ": " + recipe.missedIngredients[i].amount + recipe.missedIngredients[i].unit + " " + recipe.missedIngredients[i].originalName)
    modalBodyIngr.append(modalBodySpanMis)
    console.log(recipe.missedIngredients[i].name)
    console.log(recipe.missedIngredients[i].amount)
    console.log(recipe.missedIngredients[i].unit)
    console.log(recipe.missedIngredients[i].originalName)
  }
  for (var i = 0; i < recipe.instructionsArr.length; i++) {
    var modalBodySpan = $("<div>");
    modalBodySpan.text(" " + recipe.instructionsArr[i].step + " ");
    console.log(recipe.instructionsArr[i].step)
    modalBodyInst.append(modalBodySpan)
  }
  var modalFooter = $("<div>");
  modalFooter.addClass("modal-footer");
  modalContent.append(modalFooter);
  var modalSaveBtn = $("<button>");
  modalSaveBtn.attr({
    type: "button",
    class: "btn btn-primary",
    id: "saveBtn"
  });
  modalSaveBtn.text("Save Recipe");
  modalFooter.append(modalSaveBtn);
  var modalCloseBtn = $("<button>");
  modalCloseBtn.attr({
    type: "button",
    class: "btn btn-secondary",
  });
  modalCloseBtn.attr("data-dismiss", "modal");
<<<<<<< Updated upstream
  modalCloseBtn.text("Close");
  modalFooter.append(modalCloseBtn);

  modalDialog.append(modalContent);
  modal.append(modalDialog);
  modal.on("click", "#saveBtn", function (event) {
    savedRecipes.push(recipe)
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes))
  })
  console.log(savedRecipes)
  return modal;
=======
  modalCloseBtn.text("Close")
  modalFooter.append(modalCloseBtn)

  modalDialog.append(modalContent)
  modal.append(modalDialog)
return modal
>>>>>>> Stashed changes
}