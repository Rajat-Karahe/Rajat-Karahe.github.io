function addItem() {
  var newItem = document.createElement("li");
  var inputValue = document.getElementById("newTodoInput").value;
  var textNode = document.createTextNode(inputValue);
  newItem.appendChild(textNode);
  document.getElementById("newTodoInput").value = "";
  if (inputValue == '') {
    alert("Cannot add an empty task");
    return false;
  }
  if(inputValue.length > 25){
    alert("Title cannot be larger than 25 characters");
    return false;
  } 
  document.getElementById("todoList").appendChild(newItem);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("✘");
  var spanCorrect = document.createElement("SPAN");
  var txtCorrect = document.createTextNode("✔");
  span.className = "remove";
  spanCorrect.className = "check";
  span.style.position = "absolute";
  spanCorrect.style.position = "absolute";
  span.appendChild(txt);
  spanCorrect.appendChild(txtCorrect);
  span.onclick = function() {
    var list = this.parentElement;
    list.remove();
  };
  spanCorrect.onclick = function() {
  	newItem.style.textDecoration = "line-through";
  	this.remove();
  };
  newItem.appendChild(span);
  newItem.appendChild(spanCorrect);
}

function setFunction() {
	var textField = document.getElementById('newTodoInput');
	textField.addEventListener('keypress', function (e) {
	    if (e.key === 'Enter') {
	      addItem();
	    }
	});
}
