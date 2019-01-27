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
		console.log(access_token)
        $('#login_field').hide()
        $('#post_request').show()
	    },
	    error: function (jqXhr, textStatus, errorThrown) {
		console.log(errorThrown);
	    }
    });
    return false;
});
