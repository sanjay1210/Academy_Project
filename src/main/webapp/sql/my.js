function set(e) {

	document.getElementById("update").hidden = false;

}


function op() {
	var x = document.getElementById("operation").value;
	if (x == "lt" || x == "gt") {
		document.getElementById("extra").hidden = false;

	}
	else {
		document.getElementById("extra").hidden = true;
	}
}
function table() {
	var col = document.getElementById("col_name").value;
	var op = document.getElementById("operation").value;
	var val = document.getElementById("val").value;
	console.log(col);

	switch (op) {
		case 'min': $.ajax({
			type: 'POST',
			url: '/project/getMinimum',
			data: { column: col },
			error: function(response, status, error) {
				// Gets called when an error occurs with error details in variable response
				console.log(response.responseText);
				console.log(status);
				console.log(error);
			},
			success: function(response) {
				// Gets called when the action is successful with server response in variable response
				console.log(response.data);
				resultsTable(response.data, op, col);
				//updateStudentsTable(response.data);
				//updateStudentsList(response.data);
			}
		});

			break;
		case 'max':
			$.ajax({
				type: 'POST',
				url: '/project/getMaximum',

				data: { column: col },
				error: function(response, status, error) {
					// Gets called when an error occurs with error details in variable response
					console.log(response.responseText);
					console.log(status);
					console.log(error);
				},
				success: function(response) {
					// Gets called when the action is successful with server response in variable response
					console.log(response.data);
					resultsTable(response.data, op, col);
					//updateStudentsTable(response.data);
					//updateStudentsList(response.data);
				}
			});
			break;
		case 'avg':
			$.ajax({
				type: 'POST',
				url: '/project/getAverage',

				data: { column: col },
				error: function(response, status, error) {
					// Gets called when an error occurs with error details in variable response
					console.log(response.responseText);
					console.log(status);
					console.log(error);
				},
				success: function(response) {
					// Gets called when the action is successful with server response in variable response
					console.log(response.data);
					avgTable(response.data, op, col);
					//updateStudentsTable(response.data);
					//updateStudentsList(response.data);
				}
			});
			break;
		case 'lt':
			$.ajax({
				type: 'POST',
				url: '/project/getLessThan',

				data: { column: col, val: val },
				error: function(response, status, error) {
					// Gets called when an error occurs with error details in variable response
					console.log(response.responseText);
					console.log(status);
					console.log(error);
				},
				success: function(response) {
					// Gets called when the action is successful with server response in variable response
					console.log(response.data);
					resultsTable(response.data, op, col);
					//updateStudentsTable(response.data);
					//updateStudentsList(response.data);
				}
			});
			break;
		case 'gt':
			$.ajax({
				type: 'POST',
				url: '/project/getGreaterThan',

				data: { column: col, val: val },
				error: function(response, status, error) {
					// Gets called when an error occurs with error details in variable response
					console.log(response.responseText);
					console.log(status);
					console.log(error);
				},
				success: function(response) {
					// Gets called when the action is successful with server response in variable response
					console.log(response.data);
					resultsTable(response.data, op, col);
					//updateStudentsTable(response.data);
					//updateStudentsList(response.data);
				}
			});
			break;
		case 'top':
			$.ajax({
				type: 'POST',
				url: '/project/getTop',

				data: { column: col },
				error: function(response, status, error) {
					// Gets called when an error occurs with error details in variable response
					console.log(response.responseText);
					console.log(status);
					console.log(error);
				},
				success: function(response) {
					// Gets called when the action is successful with server response in variable response
					console.log(response.data);
					resultsTable(response.data, op, col);
					//updateStudentsTable(response.data);
					//updateStudentsList(response.data);
				}
			});
			break;
		case 'bot':
			$.ajax({
				type: 'POST',
				url: '/project/getBottom',

				data: { column: col },
				error: function(response, status, error) {
					// Gets called when an error occurs with error details in variable response
					console.log(response.responseText);
					console.log(status);
					console.log(error);
				},
				success: function(response) {
					// Gets called when the action is successful with server response in variable response
					console.log(response.data);
					resultsTable(response.data, op, col);
					//updateStudentsTable(response.data);
					//updateStudentsList(response.data);
				}
			});
			break;
	}

	document.getElementById("tab").hidden = false;




}
function resultsTable(response, op, col) {

	var returnedData = JSON.parse(response);
	var $tableRef = $('<table class="table table-bordered">');

	// Adding the headers

	var $th = $('<tr>').append(
		$('<th class="text-center">').text("Name"),
		$('<th class="text-center">').text(op)

	);
	$tableRef.append($th);

	$.each(returnedData, function(i, item) {
		var $tr = $('<tr>').append(
			$('<td class="text-center">').text(item.Name),
			$('<td class="text-center">').text(item.Value)

		); //.appendTo('#records_table');
		$tableRef.append($tr);
	});
	$("#tab").html($tableRef);

}
function avgTable(response, op, col) {

	var returnedData = JSON.parse(response);
	var $tableRef = $('<table class="table table-bordered">');

	// Adding the headers

	var $th = $('<tr>').append(
		$('<th class="text-center">').text("Column"),
		$('<th class="text-center">').text(op)

	);
	$tableRef.append($th);

	$.each(returnedData, function(i, item) {
		var $tr = $('<tr>').append(
			$('<td class="text-center">').text(col),
			$('<td class="text-center">').text(item.Value)

		); //.appendTo('#records_table');
		$tableRef.append($tr);
	});
	$("#tab").html($tableRef);

}
