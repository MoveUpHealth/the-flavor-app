var favoriteMeals = []
var favoriteDrinks = []
var favoriteRestaurants = []


//Button to search for meal
$('.btn-meal').on('click', function(e){
 e.preventDefault()
 modalMeal.style.display = "none";
 $('#mealDiv').attr('style', 'display: none;')
 $('#cocktailDiv').attr('style', 'display: none;')
 $('#restaurantDiv').attr('style', 'display: none;')
var mealKeyword = $('#mealKeyword').val().trim()
var option = $('#mealSelect').val()

if( option == 'mealName'){

var queryUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+ mealKeyword + '&api-key=1'} else if(option == 'mainIngredient'){

var queryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + mealKeyword + '&api-key=1' } else if (option == 'Category'){

var queryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + mealKeyword + '&api-key=1'} else if (option == 'Area'){

  var queryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=' + mealKeyword + '&api-key=1'}

console.log(queryUrl)
console.log(option)

$.ajax({
 url: queryUrl,
 method: "GET"
}).then(function(response){
 console.log(response)
 
 var searchTitle = $('<h1>'+ (response.meals.length + 1) +' Results for ' + mealKeyword + '</h1>')
 $('#search-results').append(searchTitle)


if(response.meals == null){
         var noResults = $("<h2>I'm sorry. We didn't find any results. Please start over.</h2>")
         $('#search-results').append(noResults)
     } else {
 for(var i = 0; i < response.meals.length; i++){
     
 var newDiv = $("<div class='uk-card uk-card-default uk-card-body'></div>")
 var newTitle = $('<button class="mainTitle uk-button uk-button-default" data-type="mealView">'+ response.meals[i].strMeal + '</button>')
 var mealImage = $('<img>')
 var favIcon = $('<button uk-icon="icon: heart"></button>')
 var mealId = response.meals[i].idMeal

 mealImage.attr('src', response.meals[i].strMealThumb)
 newTitle.attr('data-id', mealId)
 favIcon.attr('data-id', mealId)
 favIcon.attr('style', 'display: block')
 favIcon.attr('class', 'uk-button uk-button-default uk-icon')
 newDiv.append(newTitle)
 newDiv.append(favIcon)
 newDiv.append(mealImage)
  
 $('#search-results').append(newDiv)
 }}
 

 //Button to favorite meal
 $('.uk-icon').on('click', function(e){
     var favBtn = $(this)
     console.log(favBtn)
     favBtn.attr('style', 'color: red')
     var favId = favBtn.attr('data-id')
     if(favoriteMeals.indexOf(favId) == '-1'){
     favoriteMeals.push(favId)
     console.log(favoriteMeals)
     }
 })
 //Button to open full view
 $('.mainTitle').on('click', function(b){
  b.preventDefault()
  $('#fullView').empty()
  var viewBtn = $(this)

  modalView.style.display = "block";
  console.log(viewBtn)
  
  var itemId = viewBtn.attr('data-id')
  var btnType = viewBtn.attr('data-type')
  if( btnType == 'mealView'){
    queryUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + itemId + '&api-key=1'
  }

$.ajax({
  url: queryUrl,
  method: 'GET'
}).then(function(view){
  console.log(view)
  var result = view.meals[0]
  var viewDiv = $("<div class='uk-card-media-left uk-cover-container'></div>")
  var newTitle = $('<h3 class="uk-card-title">'+ result.strMeal + '</h3>')
  var mealImage = $('<img>')
  var viewIcon = $('<button uk-icon="icon: heart"></button>')
  var viewId = result.idMeal
 
  mealImage.attr('src', result.strMealThumb)
  viewIcon.attr('data-id', viewId)
  viewIcon.attr('style', 'display: block')
  viewIcon.attr('class', 'uk-button uk-button-default uk-icon')
  viewDiv.append(newTitle)
  viewDiv.append(viewIcon)
  viewDiv.append(mealImage)
  $('#fullView').append(viewDiv)

  var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
  var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')
  var item1 = $('<p class="ingredientList">' + result.strMeasure1 + ' ' + result.strIngredient1 + '</p>')
  var item2 = $('<p class="ingredientList">' + result.strMeasure2 + ' ' + result.strIngredient2 + '</p>')
  var item3 = $('<p class="ingredientList">' + result.strMeasure3 + ' ' + result.strIngredient3 + '</p>')
  var item4 = $('<p class="ingredientList">' + result.strMeasure4 + ' ' + result.strIngredient4 + '</p>')
  var item5 = $('<p class="ingredientList">' + result.strMeasure5 + ' ' + result.strIngredient5 + '</p>')
  var item6 = $('<p class="ingredientList">' + result.strMeasure6 + ' ' + result.strIngredient6 + '</p>')
  var item7 = $('<p class="ingredientList">' + result.strMeasure7 + ' ' + result.strIngredient7 + '</p>')
  var item8 = $('<p class="ingredientList">' + result.strMeasure8 + ' ' + result.strIngredient8 + '</p>')
  var item9 = $('<p class="ingredientList">' + result.strMeasure9 + ' ' + result.strIngredient9 + '</p>')
  var item10 = $('<p class="ingredientList">' + result.strMeasure10 + ' ' + result.strIngredient10 + '</p>')
  var item11 = $('<p class="ingredientList">' + result.strMeasure11 + ' ' + result.strIngredient11 + '</p>')
  var item12 = $('<p class="ingredientList">' + result.strMeasure12 + ' ' + result.strIngredient12 + '</p>')
  var item13 = $('<p class="ingredientList">' + result.strMeasure13 + ' ' + result.strIngredient13 + '</p>')
  var item14 = $('<p class="ingredientList">' + result.strMeasure14 + ' ' + result.strIngredient14 + '</p>')
  var item15 = $('<p class="ingredientList">' + result.strMeasure15 + ' ' + result.strIngredient15 + '</p>')
  var item16 = $('<p class="ingredientList">' + result.strMeasure16 + ' ' + result.strIngredient16 + '</p>')
  var item17 = $('<p class="ingredientList">' + result.strMeasure17 + ' ' + result.strIngredient17 + '</p>')
  var item18 = $('<p class="ingredientList">' + result.strMeasure18 + ' ' + result.strIngredient18 + '</p>')
  var item19 = $('<p class="ingredientList">' + result.strMeasure19 + ' ' + result.strIngredient19 + '</p>')
  var item20 = $('<p class="ingredientList">' + result.strMeasure20 + ' ' + result.strIngredient20 + '</p>')
  ingrDiv.append(ingrTitle)
  ingrDiv.append(item1)
  ingrDiv.append(item2)
  ingrDiv.append(item3)
  ingrDiv.append(item4)
  ingrDiv.append(item5)
  ingrDiv.append(item6)
  ingrDiv.append(item7)
  ingrDiv.append(item8)
  ingrDiv.append(item9)
  ingrDiv.append(item10)
  ingrDiv.append(item11)
  ingrDiv.append(item12)
  ingrDiv.append(item13)
  ingrDiv.append(item14)
  ingrDiv.append(item15)
  ingrDiv.append(item16)
  ingrDiv.append(item17)
  ingrDiv.append(item18)
  ingrDiv.append(item19)
  ingrDiv.append(item20)
  
  var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
  ingrDiv.append(dirTitle)

  var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
  ingrDiv.append(directions)
   
  $('#fullView').append(ingrDiv)

   //Button to favorite meal
 $('.uk-icon').on('click', function(e){
  var favBtn = $(this)
  console.log(favBtn)
  favBtn.attr('style', 'color: red')
  var favId = favBtn.attr('data-id')
  if(favoriteMeals.indexOf(favId) == '-1'){
  favoriteMeals.push(favId)
  console.log(favoriteMeals)
  }
})

})
})
})
}) 




//Button to return random meal
$('.btn-meal-random').on('click', function(e){
  e.preventDefault()
  modalMeal.style.display = "none";
  $('#mealDiv').attr('style', 'display: none;')
  $('#cocktailDiv').attr('style', 'display: none;')
  $('#restaurantDiv').attr('style', 'display: none;')
  
 var queryUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'
 
 $.ajax({
  url: queryUrl,
  method: "GET"
 }).then(function(response){
  console.log(response)
  
  var searchTitle = $('<h1>Variety is the spice of life. Enjoy...</h1>')
  $('#search-results').append(searchTitle)
 
      
  var newDiv = $("<div class='uk-card uk-card-default uk-card-body'></div>")
  var newTitle = $('<button class="mainTitle uk-button uk-button-default" data-type="mealView">'+ response.meals[0].strMeal + '</button>')
  var mealImage = $('<img>')
  var favIcon = $('<button uk-icon="icon: heart"></button>')
  var mealId = response.meals[0].idMeal
 
  mealImage.attr('src', response.meals[0].strMealThumb)
  newTitle.attr('data-id', mealId)
  favIcon.attr('data-id', mealId)
  favIcon.attr('style', 'display: block')
  favIcon.attr('class', 'uk-button uk-button-default uk-icon')
  newDiv.append(newTitle)
  newDiv.append(favIcon)
  newDiv.append(mealImage)
   
  $('#search-results').append(newDiv)

  
 
  //Button to favorite meal
  $('.uk-icon').on('click', function(){
 
      favIcon.attr('style', 'color: red')
      var favId = favIcon.attr('data-id')
      if(favoriteMeals.indexOf(favId) == '-1'){
      favoriteMeals.push(favId)
      console.log(favoriteMeals)
      }
  })
 
  //Button to open full view
 $('.mainTitle').on('click', function(b){
  b.preventDefault()
  $('#fullView').empty()
  var viewBtn = $(this)

  modalView.style.display = "block";
  console.log(viewBtn)
  
  var itemId = viewBtn.attr('data-id')
  var btnType = viewBtn.attr('data-type')
  if( btnType == 'mealView'){
    queryUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + itemId + '&api-key=1'
  }

$.ajax({
  url: queryUrl,
  method: 'GET'
}).then(function(view){
  console.log(view)
  var result = view.meals[0]
  var viewDiv = $("<div class='uk-card-media-left uk-cover-container'></div>")
  var newTitle = $('<h3 class="uk-card-title">'+ result.strMeal + '</h3>')
  var mealImage = $('<img>')
  var viewIcon = $('<button uk-icon="icon: heart"></button>')
  var viewId = result.idMeal
 
  mealImage.attr('src', result.strMealThumb)
  viewIcon.attr('data-id', viewId)
  viewIcon.attr('style', 'display: block')
  viewIcon.attr('class', 'uk-button uk-button-default uk-icon')
  viewDiv.append(newTitle)
  viewDiv.append(viewIcon)
  viewDiv.append(mealImage)
  $('#fullView').append(viewDiv)

  var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
  var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')
  var item1 = $('<p class="ingredientList">' + result.strMeasure1 + ' ' + result.strIngredient1 + '</p>')
  var item2 = $('<p class="ingredientList">' + result.strMeasure2 + ' ' + result.strIngredient2 + '</p>')
  var item3 = $('<p class="ingredientList">' + result.strMeasure3 + ' ' + result.strIngredient3 + '</p>')
  var item4 = $('<p class="ingredientList">' + result.strMeasure4 + ' ' + result.strIngredient4 + '</p>')
  var item5 = $('<p class="ingredientList">' + result.strMeasure5 + ' ' + result.strIngredient5 + '</p>')
  var item6 = $('<p class="ingredientList">' + result.strMeasure6 + ' ' + result.strIngredient6 + '</p>')
  var item7 = $('<p class="ingredientList">' + result.strMeasure7 + ' ' + result.strIngredient7 + '</p>')
  var item8 = $('<p class="ingredientList">' + result.strMeasure8 + ' ' + result.strIngredient8 + '</p>')
  var item9 = $('<p class="ingredientList">' + result.strMeasure9 + ' ' + result.strIngredient9 + '</p>')
  var item10 = $('<p class="ingredientList">' + result.strMeasure10 + ' ' + result.strIngredient10 + '</p>')
  var item11 = $('<p class="ingredientList">' + result.strMeasure11 + ' ' + result.strIngredient11 + '</p>')
  var item12 = $('<p class="ingredientList">' + result.strMeasure12 + ' ' + result.strIngredient12 + '</p>')
  var item13 = $('<p class="ingredientList">' + result.strMeasure13 + ' ' + result.strIngredient13 + '</p>')
  var item14 = $('<p class="ingredientList">' + result.strMeasure14 + ' ' + result.strIngredient14 + '</p>')
  var item15 = $('<p class="ingredientList">' + result.strMeasure15 + ' ' + result.strIngredient15 + '</p>')
  var item16 = $('<p class="ingredientList">' + result.strMeasure16 + ' ' + result.strIngredient16 + '</p>')
  var item17 = $('<p class="ingredientList">' + result.strMeasure17 + ' ' + result.strIngredient17 + '</p>')
  var item18 = $('<p class="ingredientList">' + result.strMeasure18 + ' ' + result.strIngredient18 + '</p>')
  var item19 = $('<p class="ingredientList">' + result.strMeasure19 + ' ' + result.strIngredient19 + '</p>')
  var item20 = $('<p class="ingredientList">' + result.strMeasure20 + ' ' + result.strIngredient20 + '</p>')
  ingrDiv.append(ingrTitle)
  ingrDiv.append(item1)
  ingrDiv.append(item2)
  ingrDiv.append(item3)
  ingrDiv.append(item4)
  ingrDiv.append(item5)
  ingrDiv.append(item6)
  ingrDiv.append(item7)
  ingrDiv.append(item8)
  ingrDiv.append(item9)
  ingrDiv.append(item10)
  ingrDiv.append(item11)
  ingrDiv.append(item12)
  ingrDiv.append(item13)
  ingrDiv.append(item14)
  ingrDiv.append(item15)
  ingrDiv.append(item16)
  ingrDiv.append(item17)
  ingrDiv.append(item18)
  ingrDiv.append(item19)
  ingrDiv.append(item20)
  
  var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
  ingrDiv.append(dirTitle)

  var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
  ingrDiv.append(directions)
   
  $('#fullView').append(ingrDiv)

  // Button to favorite meal
  $('.uk-icon').on('click', function(){
 
    favIcon.attr('style', 'color: red')
    var favId = favIcon.attr('data-id')
    if(favoriteMeals.indexOf(favId) == '-1'){
    favoriteMeals.push(favId)
    console.log(favoriteMeals)
    }
})

})

})
 }) 
 }) 




//Button to search drinks
$('.btn-drink').on('click', function(e){
    e.preventDefault()
    modalCocktail.style.display = "none";
    $('#mealDiv').attr('style', 'display: none;')
    $('#cocktailDiv').attr('style', 'display: none;')
    $('#restaurantDiv').attr('style', 'display: none;')
   var drink = $('#drinkKeyword').val().trim()
   var drinkOption = $('#drinkSelect').val()
   if( drinkOption == 'drinkName'){
   var queryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ drink + '&api-key=1'} else if( drinkOption == 'drinkIngredient'){
    var queryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+ drink + '&api-key=1'} else if( drinkOption == 'glassType'){
      var queryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g='+ drink + '&api-key=1'}
       
   $.ajax({
    url: queryUrl,
    method: "GET"
   }).then(function(response){
    console.log(response)
    var drinkTitle = $('<h1>'+ (response.drinks.length + 1) + ' Results for ' + drink + '</h1>')
    $('#search-results').append(drinkTitle)

    if(response.drinks == null){
      var noResults = $("<h2>I'm sorry. We didn't find any results. Please start over.</h2>")
      $('#search-results').append(noResults)} else {
    for(var i = 0; i < response.drinks.length; i++){
    
      var newDiv = $("<div class='uk-card uk-card-default uk-card-body'></div>")
      var newTitle = $('<button class="mainTitle uk-button uk-button-default" data-type="drinkView">'+ response.drinks[i].strDrink + '</button>')
      var drinkImage = $('<img>')
      var favIcon = $('<button uk-icon="icon: heart"></button>')
      var drinkId = response.drinks[i].idDrink
      drinkImage.attr('src', response.drinks[i].strDrinkThumb)
      newTitle.attr('data-id', drinkId)
      favIcon.attr('data-id', drinkId)
      favIcon.attr('style', 'display: block')
      favIcon.attr('class', 'uk-button uk-button-default uk-icon')
      newDiv.append(newTitle)
      newDiv.append(favIcon)
      newDiv.append(drinkImage)
       
      $('#search-results').append(newDiv)
   
    }}
    
    $('.uk-icon').on('click', function(){
   
        favIcon.attr('style', 'color: red')
        var favId = favIcon.attr('data-id')
        if(favoriteDrinks.indexOf(favId) == '-1'){
        favoriteDrinks.push(favId)
        console.log(favoriteDrinks)
        }
    }) 

  //Button to open full view
 $('.mainTitle').on('click', function(b){
  b.preventDefault()
  $('#fullView').empty()
  var viewBtn = $(this)

  modalView.style.display = "block";
  console.log(viewBtn)
  
  var itemId = viewBtn.attr('data-id')
  var btnType = viewBtn.attr('data-type')
  if( btnType == 'drinkView'){
    queryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + itemId + '&api-key=1'
  }

$.ajax({
  url: queryUrl,
  method: 'GET'
}).then(function(view){
  console.log(view)
  var result = view.drinks[0]
  var viewDiv = $("<div class='uk-card-media-left uk-cover-container'></div>")
  var newTitle = $('<h3 class="uk-card-title">'+ result.strDrink + '</h3>')
  var drinkImage = $('<img>')
  var viewIcon = $('<button uk-icon="icon: heart"></button>')
  var viewId = result.idDrink
 
  drinkImage.attr('src', result.strDrinkThumb)
  viewIcon.attr('data-id', viewId)
  viewIcon.attr('style', 'display: block')
  viewIcon.attr('class', 'uk-button uk-button-default uk-icon')
  viewDiv.append(newTitle)
  viewDiv.append(viewIcon)
  viewDiv.append(drinkImage)
  $('#fullView').append(viewDiv)

  var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
  var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')

  var item1 = $('<p class="ingredientList">' + result.strMeasure1 + ' ' + result.strIngredient1 + '</p>')
  var item2 = $('<p class="ingredientList">' + result.strMeasure2 + ' ' + result.strIngredient2 + '</p>')
  var item3 = $('<p class="ingredientList">' + result.strMeasure3 + ' ' + result.strIngredient3 + '</p>')
  var item4 = $('<p class="ingredientList">' + result.strMeasure4 + ' ' + result.strIngredient4 + '</p>')
  var item5 = $('<p class="ingredientList">' + result.strMeasure5 + ' ' + result.strIngredient5 + '</p>')
  var item6 = $('<p class="ingredientList">' + result.strMeasure6 + ' ' + result.strIngredient6 + '</p>')
  var item7 = $('<p class="ingredientList">' + result.strMeasure7 + ' ' + result.strIngredient7 + '</p>')
  var item8 = $('<p class="ingredientList">' + result.strMeasure8 + ' ' + result.strIngredient8 + '</p>')
  var item9 = $('<p class="ingredientList">' + result.strMeasure9 + ' ' + result.strIngredient9 + '</p>')
  var item10 = $('<p class="ingredientList">' + result.strMeasure10 + ' ' + result.strIngredient10 + '</p>')
  var item11 = $('<p class="ingredientList">' + result.strMeasure11 + ' ' + result.strIngredient11 + '</p>')
  var item12 = $('<p class="ingredientList">' + result.strMeasure12 + ' ' + result.strIngredient12 + '</p>')
  var item13 = $('<p class="ingredientList">' + result.strMeasure13 + ' ' + result.strIngredient13 + '</p>')
  var item14 = $('<p class="ingredientList">' + result.strMeasure14 + ' ' + result.strIngredient14 + '</p>')
  var item15 = $('<p class="ingredientList">' + result.strMeasure15 + ' ' + result.strIngredient15 + '</p>')
  
  ingrDiv.append(ingrTitle)
  ingrDiv.append(item1)
  ingrDiv.append(item2)
  ingrDiv.append(item3)
  ingrDiv.append(item4)
  ingrDiv.append(item5)
  ingrDiv.append(item6)
  ingrDiv.append(item7)
  ingrDiv.append(item8)
  ingrDiv.append(item9)
  ingrDiv.append(item10)
  ingrDiv.append(item11)
  ingrDiv.append(item12)
  ingrDiv.append(item13)
  ingrDiv.append(item14)
  ingrDiv.append(item15)
  
  
  var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
  ingrDiv.append(dirTitle)

  var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
  ingrDiv.append(directions)
   
  $('#fullView').append(ingrDiv)

  // Button to favorite drink
  $('.uk-icon').on('click', function(){
 
    favIcon.attr('style', 'color: red')
    var favId = favIcon.attr('data-id')
    if(favoriteDrinks.indexOf(favId) == '-1'){
    favoriteDrinks.push(favId)
    console.log(favoriteDrinks)
    }
})

})

})

   })
   }) 



   //Button for random drink
   $('.btn-drink-random').on('click', function(e){
    e.preventDefault()
    modalCocktail.style.display = "none";
    $('#mealDiv').attr('style', 'display: none;')
    $('#cocktailDiv').attr('style', 'display: none;')
    $('#restaurantDiv').attr('style', 'display: none;')
  
    var queryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  
   $.ajax({
    url: queryUrl,
    method: "GET"
   }).then(function(response){
    console.log(response)
    var drinkTitle = $('<h1>Variety is the spice of life. Enjoy...</h1>')
    $('#search-results').append(drinkTitle)  
      var newDiv = $("<div class='uk-card uk-card-default uk-card-body'></div>")
      var newTitle = $('<button class="mainTitle uk-button uk-button-default" data-type="drinkView">'+ response.drinks[0].strDrink + '</button>')
      var drinkImage = $('<img>')
      var favIcon = $('<button uk-icon="icon: heart"></button>')
      var drinkId = response.drinks[0].idDrink
      drinkImage.attr('src', response.drinks[0].strDrinkThumb)
      newTitle.attr('data-id', drinkId)
      favIcon.attr('data-id', drinkId)
      favIcon.attr('style', 'display: block')
      favIcon.attr('class', 'uk-button uk-button-default uk-icon')
      newDiv.append(newTitle)
      newDiv.append(favIcon)
      newDiv.append(drinkImage)
       
      $('#search-results').append(newDiv)
   
    $('.uk-icon').on('click', function(){
   
        favIcon.attr('style', 'color: red')
        var favId = favIcon.attr('data-id')
        if(favoriteDrinks.indexOf(favId) == '-1'){
        favoriteDrinks.push(favId)
        console.log(favoriteDrinks)
        }
    })
    
  //Button to open full view
  $('.mainTitle').on('click', function(b){
    b.preventDefault()
    $('#fullView').empty()
    var viewBtn = $(this)
  
    modalView.style.display = "block";
    console.log(viewBtn)
    
    var itemId = viewBtn.attr('data-id')
    var btnType = viewBtn.attr('data-type')
    if( btnType == 'drinkView'){
      queryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + itemId + '&api-key=1'
    }
  
  $.ajax({
    url: queryUrl,
    method: 'GET'
  }).then(function(view){
    console.log(view)
    var result = view.drinks[0]
    var viewDiv = $("<div class='uk-card-media-left uk-cover-container'></div>")
    var newTitle = $('<h3 class="uk-card-title">'+ result.strDrink + '</h3>')
    var drinkImage = $('<img>')
    var viewIcon = $('<button uk-icon="icon: heart"></button>')
    var viewId = result.idDrink
   
    drinkImage.attr('src', result.strDrinkThumb)
    viewIcon.attr('data-id', viewId)
    viewIcon.attr('style', 'display: block')
    viewIcon.attr('class', 'uk-button uk-button-default uk-icon')
    viewDiv.append(newTitle)
    viewDiv.append(viewIcon)
    viewDiv.append(drinkImage)
    $('#fullView').append(viewDiv)
  
    var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
    var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')
  
    var item1 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure1 + '</span>' + ' ' + '<span class="check">' + result.strIngredient1 + '</span>' + '</p>')
    var item2 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure2 + '</span>' + ' ' + '<span class="check">' + result.strIngredient2 + '</span>' + '</p>')
    var item3 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure3 + '</span>' + ' ' + '<span class="check">' + result.strIngredient3 + '</span>' + '</p>')
    var item4 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure4 + '</span>' + ' ' + '<span class="check">' + result.strIngredient4 + '</span>' + '</p>')
    var item5 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure5 + '</span>' + ' ' + '<span class="check">' + result.strIngredient5 + '</span>' + '</p>')
    var item6 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure6 + '</span>' + ' ' + '<span class="check">' + result.strIngredient6 + '</span>' + '</p>')
    var item7 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure7 + '</span>' + ' ' + '<span class="check">' + result.strIngredient7 + '</span>' + '</p>')
    var item8 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure8 + '</span>' + ' ' + '<span class="check">' + result.strIngredient8 + '</span>' + '</p>')
    var item9 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure9 + '</span>' + ' ' + '<span class="check">' + result.strIngredient9 + '</span>' + '</p>')
    var item10 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure10 + '</span>' + ' ' + '<span class="check">' + result.strIngredient10 + '</span>' + '</p>')
    var item11 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure11 + '</span>' + ' ' + '<span class="check">' + result.strIngredient11 + '</span>' + '</p>')
    var item12 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure12 + '</span>' + ' ' + '<span class="check">' + result.strIngredient12 + '</span>' + '</p>')
    var item13 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure13 + '</span>' + ' ' + '<span class="check">' + result.strIngredient13 + '</span>' + '</p>')
    var item14 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure14 + '</span>' + ' ' + '<span class="check">' + result.strIngredient14 + '</span>' + '</p>')
    var item15 = $('<p class="ingredientList">' + '<span class="check">' + result.strMeasure15 + '</span>' + ' ' + '<span class="check">' + result.strIngredient15 + '</span>' + '</p>')
    
    ingrDiv.append(ingrTitle)

    var nullCheck = $('span.check')
    for(var x = 0; x < nullCheck.length; x ++){
      var content = nullCheck[x].text()
      if(content == 'null'){
        nullCheck[x].text('')
      }
    }

    
    ingrDiv.append(item1)
    ingrDiv.append(item2)
    ingrDiv.append(item3)
    ingrDiv.append(item4)
    ingrDiv.append(item5)
    ingrDiv.append(item6)
    ingrDiv.append(item7)
    ingrDiv.append(item8)
    ingrDiv.append(item9)
    ingrDiv.append(item10)
    ingrDiv.append(item11)
    ingrDiv.append(item12)
    ingrDiv.append(item13)
    ingrDiv.append(item14)
    ingrDiv.append(item15)
    
    
    var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
    ingrDiv.append(dirTitle)
  
    var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
    ingrDiv.append(directions)
     
    $('#fullView').append(ingrDiv)
  
    // Button to favorite drink
    $('.uk-icon').on('click', function(){
   
      favIcon.attr('style', 'color: red')
      var favId = favIcon.attr('data-id')
      if(favoriteDrinks.indexOf(favId) == '-1'){
      favoriteDrinks.push(favId)
      console.log(favoriteDrinks)
      }
  })
  
  })
  
  })


   })
    
   }) 
   


