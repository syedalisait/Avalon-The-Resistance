var charobj = {};
var chararray = [];
var i = 0;
$(document).ready(function() {
  $('#submitchar').click(function() {
    var character = $('input[name=characters]:checked').val();
    var name = $('#playername').val();
    chararray[i] = name;
    i++;
    charobj[name] = character;
    $('input[name=characters]:checked').prop('checked', false);
    $('#playername').val('');
    //console.log(name, character);
    //console.log(charobj,chararray);
  });


  // Role Reveal Logic
  // Based on who the character is, get the appropriate player names
  // to be revealed and store it in respective arrays
  // This is done after all players submit their roles (When Reveal Role button is clicked)
  var Merlin = [];
  var Perceival = [];
  var Evil = [];

  $('#reveal').click(function() {
    $('#reveal').prop('disabled', true);
    $('#submitchar').prop('disabled', true);
    $('#next').show();
    $('#role').show();
    $('#content').text(chararray[0]);

    // Populate Merlin, Perceival and Evil arrays with roles they can see
    $.each(charobj, function (key, value) {
      if (value === 'Minion' || value === 'Assassin') {
        Evil.push(key);
        Merlin.push(key);
      }
      else if (value === 'Merlin') {
        Perceival.push(key);
      }
      else if (value === 'Morgana') {
        Perceival.push(key);
        Merlin.push(key);
        Evil.push(key);
      }
      else if (value === 'Oberon') {
        Merlin.push(key);
      }
    });
    //console.log(Merlin, Perceival, Evil);
  });


  // When Role button is selected, Parse through the hash
  // to find the role of the player and also reveal other
  // appropriate players who will visible to them
  var counter = 0;
  $('#role').click(function() {
    //console.log(charobj[chararray[counter]]);
    $('#content').text(chararray[counter] + ' : ' + charobj[chararray[counter]]);
    if (charobj[chararray[counter]] === 'Merlin') {
      $('#revealplayer').text('Evil: ' + Merlin);
    }

    else if (charobj[chararray[counter]] === 'Perceival') {
      $('#revealplayer').text('Merlin/Morgana: ' + Perceival);
    }

    else if (charobj[chararray[counter]] === 'Modred' ||
    charobj[chararray[counter]] === 'Minion' ||
    charobj[chararray[counter]] === 'Morgana' ||
    charobj[chararray[counter]] === 'Assassin') {
      $('#revealplayer').text('Evil: ' + Evil);
    }

    else if (charobj[chararray[counter]] === 'Oberon') {
      $('#revealplayer').text('You are Evil. Help Other Evil Players');
    }
    else {
      $('#revealplayer').text('You are Arthur. Help Perceival and Merlin');
    }
  });

  // When next button is selected, Hide the previous player information
  // and visibility. Show the current player name alone
  // Disable Next and role button once we parse all the players
  $('#next').click(function() {
    if (counter == i - 1) {
      $('#next').prop('disabled', true);
      $('#role').prop('disabled', true);
      $('#content').text('');
      $('#revealplayer').text('');
    }
    else {
      counter++;
      $('#content').text(chararray[counter]);
      $('#revealplayer').text('');
    }
  });
});
