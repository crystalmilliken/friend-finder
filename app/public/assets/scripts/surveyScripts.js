
$('#survey-form').submit(function (event) {
    event.preventDefault(); 
    var form = $(this);
    $.ajax({
        type: 'post',
        url: "api/friends",
        data: form.serialize()
    }).done(function (data) {
        $('#best-match-info').html(`Name: ${data.name}<br> Picture: <br> <img src="${data.photo}" alt="${data.name}"/>`);
        $('#best-match').modal('show');
    }).fail(function (data) {
        $('#best-match-info').html(`I'm sorry, there was an error, please try again.`);
        $('#best-match').modal('show');
    });
});