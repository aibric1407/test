var Admin = function() {
    this.users = [];

    this.listUsers = function (data) {
    	$('#table tr td').remove();
    	var helperThis = this;
    	var table = document.getElementById("table");
    	if (data.length != 0) {
    		for (var i = 0; i < data.length; i++) {
				var row = document.createElement("tr");
				var colNum = document.createElement("td");
				var number = document.createTextNode(i);
				colNum.appendChild(number);
				row.appendChild(colNum);

				var colName = document.createElement("td");
				var name = document.createTextNode(data[i].fullName);
				colName.appendChild(name);
				row.appendChild(colName);

				var colUsername = document.createElement("td");
				var username = document.createTextNode(data[i].username);
				colUsername.appendChild(username);
				row.appendChild(colUsername);

				var colEmail = document.createElement("td");
				var email = document.createTextNode(data[i].email);
				colEmail.appendChild(email);
				row.appendChild(colEmail);

				var colPass = document.createElement("td");
				var pass = document.createTextNode(data[i].password);
				colPass.appendChild(pass);
				row.appendChild(colPass);

				var colEdit = document.createElement("td");
				var edit = document.createElement("button");
				edit.className = "btn btn-link btn-sm";
				edit.id = data[i].id;
				edit.addEventListener('click', function() {
				    helperThis.editUser(this.id);
				}, false);
				edit.innerHTML = "EDIT";
				colEdit.appendChild(edit);
				row.appendChild(colEdit);

				var colDelete = document.createElement("td");
				var del = document.createElement("button");
				del.className = "btn btn-link btn-sm";
				del.id = data[i].id;
				del.addEventListener('click', function() {
				    helperThis.deleteUser(this.id);
				}, false);
				del.innerHTML = "DELETE";
				colDelete.appendChild(del);
				row.appendChild(colDelete);

				table.appendChild(row);
			}
			$("#table_content").show();
			$("#table_message").hide();
			
    	} else {
    		$("#table_content").hide();
			$("#table_message").show();
    	}
		
    };

    this.addUser = function (user) {
    	this.users.push(user);
    	this.save();

    };

    this.deleteUser = function (id) {
    	for (var i = 0; i < this.users.length; i++) {
    		if (this.users[i].id == id) {
    			this.users.splice(i, 1);
    		}
    	}
    	this.listUsers(this.users);
    	this.save();
    }

    this.getUserByID = function (id) {
    	for (var i = 0; i < this.users.length; i++) {
    		if (this.users[i].id == id) {
    			return this.users[i];
    		}
    	}
    }

    this.editUser = function (id) {
    	$("#list_users").hide();
		$("#edit_user").show();
		
		var user = this.getUserByID(id);
		
		$("#edit_name").val(user.fullName);
    	$("#edit_username").val(user.username);
    	$("#edit_email").val(user.email);
    	$("#edit_password").val(user.password);
    	var helperThis = this;

    	$("#eu_save").click(function(){
    		if (helperThis.validateEdit($('#edit_name').val(),$('#edit_username').val(),$('#edit_email').val(),$('#edit_password').val())) {
    			$("#list_users").show();
				$("#edit_user").hide();
				helperThis.saveEditedUser(user);
    		}
		    
		});
    }

    this.saveEditedUser = function (user) {
    	user.fullName = $("#edit_name").val();
    	user.username = $("#edit_username").val();
    	user.email = $("#edit_email").val();
    	user.password = $("#edit_password").val();

    	this.listUsers(this.users);
    	this.save();
    }

    this.filterUsers = function (input,filter) {
    	var filtered_users = [];
    	for(var i = 0; i < this.users.length; i++) {
    		if (filter == "name" && this.users[i].fullName.indexOf(input) != -1) {
    			filtered_users.push(this.users[i]);
    		}

    		if (filter == "username" && this.users[i].username.indexOf(input) != -1) {
    			filtered_users.push(this.users[i]);
    		}

    		if (filter == "email" && this.users[i].email.indexOf(input) != -1) {
    			filtered_users.push(this.users[i]);
    		}
    	}
    	this.listUsers(filtered_users);
    }

    this.validateAdd = function (name,username,email,password) {
    	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    	if (name && username && email && password && testEmail.test(email)) {
    		$('#add_message').hide();
    		return true;
    	}
    	$('#add_message').show();
    	return false;	
    }

    this.validateEdit = function (name,username,email,password) {
    	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    	if (name && username && email && password && testEmail.test(email)) {
    		$('#edit_message').hide();
    		return true;
    	}
    	$('#edit_message').show();
    	return false;	
    }


    this.save = function () {
		localStorage.setItem('users', JSON.stringify(this.users));
    }

    this.load = function () {
    	this.users = [];
    	if (localStorage.getItem('users') != null) {
    		this.users = JSON.parse(localStorage.getItem('users'));
    	}		
    }
}