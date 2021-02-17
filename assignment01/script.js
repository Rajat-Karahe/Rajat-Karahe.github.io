function addItem(textNode=null) {
  let newItem = document.createElement("li");
  var inputValue;
  if(textNode===null){
  	inputValue = document.getElementById("newTodoInput").value;
  	textNode = document.createTextNode(inputValue);
  	document.getElementById("newTodoInput").value = "";
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
  }
  var textSpan = document.createElement("SPAN");
  textSpan.appendChild(textNode);
  textSpan.style.padding = "4px";
  newItem.appendChild(textSpan);
  
  document.getElementById("open").appendChild(newItem);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("🗑");
  var spanCorrect = document.createElement("SPAN");
  var txtCorrect = document.createTextNode("✔");
  var spanEdit = document.createElement("SPAN");
  var txtEdit = document.createTextNode("✎");
  spanEdit.className = "edit";
  span.className = "remove";
  spanCorrect.className = "check";
  span.style.position = "absolute";
  spanCorrect.style.position = "absolute";
  span.appendChild(txt);
  spanCorrect.appendChild(txtCorrect);
  spanEdit.appendChild(txtEdit);
  spanEdit.onclick = function(){
  	textSpan.setAttribute("contenteditable", true);
  	textSpan.style.outline = "-webkit-focus-ring-color auto 1px";
  	spanEdit.style["background-color"] = "#345f69";
  };
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
  textSpan.onkeypress = function(e) {
  	if (e.key === 'Enter') {
	    textSpan.setAttribute("contenteditable", false);
	    textSpan.style.outline = "none";
	    spanEdit.style.removeProperty("background-color");
	}
  };
  newItem.appendChild(spanEdit);
  newItem.appendChild(span);
  newItem.appendChild(spanCorrect);
}

function addToCompleted(textNode) {
  let newItem = document.createElement("li");
  var textSpan = document.createElement("SPAN");
  textSpan.appendChild(textNode);
  textSpan.style.padding = "4px";
  newItem.appendChild(textSpan);
  document.getElementById("completed").appendChild(newItem);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("🗑");
  var spanRemove = document.createElement("SPAN");
  var textRemove = document.createTextNode("✘");
  var spanEdit = document.createElement("SPAN");
  var txtEdit = document.createTextNode("✎");
  spanEdit.className = "edit";
  span.className = "remove";
  spanRemove.className = "check";
  span.style.position = "absolute";
  spanRemove.style.position = "absolute";
  span.appendChild(txt);
  spanRemove.appendChild(textRemove);
  spanEdit.appendChild(txtEdit);
  spanEdit.onclick = function(){
  	textSpan.setAttribute("contenteditable", true);
  	textSpan.style.outline = "-webkit-focus-ring-color auto 1px";
  	spanEdit.style["background-color"] = "#345f69";
  };
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
  textSpan.onkeypress = function(e) {
  	if (e.key === 'Enter') {
	    textSpan.setAttribute("contenteditable", false);
	    textSpan.style.outline = "none";
	    spanEdit.style.removeProperty("background-color");
	}
  };
  newItem.appendChild(spanEdit);
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


// ✘ 🗑 ✔ ✎
