// Griglia 6x6, ad ogni click parte una
// richiesta AJAX che prende un
// numero random da 1 a 9.
// Se è <= 5 il quadrato diventa giallo,
// se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro
// del quadrato

function addListeners () {
  var square = $('.square');
  square.click(getInt);
}

function getInt () {

  var template = $('#int-template').html();
  var compiled = Handlebars.compile(template);

  var square = $(this);
  var target = square.find('.target');

  if (target.length==0) {
    square.empty();
    // square.removeClass('yellow green');

    $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/random/int',
      method: 'GET',
      success: function(data, state) {
        // console.log(data);
        var success = data['success'];
        var int = data['response'];
        // console.log(int);
        if (success) {
          var objInt = {
            'int': int
          }
          if (int <= 5) {
            square.addClass('yellow');
          } else {
            square.addClass('green');
          }
          // console.log(objInt);
          var intHTML = compiled(objInt);
          square.append(intHTML);
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
  addListeners();
}

$(document).ready(init);
