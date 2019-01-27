var access_token = '';
var origin = window.location.origin;

$('#login').click(function () {
    $.ajax({
        type: "POST",
        url: origin + '/auth',
        dataType: 'json',
        async: false,
        data: JSON.stringify({ "username": $('#username').val(), "password": $('#password').val()}) ,
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {
		access_token = JSON.stringify(data);
		console.log(access_token);
        $('#login_field').hide();
        $('#post_request').show();
        $('#choice').show();
	    },
	    error: function (jqXhr, textStatus, errorThrown) {
		console.log(errorThrown);
	    }
    });
    return false;
});

$('#get_r').click(function () {
    $('form').hide();
    $('#get_request').show();
});

$('#post_r').click(function () {
    $('form').hide();
    $('#post_request').show();
});
