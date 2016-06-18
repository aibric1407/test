// Data for manipulation
var column_names = ["ID","Name","E-mail"];
var data = [[0, "Adnan", "aibric1407@gmail.com"], 
    		[1, "Jon", "jon@gmail.com"],
    		[2, "Greg", "Greg@gmail.com"],
    		[3, "Brad", "brad@gmail.com"],
    		[4, "Angelina", "angelina@gmail.com"],
    		];


window.onload = function(){
	createTable(data);
};

/**
 * createTable
 * 
 * Creates the table
 *
 * Function creates the table based on length of data passed into function, outputs the data into table
 * and styles the table
 *
 * @param {data} data information 
 *
 */
function createTable(data) {
	var container = document.getElementById("table_container");
	var table = document.createElement("table");
	table.className = "table";

	var header_row = document.createElement("tr");
	header_row.className = "header_row";
	for (var i = 0; i < column_names.length; i++) {
		var header = document.createElement("th");
		header.className = "header_column"
		var header_text = document.createTextNode(column_names[i]);
		header.appendChild(header_text);
		header_row.appendChild(header);
	}
	table.appendChild(header_row);
	for (var i = 0; i < data.length; i++) {
		var row = document.createElement("tr");
		row.className = "body_row";
		for (var j = 0; j < data[i].length; j++) {
			var column = document.createElement("td");
			column.className = "body_column";
			var column_data = "";
			if(j != 2) {
				column_data = document.createTextNode(data[i][j]);
			} else {
				column_data = document.createElement("a");
				column_data.setAttribute("href","mailto:" + data[i][j]);
				column_data.innerHTML = data[i][j];
			}
			column.appendChild(column_data);
			row.appendChild(column);
		}
		table.appendChild(row);
	}
	container.appendChild(table);	
}