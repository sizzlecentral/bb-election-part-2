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
      form.method = 'POST';
      form.action = 'https://bb-election-api.herokuapp.com/vote'
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        var candidateVote = $(this).children('input[type=hidden]').val();
        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote?id=' + candidateVote,
          method: 'POST',
          dataType: 'json'
        });
      });

      var inputHidden = document.createElement('input');
      inputHidden.type = 'hidden';
      inputHidden.name = 'id';
      inputHidden.value = responseData.candidates[i].id;

      var inputSubmit = document.createElement('input');
      inputSubmit.type = 'submit';

      form.appendChild(inputSubmit);
      form.appendChild(inputHidden);
      item.appendChild(form);

      candidateList.appendChild(item);
    }
  }).fail(function() {
    console.log('Fail.');
  });

  var refresh = document.querySelector('#refresh');
  refresh.addEventListener('click', function() {
    location.reload();
  });
});
