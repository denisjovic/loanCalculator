//Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {

    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear all tasks event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks even
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from Local Storage
function getTasks() {
    let tasks;
    //if local st is emtpy, arr is empty
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //if not, parse them as string and add
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop through tasks
    tasks.forEach(function(task) {
        //Create li element
        const li = document.createElement('li');
        //Add class to element (*collection-item is materialize class)
        li.className = 'collection-item';
        //Create text node and append
        li.appendChild(document.createTextNode(task));
        //Create new link element (delete icon)
        const link = document.createElement('a');
        //Add class to element (*secondary content is materialize class)
        link.className = 'delete-item secondary-content';
        //Add icon html (font awesome)
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to the LI
        li.appendChild(link);
        //Append LI to the Ul
        taskList.appendChild(li);

    });
}

//Add task
function addTask(e) {
    //Create li element
    const li = document.createElement('li');
    //Add class to element (*collection-item is materialize class)
    li.className = 'collection-item';
    //Create text node and append
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element (delete icon)
    const link = document.createElement('a');
    //Add class to element (*secondary content is materialize class)
    link.className = 'delete-item secondary-content';
    //Add icon html (font awesome)
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the LI
    li.appendChild(link);
    //Append LI to the Ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeLocaly(taskInput.value);
    //Clear input
    taskInput.value = '';


  e.preventDefault();
}

//Store Task
function storeLocaly(task) {
    let tasks;
    //if local st is emtpy, arr is empty
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //if not, parse them as string and add
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //adding to storage array
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task 
function removeTask(e) {
    //targeting link with class delete-item
    if(e.target.parentElement.classList.contains('delete-item')) {
        //removing the LI - task
        e.target.parentElement.parentElement.remove();
        //remove task from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }


}

//remove from LS function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    //if local st is emtpy, arr is empty
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //if not, parse them as string and add
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear all tasks

function clearTasks() {
    taskList.innerHTML = '';

    clearTasksFromLS();
}

// Clear tasks from local storafge

function clearTasksFromLS() {
    localStorage.clear();
}

//Filter tasks

function filterTasks(e) {
    //capturing what ever is written
    const text = e.target.value.toLowerCase();

    //loop through all elements
    //*we can use foreach because queryselectorall returns node list
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1 ) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
