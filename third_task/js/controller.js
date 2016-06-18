var admin = new Admin();

window.onload = function() {
	admin.load();
	admin.listUsers(admin.users);

	$("#new_user_button").click(function(){
	    $("#list_users").hide();
		$("#add_user").show();
	});

	$("#anu_back_button").click(function(){
	    $("#list_users").show();
		$("#add_user").hide();
	});

	$("#eu_back_button").click(function(){
	    $("#list_users").show();
		$("#edit_user").hide();
	});

	$("#anu_add_user").click(function(){
	    var name = $("#name").val();
	    var username = $("#username").val();
	    var email = $("#email").val();
	    var password = $("#password").val();

	    if (admin.validateAdd(name,username,email,password)) {
	    	var user = new User(name,username,email,password);
		    admin.addUser(user);
		    admin.listUsers(admin.users);
		    $("#list_users").show();
			$("#add_user").hide();
	    }
	    
	});

	$('#search').on('input', function() {
		var selectedFilter = $("input[name='searchFilter']:checked").val();
	    admin.filterUsers($(this).val(),selectedFilter);
	});

}

