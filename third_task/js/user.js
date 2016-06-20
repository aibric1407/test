/**
 * User class
 *
 */
var User = function (fullName,username,email,password) {
	this.id = 0;
	this.username;
	this.fullName = "";
	this.email = "";
	this.password = "";

	this.create = function (fullName,username,email,password) {
		this.id = Math.floor(Math.random() * 1000000);
		this.fullName = fullName;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	this.create(fullName,username,email,password);
};