var admin = new Admin();

/**
 * Handling of events of user interaction
 *
 */
window.onload = function() {
	admin.load();
	admin.listPagination(admin.users);

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
		    admin.listPagination(admin.users);

		    $("#name").val("");
	    	$("#username").val("");
	    	$("#email").val("");
	    	$("#password").val("");

		    $("#list_users").show();
			$("#add_user").hide();
	    }
	    
	});

	$("#previous_page").click(function(){
	    admin.previousPage();
	    
	});

	$("#next_page").click(function(){
	   	admin.nextPage();
	    
	});

	$('#search').on('input', function() {
		var selectedFilter = $("input[name='searchFilter']:checked").val();
	    admin.filterUsers($(this).val(),selectedFilter);
	});

}

