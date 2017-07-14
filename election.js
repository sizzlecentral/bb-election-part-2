document.addEventListener("DOMContentLoaded", function() {

  var candidateList = document.querySelector('#candidates');

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(responseData) {
    for (var i = 0; i < responseData.candidates.length; i++) {
      var item = document.createElement('li');
      item.innerHTML = 'Name: ' + responseData.candidates[i].name + ' Votes: ' + responseData.candidates[i].votes;
      var form = document.createElement('form');
      item.appendChild(form);
      candidateList.appendChild(item);
    }
  });
});