// Button for the restaurant search
$('.btn-restaurant').on('click', function(e){
 e.preventDefault()
 modalRestaurant.style.display = "none";
 $('#mealDiv').attr('style', 'display: none;')
 $('#cocktailDiv').attr('style', 'display: none;')
 $('#restaurantDiv').attr('style', 'display: none;')
var place = $('#city').val().trim()
var restaurantKeyword = $('#restaurantKeyword').val().trim()
var locationUrl = 'https://developers.zomato.com/api/v2.1/locations?query=' + place
$.ajax({
  url: locationUrl,
  method: "GET",
  headers: {'user-key': '8b3fec82b5d8fb68a801540078df89dc'}
 }).then(function(loc){
   console.log(loc)
  var entityId = loc.location_suggestions[0].entity_id
  var entityType = loc.location_suggestions[0].entity_type
  if(entityId == null){
      var noLocation = $("<h2>I'm sorry. We didn't recognize that location. Please start over.</h2>")
      $('#search-results').append(noLocation)
  } else {

var queryUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id='+ entityId +'&entity_type='+ entityType +'&q='+ restaurantKeyword
console.log(queryUrl)

$.ajax({
 url: queryUrl,
 method: "GET",
 headers: {'user-key': '8b3fec82b5d8fb68a801540078df89dc'}
}).then(function(response){
 console.log(response.restaurants[0].restaurant.thumb)
    
 var restaurantTitle = $('<h1>'+ (response.results_found) + ' Results for ' + restaurantKeyword + '</h1>')
 $('#search-results').append(restaurantTitle)

 if(response.restaurants == null){
   var noResults = $("<h2>I'm sorry. We didn't find any results. Please start over.</h2>")
   $('#search-results').append(noResults)} else {
 for(var i = 0; i < response.restaurants.length; i++){
   var result = response.restaurants[i].restaurant
   var newDiv = $("<div class='uk-card uk-card-default uk-card-body'></div>")
   var newTitle = $('<h3 class="uk-card-title"><a href="'+ result.url + '" target="_blank">' + result.name + '</a></h3>')
   var restaurantImage = $('<img>')
   var favIcon = $('<button uk-icon="icon: heart"></button>')
   var restaurantId = result.id
   var thumbPic = result.thumbPic
   
   favIcon.attr('data-id', restaurantId)
   favIcon.attr('style', 'display: block')
   favIcon.attr('class', 'uk-button uk-button-default uk-icon')
   newDiv.append(newTitle)
   newDiv.append(favIcon)
   if(thumbPic == ""){
    restaurantImage.attr('src', './no_image.png') 
    newDiv.append(restaurantImage)
    } else{
     restaurantImage.attr('src', result.thumb) 
     newDiv.append(restaurantImage) 
    }
   
    
   $('#search-results').append(newDiv)

 }}






    // $('.far').on('click', function(){

    //     favIcon.attr('class', 'fas fa-heart')
    //     var favId = favIcon.attr('data-id')
    //     if(favoriteMeals.indexOf(favId) == '-1'){
    //     favoriteMeals.push(favId)
    //     console.log(favoriteMeals)
    //     }
    // })
 
}) }})
 
}) 

// Get the modal for Meals
var modalMeal = document.getElementById("myModalMeal");

// Get the button that opens the modal
var btn = document.getElementById("myBtnMeal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modalMeal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalMeal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalMeal) {
    modalMeal.style.display = "none";
  }
}

// Get the modal for Cocktails
var modalCocktail = document.getElementById("myModalCocktail");

// Get the button that opens the modal
var btn = document.getElementById("myBtnCocktail");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modalCocktail.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalCocktail.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalCocktail) {
    modalCocktail.style.display = "none";
  }
}

// Get the modal for Restaurants
var modalRestaurant = document.getElementById("myModalRestaurant");

// Get the button that opens the modal
var btn = document.getElementById("myBtnRestaurant");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[2];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modalRestaurant.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalRestaurant.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalRestaurant) {
    modalRestaurant.style.display = "none";
  }
}

// Get the modal for Full View
var modalView = document.getElementById("myModalView");

// Get the button that opens the modal
var btn = document.getElementById("myBtnRestaurant");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[3];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalView.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalRestaurant) {
    modalView.style.display = "none";
  }
}

