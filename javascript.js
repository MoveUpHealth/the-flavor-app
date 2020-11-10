var favoriteMeals = []

$('.btn-search').on('click', function(e){
 e.preventDefault()
var meal = $('#keywords').val()
var queryUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+ meal + '&api-key=1'

$.ajax({
 url: queryUrl,
 method: "GET"
}).then(function(response){
 console.log(response)
 var newDiv = $("<div>")
 var mealImage = $('<img>')
 var favIcon = $('<button><i class="far fa-heart"></i></button>')
 var mealId = response.meals[0].idMeal
 mealImage.attr('src', response.meals[0].strMealThumb)
 favIcon.attr('data-id', mealId)
 newDiv.append(mealImage)
 newDiv.append(favIcon)
 $('#search-results').append(newDiv)

 $('.far').on('click', function(){

     favIcon.attr('class', 'fas fa-heart')
     var favId = favIcon.attr('data-id')
     if(favoriteMeals.indexOf(favId) == '-1'){
     favoriteMeals.push(favId)
     console.log(favoriteMeals)
     }
 })
 
})
 
}) 

// $('.btn-food').on('click', function(e){
//  e.preventDefault()
// var place = $('#restaurant').val()
// var inputWord = $('#foodType').val()
// var ZomatoKey = '8b3fec82b5d8fb68a801540078df89dc'
// var queryUrl = 'https://developers.zomato.com/api/v2.1/search?q='+ inputWord  + '&category=' + place
// console.log(queryUrl)
// $.ajax({
//  url: queryUrl,
//  method: "GET",
//  headers: {'user-key': '8b3fec82b5d8fb68a801540078df89dc'}
// }).then(function(response){
//  console.log(response)
// //     var newDiv = $("<div>")
// //     var mealImage = $('<img>')
// //     var favIcon = $('<button><i class="far fa-heart"></i></button>')
// //     var mealId = response.meals[0].idMeal
// //     mealImage.attr('src', response.meals[0].strMealThumb)
// //     favIcon.attr('data-id', mealId)
// //     newDiv.append(mealImage)
// //     newDiv.append(favIcon)
// //     $('#search-results').append(newDiv)

// //     $('.far').on('click', function(){

// //         favIcon.attr('class', 'fas fa-heart')
// //         var favId = favIcon.attr('data-id')
// //         if(favoriteMeals.indexOf(favId) == '-1'){
// //         favoriteMeals.push(favId)
// //         console.log(favoriteMeals)
// //         }
// //     })
 
// })
 
// }) 

// Get the modal for Meals
var modal = document.getElementById("myModalMeal");

// Get the button that opens the modal
var btn = document.getElementById("myBtnMeal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the modal for Cocktails
var modal = document.getElementById("myModalCocktail");

// Get the button that opens the modal
var btn = document.getElementById("myBtnCocktail");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the modal for Restaurants
var modal = document.getElementById("myModalRestaurant");

// Get the button that opens the modal
var btn = document.getElementById("myBtnRestaurant");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[2];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}