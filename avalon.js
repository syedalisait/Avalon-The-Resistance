var characterhash = {};
var characterarray = [];

$(document).ready(function() {
  $('#submitcharacter').click(function() {
    var character = $('input[name=characters]:checked').val();
    var name = ToTitleCase($('#playername').val());

    // Validation for name and role
    if (name.trim().length === 0 || character === undefined) {
      alert("Enter a name and select your role");
      return false;
    }

    // Validation for duplicate roles entered except Arthur and Minion
    if (!(character === 'Minion' || character === 'Arthur')) {
      var returnvalue = $.inArray(character, Object.values(characterhash));
      console.log(returnvalue, character);
      if (returnvalue !== -1) {
        alert('This role is already taken. Stop the game if this is your role or Select a different role');
        return false;
      }
    }
    characterhash[name] = character;
    characterarray.push(name);
    $('input[name=characters]:checked').prop('checked', false);
    $('#playername').val('');
    //console.log(name, character);
    //console.log(characterhash, characterarray);
  });


  // Role Reveal Logic
  // Based on who the character is, get the appropriate player names
  // to be revealed and store it in respective arrays
  // This is done after all players submit their roles (When Reveal Role button is clicked)
  var Merlin = [];
  var Perceival = [];
  var Evil = [];

  $('#revealrole').click(function() {
    $('#revealrole').prop('disabled', true);
    $('#submitcharacter').prop('disabled', true);
    $('#next').show();
    $('#role').show();
    $('#content').text(characterarray[0]);

    // Populate Merlin, Perceival and Evil arrays with roles they can see
    $.each(characterhash, function (key, value) {
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
      else if (value === 'Modred') {
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
  // appropriate players who will be visible to them
  var counter = 0;
  $('#role').click(function() {
    //console.log(characterhash[characterarray[counter]]);
    $('#content').text(characterarray[counter] + ' : ' + characterhash[characterarray[counter]]);
    if (characterhash[characterarray[counter]] === 'Merlin') {
      $('#revealplayer').text('Evil: ' + Merlin.join(', '));
    }

    else if (characterhash[characterarray[counter]] === 'Perceival') {
      $('#revealplayer').text('Merlin/Morgana: ' + Perceival.join(', '));
    }

    else if (characterhash[characterarray[counter]] === 'Modred' ||
    characterhash[characterarray[counter]] === 'Minion' ||
    characterhash[characterarray[counter]] === 'Morgana' ||
    characterhash[characterarray[counter]] === 'Assassin') {
      $('#revealplayer').text('Evil: ' + Evil.join(', '));
    }

    else if (characterhash[characterarray[counter]] === 'Oberon') {
      $('#revealplayer').text('You are Evil');
    }
    else {
      $('#revealplayer').text('You are Good');
    }
  });

  // When next button is selected, Hide the previous player information
  // and visibility. Show the current player name alone
  // Disable Next and role button once we parse all the players
  $('#next').click(function() {
    if (counter == characterarray.length - 1) {
      $('#next').prop('disabled', true);
      $('#role').prop('disabled', true);
      $('#content').text('');
      $('#revealplayer').text('');
    }
    else {
      counter++;
      $('#content').text(characterarray[counter]);
      $('#revealplayer').text('');
    }
  });

  // To convert the normal string to ToTitleCase
  // Example: hello world -> Hello World
  var ToTitleCase = function (str) {
    // regex to match first letter of a group of words
    return str.replace(/^(\w)|(\s\w)/g, function(match) {
        return match.toUpperCase();
    });
}
});
