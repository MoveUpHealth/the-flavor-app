var favoriteMeals = []
var favoriteDrinks = []
var favoriteRestaurants = []

//INITIALIZING
function init(){

  if(localStorage.getItem('fav meals') !== null){
   var savedMeals = JSON.parse(localStorage.getItem('fav meals')) 
   for(var x = 0; x < savedMeals.length; x ++ ){
    favoriteMeals.push(savedMeals[x])
  }}
  if(localStorage.getItem('fav drinks') !== null){
    var savedDrinks = JSON.parse(localStorage.getItem('fav drinks'))
    for(var x = 0; x < savedDrinks.length; x ++ ){
    favoriteDrinks.push(savedDrinks[x])
  }}
  if(localStorage.getItem('fav restaurants') !== null){
    var savedRestaurants = JSON.parse(localStorage.getItem('fav restaurants'))
    for(var x = 0; x < savedRestaurants.length; x ++ ){
    
    favoriteRestaurants.push(savedRestaurants[x])
  }}
}

init()
// END INITIALIZING

// NAV HOME BUTTON
$('#navHome').on('click', function(e){
  e.preventDefault()
  $('.titles').empty()
  $('#search-results').empty()
  $('#mealDiv').attr('style', 'display: flex;')
  $('#cocktailDiv').attr('style', 'display: flex;')
  $('#restaurantDiv').attr('style', 'display: flex;')
})
// END NAV HOME BUTTON

//NAV MY RESTAURANT BUTTON
$('#navRestaurant').on('click', function(e){
  e.preventDefault()
  $('.titles').empty()
  $('#search-results').empty()
  $('#mealDiv').attr('style', 'display: none;')
  $('#cocktailDiv').attr('style', 'display: none;')
  $('#restaurantDiv').attr('style', 'display: none;')

    for(var x = 0; x < favoriteRestaurants.length; x ++ ){
      var favUrl = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + favoriteRestaurants[x]

  $.ajax({
    url: favUrl,
    method: "GET",
    headers: {'user-key': '8b3fec82b5d8fb68a801540078df89dc'}
   }).then(function(fav){
     console.log(fav)
     
     var newDiv = $("<div class='uk-card uk-card-default uk-card-body'></div>")
     var newTitle = $('<h3 class="uk-card-title"><a href="'+ fav.url + '" target="_blank">' + fav.name + '</a></h3>')
     var restaurantImage = $('<img>')
     var favIcon = $('<button uk-icon="icon: heart"></button>')
     var restaurantId = fav.id
     var thumbPic = fav.thumbPic
     
     favIcon.attr('data-id', restaurantId)
     favIcon.attr('style', 'display: block')
     favIcon.attr('class', 'uk-button uk-button-default uk-icon')
     if (favoriteRestaurants.includes(restaurantId) == true){
       console.log(restaurantId)
       favIcon.attr('style', 'color: red')
     }
     newDiv.append(newTitle)
     newDiv.append(favIcon)
     if(thumbPic == ""){
       restaurantImage.attr('src', './no_image.png') 
       newDiv.append(restaurantImage)
       } else{
       restaurantImage.attr('src', fav.thumb) 
       newDiv.append(restaurantImage) 
       }
     
       
     $('#search-results').append(newDiv)
   
  })}
})
// END NAV RESTAURANT BUTTON

