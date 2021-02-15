function register(){
	var email = document.getElementById("email");
	var username = document.getElementById("username");
	var firstName = document.getElementById("firstName");
	var lastName = document.getElementById("lastName");
	var password = document.getElementById("password");
	male = document.getElementById("male");
    female = document.getElementById("female");
	other = document.getElementById("other");
	var role = document.getElementById("role");
	if(password.value.length<8){
		warning_fun("Enter password of minimum 8 chars", "password", "registration_form");
		return false;
	}
	else{
		var gender_selected;
		gender_selected = male ?? female ?? other;

		var newPerson = new Object();
		newPerson.email = email.value;
		newPerson.username = username.value;
		newPerson.firstName = firstName.value;
		newPerson.lastName = lastName.value;
		newPerson.password = password.value;
		newPerson.gender = gender_selected.value;
		newPerson.role = role.value;

		console.log(newPerson);

		var sessionData = [];
		sessionData.push(newPerson);
		sessionData = sessionData.concat(JSON.parse(localStorage.getItem('sessionData')||'[]'));
		console.log(sessionData);
		localStorage.setItem('sessionData', JSON.stringify(sessionData));
		sessionStorage.setItem('currentUser', newPerson.role);
		alert('You have successfully registered');
		return true;
	}
}

function login(){
	var email = document.getElementById("login_email").value;
	var password = document.getElementById("login_password").value;
	var sessionData = JSON.parse(localStorage.getItem('sessionData')||'[]');
	for(let i=0; i<sessionData.length; i++){
		let user = sessionData[i];
		if(user.email==email && user.password==password){
			sessionStorage.setItem('currentUser', user.role);
			viewUsers();
			return true;
		}
	}
	warning_fun_login("Invalid username or password", "login_form");
	return false;
}

function viewUsers(){
	var sessionData = JSON.parse(localStorage.getItem('sessionData')||'[]');
	var prevBody = document.getElementById("dashBody");
	if(sessionStorage.currentUser=='admin'){
		prevBody.innerHTML ='<ul id="parent"><li><h2>You are an admin</h2><hr></li></ul>';
		let parentEle = document.getElementById("parent");
		for(let i=0; i<sessionData.length; i++){
			parentEle.innerHTML += '<li><p>Full Name: ' + sessionData[i].firstName + ' ' + sessionData[i].lastName + '</p><p>Username: ' + sessionData[i].username + '</p><p>Email: ' + sessionData[i].email + '</p><p>Role: ' + sessionData[i].role + '</p></li><hr>';
		}
	}
	else {
		prevBody.innerHTML ='<ul id="parent"><li><h2>You are from ' + sessionStorage.currentUser + '</h2></li></ul>';
		let parentEle = document.getElementById("parent");
		for(let i=0; i<sessionData.length; i++){
			parentEle.innerHTML += '<li><p>Full Name: ' + sessionData[i].firstName + ' ' + sessionData[i].lastName + '</p><p>Role: ' + sessionData[i].role + '</p></li><hr>';
		}
	}
}

function warning_fun(inputValue, child_name, parent_name) {
  var divEle = document.createElement("div");
  var span = document.createElement("span");
  var textNode = document.createTextNode(inputValue);
  var deleteNode = document.createTextNode("✘");
  span.className = "remove_warning";
  span.appendChild(deleteNode);
  divEle.appendChild(textNode);
  span.onclick = function() {
    var par = this.parentElement;
    par.remove();
  };
  divEle.appendChild(span);
  divEle.className = "warning";
  var parent = document.getElementsByClassName(parent_name);
  var child = document.getElementById(child_name);
  parent[0].insertBefore(divEle, child);
}

function warning_fun_login(inputValue, parent_name) {
  var divEle = document.createElement("div");
  var span = document.createElement("span");
  var textNode = document.createTextNode(inputValue);
  var deleteNode = document.createTextNode("✘");
  span.className = "remove_warning";
  span.appendChild(deleteNode);
  divEle.appendChild(textNode);
  span.onclick = function() {
    var par = this.parentElement;
    par.remove();
  };
  divEle.appendChild(span);
  divEle.className = "warning";
  var parent = document.getElementsByClassName(parent_name);
  parent[0].appendChild(divEle);
}
