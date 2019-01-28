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

$('#nav_post_r').click(function () {
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

$('#nav_get_r').click(function () {
    $('form').hide();
    $('#get_request').show();
    $.ajax({
        type: "GET",
        url: origin + '/clients',
        dataType: 'json',
        headers: {authorization: 'JWT ' + jwt['access_token'], contentType: 'application/json'},
        success: function (data, textStatus, jQxhr) {
		var clients = data.clients;
		$('#clients option').remove();
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

$('#nav_get_r_id').click(function () {
    $('form').hide();
    $('#get_request_id').show();
});

$('#nav_del_r_id').click(function () {
    $('form').hide();
    $('#del_request_id').show();
});

$('#nav_post_c').click(function () {
    $('form').hide();
    $('#post_client').show();
});

$('#nav_del_c').click(function () {
    $('form').hide();
    $('#del_client').show();
});

$('#submit_request').click(function () {
    fetch(origin + '/request', {
    method: 'post',
    headers: {
      "Content-type": "application/json",
      "authorization": 'JWT ' + jwt['access_token']
    },
    body: JSON.stringify({
        "priority": $('#priority').val(),
        "target_date": $('#target_date').val(),
        "product_area": $('#product_area option:selected').text(),
        "client_name": $('#client_list option:selected').text(),
        "title": $('#title').val(),
        "description": $('#description').val()
    })
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

$('#delete_request_id').click(function () {
    fetch(origin + '/request/' + $('#del_req_id').val(), {
    method: 'delete',
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

$('#find_client_name').click(function () {
    fetch(origin + '/client/' + $('#client_name').val(), {
    method: 'post',
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

$('#delete_client_name').click(function () {
    fetch(origin + '/client/' + $('#del_client_name').val(), {
    method: 'delete',
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

function parse_requests(client_requests) {
    $('p').remove();
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