//NAV FAVORITE MEAL RECIPES
$('#navMeals').on('click', function(e){
  e.preventDefault()
  $('.titles').empty()
  $('#search-results').empty()
  $('#mealDiv').attr('style', 'display: none;')
  $('#cocktailDiv').attr('style', 'display: none;')
  $('#restaurantDiv').attr('style', 'display: none;')

  var deferredMeals = [] 
 
  $.each(favoriteMeals, function(index) {
  let queryUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + favoriteMeals[index] + '&api-key=1'
  console.log(queryUrl)
  deferredMeals.push(
  $.ajax({
    url: queryUrl,
    method: "GET"
   })
   )
  })
    
  $.when.apply($, deferredMeals).then(function (){
    for(i = 0; i < deferredMeals.length; i++){
    var result = deferredMeals[i].responseJSON.meals[0]
    var newDiv = $("<div class='uk-card uk-card-default uk-card-body'></div>")
        var newTitle = $('<button class="mainTitle uk-button uk-button-default" data-type="mealView">'+ result.strMeal + '</button>')
        var mealImage = $('<img>')
        var favIcon = $('<button uk-icon="icon: heart"></button>')
        var mealId = result.idMeal

        mealImage.attr('src', result.strMealThumb)
        newTitle.attr('data-id', mealId)
        favIcon.attr('data-id', mealId)
        favIcon.attr('style', 'display: block')
        favIcon.attr('class', 'uk-button uk-button-default uk-icon')
        if (favoriteMeals.includes(mealId) == true){
          favIcon.attr('style', 'color: red')
        }
        newDiv.append(newTitle)
        newDiv.append(favIcon)
        newDiv.append(mealImage)

        $('#search-results').append(newDiv)
     }

      //Button to open full view
      $('.mainTitle').on('click', function(b){
        b.preventDefault()
        $('#fullView').empty()
        let viewBtn = $(this)
      
        modalView.style.display = "block";
        console.log(viewBtn)
        
        let itemId = viewBtn.attr('data-id')
        
        
         let viewUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + itemId + '&api-key=1'
        console.log(viewUrl)
        console.log(itemId)
      
      $.ajax({
        url: viewUrl,
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
        if (favoriteMeals.includes(viewId) == true){
          viewIcon.attr('style', 'color: red')
        }
        viewDiv.append(newTitle)
        viewDiv.append(viewIcon)
        viewDiv.append(mealImage)
        $('#fullView').append(viewDiv)
      
        var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
        var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')
        ingrDiv.append(ingrTitle)

    for (var i = 1; i <= 20; i++) {
      var item = $('<p class="ingredientList">' + (result["strMeasure" + i] ? result["strMeasure" + i] : "") + ' ' + (result["strIngredient" + i] ? result["strIngredient" + i] : "") + '</p>');
      ingrDiv.append(item);
    }
        
        var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
        ingrDiv.append(dirTitle)
      
        var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
        ingrDiv.append(directions)
         
        $('#fullView').append(ingrDiv)
      
      }) 
      })
  })
  })
// END NAV FAVORITE MEAL RECIPES

//NAV FAVORITE DRINK RECIPES
$('#navDrinks').on('click', function(e){
  e.preventDefault()
  $('.titles').empty()
  $('#search-results').empty()
  $('#mealDiv').attr('style', 'display: none;')
  $('#cocktailDiv').attr('style', 'display: none;')
  $('#restaurantDiv').attr('style', 'display: none;')

  var deferredDrinks = [] 
 
  $.each(favoriteDrinks, function(index) {
  let queryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + favoriteDrinks[index] + '&api-key=1'
  console.log(queryUrl)
  deferredDrinks.push(
  $.ajax({
    url: queryUrl,
    method: "GET"
   })
   )
  })
    
  $.when.apply($, deferredDrinks).then(function (){
    for(i = 0; i < deferredDrinks.length; i++){
    var result = deferredDrinks[i].responseJSON.drinks[0]

    var newDiv = $("<div class='uk-card uk-card-default uk-card-body'></div>")
      var newTitle = $('<button class="mainTitle uk-button uk-button-default" data-type="drinkView">'+ result.strDrink + '</button>')
      var drinkImage = $('<img>')
      var favIcon = $('<button uk-icon="icon: heart"></button>')
      var drinkId = result.idDrink
      drinkImage.attr('src', result.strDrinkThumb)
      newTitle.attr('data-id', drinkId)
      favIcon.attr('data-id', drinkId)
      favIcon.attr('style', 'display: block')
      favIcon.attr('class', 'uk-button uk-button-default uk-icon')
      if (favoriteDrinks.includes(drinkId) == true){
        favIcon.attr('style', 'color: red')
      }
      newDiv.append(newTitle)
      newDiv.append(favIcon)
      newDiv.append(drinkImage)
       
      $('#search-results').append(newDiv)
    }
    
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
  if (favoriteDrinks.includes(viewId) == true){
    viewIcon.attr('style', 'color: red')
  }
  viewDiv.append(newTitle)
  viewDiv.append(viewIcon)
  viewDiv.append(drinkImage)
  $('#fullView').append(viewDiv)

  var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
  var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')

  ingrDiv.append(ingrTitle)

    for (var i = 1; i <= 15; i++) {
      var item = $('<p class="ingredientList">' + (result["strMeasure" + i] ? result["strMeasure" + i] : "") + ' ' + (result["strIngredient" + i] ? result["strIngredient" + i] : "") + '</p>');
      ingrDiv.append(item);
    }
  
  
  var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
  ingrDiv.append(dirTitle)

  var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
  ingrDiv.append(directions)
   
  $('#fullView').append(ingrDiv)
  })
})
})
})


//END NAV FAVORITE DRINK RECIPES


//BUTTON FOR MEAL SEARCH
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
 
