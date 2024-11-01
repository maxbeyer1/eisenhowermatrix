var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var targetList;

renderTodoList();
initNav();

// User clicked on add button
// If there is any text inside the item field add that text to the todo list
document.getElementById('add').addEventListener('click', function () {
    var value = document.getElementById('item').value;
    if (value) {
        addItem(value);
    }

});

document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if (e.code === 'Enter' && value) {
        addItem(value);
    }
});

// Set nav dots to first page
function initNav() {
    $("#dot1").css("background-color", "#888");
}

function changeNav(page) {
    var currentDot = page + 1;

    $(".dot").each(function () {
        $(this).css("background-color", "#edf0f1");
    });

    $("#dot" + currentDot).css("background-color", "#888");
}

function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++) {
        // Gets text and list number from data object
        var value = data.todo[i].text;
        var list = data.todo[i].listNumber;

        addItemToDOM(value, false, list)
    }

    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j].text;
        var list = data.completed[j].listNumber;

        addItemToDOM(value, true, list);
    }
}

function addItem(value) {
    var currentPage = localStorage.getItem('page');
    addItemToDOM(value, false, currentPage);
    document.getElementById('item').value = '';

    data.todo.push({
        text: value,
        listNumber: currentPage
    });
    dataObjectUpdated();
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
    console.log(data);
}


// Get the index of an object in the data array
function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}


// Return target list based on page number
function returnList(listNumber, completed) {
    var list;

    if (listNumber == 0 && completed == false) {
        list = $("ul[list='todo1']")
    } else if (listNumber == 0 && completed == true) {
        list = $("ul[list='completed1']")
    } else if (listNumber == 1 && completed == false) {
        list = $("ul[list='todo2']")
    } else if (listNumber == 1 && completed == true) {
        list = $("ul[list='completed2']")
    } else if (listNumber == 2 && completed == false) {
        list = $("ul[list='todo3']")
    } else if (listNumber == 2 && completed == true) {
        list = $("ul[list='completed3']")
    } else if (listNumber == 3 && completed == false) {
        list = $("ul[list='todo4']");
    } else if (listNumber == 3 && completed == true) {
        list = $("ul[list='completed4']");
    } else {
        console.log("It's broken. Yay!");
    }

    return list;
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(arrayObjectIndexOf(data.todo, value, "text"), 1);
    } else {
        data.completed.splice(arrayObjectIndexOf(data.completed, value, "text"), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem() {
    var currentPage = localStorage.getItem('page');
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
    var completed;

    if (id === 'todo') {
        data.todo.splice(arrayObjectIndexOf(data.todo, value, "text"), 1);
        data.completed.push({
            text: value,
            listNumber: currentPage
        });
    } else {
        data.completed.splice(arrayObjectIndexOf(data.completed, value, "text"), 1);
        data.todo.push({
            text: value,
            listNumber: currentPage
        });
    }

    dataObjectUpdated();


    //    Check if item should be added to the completed list or re-added to the todo list
    //    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
    //    var target = (id === 'todo') ? $("ul[list=" + "completed" + listNum + "]") : $("ul[list=" + "todo" + listNum + "]")

    if (id === 'todo') {
        completed = true;
    } else {
        completed = false;
    }

    var target = returnList(currentPage, completed);

    parent.removeChild(item);
    target.prepend(item);
}


//Adds a new item to the todo list
function addItemToDOM(text, completed, listNumber) {
    var list = returnList(listNumber, completed);

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Add click event for removing the item
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    // Add click event for completing the item
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.prepend(item);
}
