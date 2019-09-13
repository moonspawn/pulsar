$('#inputPassword, #inputPassword2').on('keyup', function () {
    if ($('#inputPassword').val() === $('#inputPassword2').val()) {
        $('#message').html('Matching').css('color', 'green');
    } else
        $('#message').html('Not Matching').css('color', 'red');
});