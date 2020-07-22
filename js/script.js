// Griglia 6x6, ad ogni click parte una
// richiesta AJAX che prende un
// numero random da 1 a 9.
// Se è <= 5 il quadrato diventa giallo,
// se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro
// del quadrato

// disegno la griglia 6x6 di quadrati
function drawSquares () {
  var template = $('#square-template').html();
  var compiled = Handlebars.compile(template);
  var squareHTML = compiled();
  var target = $('.modal');
  for (var i = 0; i < 36; i++) {
    target.append(squareHTML);
  }
}

function addListeners () {
  var square = $('.square');
  square.click(getInt);
}

function getInt () {

  // var template = $('#int-template').html();
  // var compiled = Handlebars.compile(template);

  var square = $(this);
  var isClicked = square.hasClass('clicked');
  // var target = square.find('.target');

  // if (target.length==0) {
    // square.empty();
    // square.removeClass('yellow green');
  if (!isClicked) {

    $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/random/int',
      method: 'GET',
      success: function(data, state) {
        // console.log(data);
        var success = data['success'];
        var int = data['response'];
        // console.log(int);
        if (success) {
          square.append('<h1>' + int + '</h1>');
          square.addClass('clicked');
          if (int <= 5) {
             square.addClass('yellow');
           } else {
             square.addClass('green');
           }
          // var objInt = {
          //   'int': int
          // }
          // if (int <= 5) {
          //   square.addClass('yellow');
          // } else {
          //   square.addClass('green');
          // }
          // // console.log(objInt);
          // var intHTML = compiled(objInt);
          // square.append(intHTML);
        } else {
          alert('Attenzione ' + success);
        }

      },
      error: function(request, state, error) {
        var error = request['statusText'];
        alert('Attenzione ' + error);
      }
    });
  }

}

function init () {
  drawSquares();
  addListeners();
}

$(document).ready(init);