if(response.meals == null){
         var noResults = $("<h2>I'm sorry. We didn't find any results. Please start over.</h2>")
         $('.titles').append(noResults)
     } else {

      //Search results
      var searchTitle = $('<h1>'+ (response.meals.length) +' Results for ' + mealKeyword + '</h1>')
      $('.titles').append(searchTitle)
        //Loop through results
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
        if (favoriteMeals.includes(mealId) == true){
          favIcon.attr('style', 'color: red')
        }
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
     localStorage.setItem('fav meals', JSON.stringify(favoriteMeals))
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
  if (favoriteMeals.includes(viewId) == true){
    viewIcon.attr('style', 'color: red')
  }
  viewDiv.append(newTitle)
  viewDiv.append(viewIcon)
  viewDiv.append(mealImage)
  $('#fullView').append(viewDiv)

  var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
  var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')
  ingrDiv.append(ingrTitle)

    for (var i = 1; i <= 20; i++) {
      var item = $('<p class="ingredientList">' + (result["strMeasure" + i] ? result["strMeasure" + i] : "") + ' ' + (result["strIngredient" + i] ? result["strIngredient" + i] : "") + '</p>');
      ingrDiv.append(item);
    }
  
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
  localStorage.setItem('fav meals', JSON.stringify(favoriteMeals))
  console.log(favoriteMeals)
  }
})
})
})
})
}) 
// END BUTTON FOR MEAL SEARCH



//BUTTON FOR RANDOM MEAL SEARCH
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
  $('.titles').append(searchTitle)
 
      
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
  if (favoriteMeals.includes(mealId) == true){
    favIcon.attr('style', 'color: red')
  }
  newDiv.append(newTitle)
  newDiv.append(favIcon)
  newDiv.append(mealImage)
   
  $('#search-results').append(newDiv)

  
 
  //Button to favorite meal
  $('.uk-icon').on('click', function(){
    var favBtn = $(this)
    console.log(favBtn)
    favBtn.attr('style', 'color: red')
    var favId = favBtn.attr('data-id')
      if(favoriteMeals.indexOf(favId) == '-1'){
      favoriteMeals.push(favId)
      localStorage.setItem('fav meals', JSON.stringify(favoriteMeals))
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
  if (favoriteMeals.includes(viewId) == true){
    viewIcon.attr('style', 'color: red')
  }
  viewDiv.append(newTitle)
  viewDiv.append(viewIcon)
  viewDiv.append(mealImage)
  $('#fullView').append(viewDiv)

  

  var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
  var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')
  ingrDiv.append(ingrTitle)

    for (var i = 1; i <= 20; i++) {
      var item = $('<p class="ingredientList">' + (result["strMeasure" + i] ? result["strMeasure" + i] : "") + ' ' + (result["strIngredient" + i] ? result["strIngredient" + i] : "") + '</p>');
      ingrDiv.append(item);
    }
  
  
  var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
  ingrDiv.append(dirTitle)

  var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
  ingrDiv.append(directions)
   
  $('#fullView').append(ingrDiv)

  // Button to favorite meal
  $('.uk-icon').on('click', function(){
    var favBtn = $(this)
    console.log(favBtn)
    favBtn.attr('style', 'color: red')
    var favId = favBtn.attr('data-id')
    if(favoriteMeals.indexOf(favId) == '-1'){
    favoriteMeals.push(favId)
    localStorage.setItem('fav meals', JSON.stringify(favoriteMeals))
    console.log(favoriteMeals)
    }
})

})

})
 }) 
 }) 
// END BUTTON FOR RANDOM MEAL SEARCH



//BUTTON FOR DRINK SEARCH
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
    

    if(response.drinks == null){
      var noResults = $("<h2>I'm sorry. We didn't find any results. Please start over.</h2>")
      $('.titles').append(noResults)} else {

      //Search results
      var drinkTitle = $('<h1>'+ (response.drinks.length) + ' Results for ' + drink + '</h1>')
      $('.titles').append(drinkTitle)
      //Loop through results
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
      if (favoriteDrinks.includes(drinkId) == true){
        favIcon.attr('style', 'color: red')
      }
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
        localStorage.setItem('fav drinks', JSON.stringify(favoriteDrinks))
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
  if (favoriteDrinks.includes(viewId) == true){
    viewIcon.attr('style', 'color: red')
  }
  viewDiv.append(newTitle)
  viewDiv.append(viewIcon)
  viewDiv.append(drinkImage)
  $('#fullView').append(viewDiv)

  var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
  var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')

  ingrDiv.append(ingrTitle)

    for (var i = 1; i <= 15; i++) {
      var item = $('<p class="ingredientList">' + (result["strMeasure" + i] ? result["strMeasure" + i] : "") + ' ' + (result["strIngredient" + i] ? result["strIngredient" + i] : "") + '</p>');
      ingrDiv.append(item);
    }
  
  
  var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
  ingrDiv.append(dirTitle)

  var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
  ingrDiv.append(directions)
   
  $('#fullView').append(ingrDiv)

  // Button to favorite drink
  $('.uk-icon').on('click', function(){
    var favBtn = $(this)
    console.log(favBtn)
    favBtn.attr('style', 'color: red')
    var favId = favBtn.attr('data-id')
    if(favoriteDrinks.indexOf(favId) == '-1'){
    favoriteDrinks.push(favId)
    localStorage.setItem('fav drinks', JSON.stringify(favoriteDrinks))
    console.log(favoriteDrinks)
    }
})

})

})

   })
   }) 
