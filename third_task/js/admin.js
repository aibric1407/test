var Admin = function() {
    this.users = [];
    this.currentPage = 1;

    this.listUsers = function (data,index) {
    	$('#table tr td').remove();
    	var helperThis = this;
    	var table = document.getElementById("table");
    	if (data.length != 0) {
    		for (var i = 0; i < data.length; i++) {
				var row = document.createElement("tr");
				var colNum = document.createElement("td");
				var number = document.createTextNode(index + i);
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
				var email = document.createElement("a");
                email.setAttribute("href","mailto:" + data[i].email);
                email.innerHTML = data[i].email;
				colEmail.appendChild(email);
				row.appendChild(colEmail);

				var colPass = document.createElement("td");
				var pass = document.createTextNode(data[i].password);
				colPass.appendChild(pass);
				row.appendChild(colPass);

				var colEdit = document.createElement("td");
				var edit = document.createElement("button");
				edit.className = "btn btn-primary btn-xs";
				edit.id = data[i].id;
				edit.addEventListener('click', function() {
				    helperThis.editUser(this.id);
				}, false);
				edit.innerHTML = "EDIT";
				colEdit.appendChild(edit);
				row.appendChild(colEdit);

				var colDelete = document.createElement("td");
				var del = document.createElement("button");
				del.className = "btn btn-primary btn-xs";
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
        console.log(this.users,"delete");
    	this.listPagination(this.users);
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
    		if (helperThis.validateEdit(user,$('#edit_name').val(),$('#edit_username').val(),$('#edit_email').val(),$('#edit_password').val())) {
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

    	this.listPagination(this.users);
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
    	this.listPagination(filtered_users);
    }

    this.duplicatesValidation = function(name,username,email,password){
        var results = [];
        for (var i = 0; i <this.users.length; i++) {
            if(this.users[i].fullName == name) {
                return [false,"name"];
            }
            if(this.users[i].username == username) {
                return [false,"username"];
            }
            if(this.users[i].email == email) {
                return [false,"email"];
            }
            if(this.users[i].password == password) {
                return [false,"password"];
            }
        }
        return [true];
    }

    this.duplicatesValidationEdit = function(user,name,username,email,password){
        var results = [];
        for (var i = 0; i <this.users.length; i++) {
            if(user !== this.users[i] && this.users[i].fullName == name) {
                return [false,"name"];
            }
            if(user !== this.users[i] && this.users[i].username == username) {
                return [false,"username"];
            }
            if(user !== this.users[i] && this.users[i].email == email) {
                return [false,"email"];
            }
            if(user !== this.users[i] && this.users[i].password == password) {
                return [false,"password"];
            }
        }
        return [true];
    }

    this.validateAdd = function (name,username,email,password) {
    	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        var duplicates = this.duplicatesValidation(name,username,email,password);

        if (name && username && email && password && testEmail.test(email)) {
            if (duplicates[0]) {
                $('#add_message').hide();
                return true;
            } else {
                $('#add_message_text').text("There is already a user with provided " + duplicates[1]);
                $('#add_message').show();
                return false;
            }

        }
    	$('#add_message_text').text("Please enter all fields, if all fields are set you have entered invalid email.");
    	$('#add_message').show();
    	return false;	
    }

    this.validateEdit = function (user,name,username,email,password) {
    	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

        var duplicates = this.duplicatesValidationEdit(user,name,username,email,password);
        if (name && username && email && password && testEmail.test(email)) {
            if (duplicates[0]) {
                $('#edit_message').hide();
                return true;
            } else {
                $('#edit_message_text').text("There is already a user with provided " + duplicates[1]);
                $('#edit_message').show();
                return false;
            }
                
        }
        
    	$('#add_message_text').text("Please enter all fields, if all fields are set you have entered invalid email.");
    	$('#edit_message').show();
    	return false;	
    }

    this.listPagination = function(users){

        var recordsPerPage = 10;

        var numOfPages = (Math.ceil(users.length/recordsPerPage) > 0) ? Math.ceil(users.length/recordsPerPage) : 1;
        if (this.currentPage > numOfPages) {
            this.currentPage = numOfPages;
        }

        var startIndex = (this.currentPage-1)*recordsPerPage;
        var endIndex = this.currentPage*recordsPerPage;


        if(this.currentPage == 1) {
            $("#previous_page").prop('disabled', true);
        } else {
            $("#previous_page").prop('disabled', false);
        }

        if(this.currentPage == numOfPages || numOfPages == 1 || users.length == 0) {
            $("#next_page").prop('disabled', true);
        } else {
            $("#next_page").prop('disabled', false);
        }

        var userList = users.slice(startIndex,endIndex);
        this.listUsers(userList,startIndex);

    }

    this.nextPage = function () {
        console.log("nextPage");
        this.currentPage++;
        this.listPagination(this.users);

    }

    this.previousPage = function () {
        console.log("previousPage")
        this.currentPage--;
        this.listPagination(this.users);
    }



    this.save = function () {
        var compreessedData = lzw_encode(JSON.stringify(this.users));
        var encodedData = Base64.encode(compreessedData);
		localStorage.setItem('users', encodedData);
    }

    this.load = function () {
    	this.users = [];
    	if (localStorage.getItem('users') != null) {
            var decodedData = Base64.decode(localStorage.getItem('users'));
            var decommpressedDaa = lzw_decode(decodedData);
    		this.users = JSON.parse(decommpressedDaa);
    	}		
    }
}