var jwt;
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
		jwt = data;
        $('#login_field').hide();
        $('#choice').show();
	    },
	    error: function (jqXhr, textStatus, errorThrown) {
		console.log(errorThrown);
	    }
    });
    return false;
});

$('#post_r').click(function () {
    $('form').hide();
    $('#post_request').show();
    $.ajax({
        type: "GET",
        url: origin + '/clients',
        dataType: 'json',
        headers: {authorization: 'JWT ' + jwt['access_token'], contentType: 'application/json'},
        success: function (data, textStatus, jQxhr) {
		var clients = data.clients;
		$('#client_list option').remove();
        $.each(clients, function(key, value) {
        $('#client_list')
            .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });
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
    $.ajax({
        type: "GET",
        url: origin + '/clients',
        dataType: 'json',
        headers: {authorization: 'JWT ' + jwt['access_token'], contentType: 'application/json'},
        success: function (data, textStatus, jQxhr) {
		var clients = data.clients;
		$('#client option').remove();
        $.each(clients, function(key, value) {
        $('#clients')
            .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });
	    },
	    error: function (jqXhr, textStatus, errorThrown) {
		console.log(errorThrown);
	    }
    });
    return false;
});

$('#find_client_requests').click(function () {
    $.ajax({
        type: "GET",
        url: origin + '/client/' + $('#clients option:selected').text(),
        dataType: 'json',
        headers: {authorization: 'JWT ' + jwt['access_token'], contentType: 'application/json'},
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {
		var client_requests = data['requests'];
        parse_requests(client_requests);
	    },
	    error: function (jqXhr, textStatus, errorThrown) {
		console.log(errorThrown);
	    }
    });
    return false;
});


$('#find_request_id').click(function () {
    fetch(origin + '/request/' + $('#req_id').val(), {
    method: 'get',
    headers: {
      "Content-type": "application/json",
      "authorization": 'JWT ' + jwt['access_token']
    }
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
      parse_requests([json])
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
    return false;
});

$('#get_r_id').click(function () {
    $('form').hide();
    $('#get_request_id').show();
});



function parse_requests(client_requests) {
    $('p').remove()
    $.each(client_requests, function(k, v) {
            $.each(v, function (key, value) {
                $('#results')
                    .append($("<p></p>")
                        .text(key +': '+value));
            });
        });
    $('form').hide();
    $('#results').show();
}