var favoriteMeals = []
var favoriteDrinks = []
var favoriteRestaurants = []

console.log(window)

// $('.btn-meal').on('click', function(e){
//     e.preventDefault()
//     modalMeal.style.display = "none";
//     $('#mealDiv').attr('style', 'display: none;')
//     $('#cocktailDiv').attr('style', 'display: none;')
//     $('#restaurantDiv').attr('style', 'display: none;')
//    var meal = $('#mealName').val()
//    var ingredient = $('#mainIngredient').val()
//    var category = $('#Category').val()
//    console.log(category)
//    var queryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'
   
//    $.ajax({
//     url: queryUrl,
//     method: "GET"
//    }).then(function(response){
//     console.log(response)
//    })
// })


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
 var newTitle = $('<h3 class="uk-card-title">'+ response.meals[i].strMeal + '</h3>')
 var mealImage = $('<img>')
 var favIcon = $('<button uk-icon="icon: heart"></button>')
 var mealId = response.meals[i].idMeal

 mealImage.attr('src', response.meals[i].strMealThumb)
 favIcon.attr('data-id', mealId)
 favIcon.attr('style', 'display: block')
 favIcon.attr('class', 'uk-button uk-button-default uk-icon')
 newDiv.append(newTitle)
 newDiv.append(favIcon)
 newDiv.append(mealImage)
  
 $('#search-results').append(newDiv)
 }}
 

 //Button to favorite meal
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
  var newTitle = $('<h3 class="uk-card-title">'+ response.meals[0].strMeal + '</h3>')
  var mealImage = $('<img>')
  var favIcon = $('<button uk-icon="icon: heart"></button>')
  var mealId = response.meals[0].idMeal
 
  mealImage.attr('src', response.meals[0].strMealThumb)
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
      var newTitle = $('<h3 class="uk-card-title">'+ response.drinks[i].strDrink + '</h3>')
      var drinkImage = $('<img>')
      var favIcon = $('<button uk-icon="icon: heart"></button>')
      var drinkId = response.drinks[i].idDrink
      drinkImage.attr('src', response.drinks[i].strDrinkThumb)
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
      var newTitle = $('<h3 class="uk-card-title">'+ response.drinks[0].strDrink + '</h3>')
      var drinkImage = $('<img>')
      var favIcon = $('<button uk-icon="icon: heart"></button>')
      var drinkId = response.drinks[0].idDrink
      drinkImage.attr('src', response.drinks[0].strDrinkThumb)
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
   var newTitle = $('<h3 class="uk-card-title"><a href="'+ result.url + '">' + result.name + '</a></h3>')
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