// END BUTTON FOR DRINK SEARCH


   //BUTTON FOR RANDOM DRINK SEARCH
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
    $('.titles').append(drinkTitle)  
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
      if (favoriteDrinks.includes(drinkId) == true){
        favIcon.attr('style', 'color: red')
      }
      newDiv.append(newTitle)
      newDiv.append(favIcon)
      newDiv.append(drinkImage)
       
      $('#search-results').append(newDiv)
    //Button to favorite the drink
    $('.uk-icon').on('click', function(){
      var favBtn = $(this)
      console.log(favBtn)
      favBtn.attr('style', 'color: red')
      var favId = favBtn.attr('data-id')
        if(favoriteDrinks.indexOf(favId) == '-1'){
        favoriteDrinks.push(favId)
        localStorage.setItem('fav drinks', JSON.stringify(favoriteDrinks))
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
    if (favoriteDrinks.includes(viewId) == true){
      
      viewIcon.attr('style', 'color: red')
    }
    viewDiv.append(newTitle)
    viewDiv.append(viewIcon)
    viewDiv.append(drinkImage)
    $('#fullView').append(viewDiv)
  
    var ingrDiv = $('<div class="uk-cover-container uk-flex uk-flex-column">')
    var ingrTitle = $('<h3 class="uk-card-title ingrTitle">Ingredient List</h3>')

    ingrDiv.append(ingrTitle)

    for (var i = 1; i <= 15; i++) {
      var item = $('<p class="ingredientList">' + (result["strMeasure" + i] ? result["strMeasure" + i] : "") + ' ' + (result["strIngredient" + i] ? result["strIngredient" + i] : "") + '</p>');
      ingrDiv.append(item);
    }
    
    
    var dirTitle = $('<h3 class="uk-card-title ingrTitle">Directions</h3>')
    ingrDiv.append(dirTitle)
  
    var directions = $('<p class="ingredientList">' + result.strInstructions + '</p>')
    ingrDiv.append(directions)
     
    $('#fullView').append(ingrDiv)
  
    // Button to favorite drink
    $('.uk-icon').on('click', function(){
      var favBtn = $(this)
      console.log(favBtn)
      favBtn.attr('style', 'color: red')
      var favId = favBtn.attr('data-id')
      if(favoriteDrinks.indexOf(favId) == '-1'){
      favoriteDrinks.push(favId)
      localStorage.setItem('fav drinks', JSON.stringify(favoriteDrinks))
      console.log(favoriteDrinks)
      }
  })
  
  })
  
  })


   })
    
   }) 
// END BUTTON FOR RANDOM DRINK SEARCH   


//BUTTON FOR RESTAURANT SEARCH
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
      $('.titles').append(noLocation)
  } else {

var queryUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id='+ entityId +'&entity_type='+ entityType +'&q='+ restaurantKeyword
console.log(queryUrl)

$.ajax({
 url: queryUrl,
 method: "GET",
 headers: {'user-key': '8b3fec82b5d8fb68a801540078df89dc'}
}).then(function(response){
 console.log(response)
    
 

 if(response.results_found == '0'){
   var noResults = $("<h2>I'm sorry. We didn't find any results. Please start over.</h2>")
   $('.titles').append(noResults)} else {

    var restaurantTitle = $('<h1>'+ (response.results_found) + ' Results for ' + restaurantKeyword + '</h1>')
    $('.titles').append(restaurantTitle)
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
      if (favoriteRestaurants.includes(restaurantId) == true){
        console.log(restaurantId)
        favIcon.attr('style', 'color: red')
      }
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

// Button to favorite restaurant
$('.uk-icon').on('click', function(){
  var favBtn = $(this)
  console.log(favBtn)
  favBtn.attr('style', 'color: red')
  var favId = favBtn.attr('data-id')
  if(favoriteRestaurants.indexOf(favId) == '-1'){
  favoriteRestaurants.push(favId)
  localStorage.setItem('fav restaurants', JSON.stringify(favoriteRestaurants))
  console.log(favoriteRestaurants)
  }
})
 
}) }})
 
}) 
// END BUTTON FOR MEAL SEARCH

// BEGIN MODAL FUNCTIONALITY

// Get the modal for Meals
var modalMeal = document.getElementById("myModalMeal");

// Get the button that opens the modal
var btn = document.getElementById("myBtnMeal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modalMeal.style.display = "block";
  $('#mealKeyword').val('')
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
  $('#drinkKeyword').val('')
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
  $('#restaurantKeyword').val('')
  $('#city').val('')
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

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[3];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalView.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalView) {
    modalView.style.display = "none";
  }
}

// END MODAL FUNCTIONALITY