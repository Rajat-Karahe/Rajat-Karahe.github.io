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

	if (username.value=="" || firstName.value=="" || lastName.value=="") {
		alert("username, first name or last name can't be empty");
		return false;
	}
	else if(password.value=="" || password.value.length<8){
		alert("Invalid password, enter password of minimum 8 chars");
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
		location.reload();
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
	alert("Invalid username or password");
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