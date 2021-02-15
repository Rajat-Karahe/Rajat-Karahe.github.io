function addItem(textNode=null) {
  let newItem = document.createElement("li");
  var inputValue;
  if(textNode===null){
  	inputValue = document.getElementById("newTodoInput").value;
  	textNode = document.createTextNode(inputValue);
  	document.getElementById("newTodoInput").value = "";
  }
	if (inputValue == '') {
	  warning_fun("Cannot add an empty task");
	  return false;
	}
	if(inputValue.length > 25){
	  warning_fun("Title cannot be larger than 25 characters");
	  return false;
	}
  var presentTasks = document.getElementsByTagName("li");
  for(let i=0; i< presentTasks.length; i++){
    if(inputValue.replace(/ /g,'').toUpperCase() == presentTasks[i].innerText.slice(0, -5).replace(/ /g,'').toUpperCase()){
      warning_fun("Task already exists");
      return false;
    }
  } 
  newItem.appendChild(textNode);
  
  document.getElementById("open").appendChild(newItem);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("🗑");
  var spanCorrect = document.createElement("SPAN");
  var txtCorrect = document.createTextNode("✔");
  span.className = "remove";
  spanCorrect.className = "check";
  span.style.position = "absolute";
  spanCorrect.style.position = "absolute";
  span.appendChild(txt);
  spanCorrect.appendChild(txtCorrect);
  span.onclick = function() {
    var result = confirm("Are you sure you want to delete this task?");
    if(result){
      var list = this.parentElement;
      list.remove();
    }
  };
  spanCorrect.onclick = function() {
  	newItem.remove();
  	addToCompleted(textNode);
  };
  newItem.appendChild(span);
  newItem.appendChild(spanCorrect);
}

function addToCompleted(textNode) {
  let newItem = document.createElement("li");
  newItem.appendChild(textNode);
  document.getElementById("completed").appendChild(newItem);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("🗑");
  var spanRemove = document.createElement("SPAN");
  var textRemove = document.createTextNode("✘");
  span.className = "remove";
  spanRemove.className = "check";
  span.style.position = "absolute";
  spanRemove.style.position = "absolute";
  span.appendChild(txt);
  spanRemove.appendChild(textRemove);
  span.onclick = function() {
    var result = confirm("Are you sure you want to delete this task?");
    if(result){
      var list = this.parentElement;
      list.remove();
    }
  };
  spanRemove.onclick = function() {
  	newItem.remove();
  	addItem(textNode);
  };
  newItem.appendChild(span);
  newItem.appendChild(spanRemove);
}

function setFunction() {
	var textField = document.getElementById('newTodoInput');
	textField.addEventListener('keypress', function (e) {
	    if (e.key === 'Enter') {
	      addItem();
	    }
	});
}

function warning_fun(inputValue) {
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
  var parent = document.getElementById("inputField");
  var child = document.getElementById("addBtn");
  parent.insertBefore(divEle, child);
}


// ✘ 🗑 ✔
