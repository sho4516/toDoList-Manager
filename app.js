const inputFieldEl = document.querySelector("#input-field");
const taskListContainerEl = document.querySelector(".tasklist-container");
const addItemEl = document.querySelector("#add-item");
const completeAllTasksEl = document.querySelector('.edit-list #complete-all');
const clearAllTasksEl = document.querySelector('.edit-list #clear-all');
const allEl = document.querySelector('#all');
const completeEl = document.querySelector('#complete');
const uncompleteEl = document.querySelector('#uncomplete');
let taskId = 0;

completeAllTasksEl.addEventListener('click', ()=>{
    const checkboxes = document.querySelectorAll('.tasklist-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    updateTasks();
});

clearAllTasksEl.addEventListener('click',()=>{
    const checkboxes = document.querySelectorAll('.tasklist-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateTasks();
});

uncompleteEl.addEventListener('click', ()=>{
    
})
 
function addTask() {
  const text = inputFieldEl.value.trim();
  if (text != "") {
    addItemEl.style.display = 'none';
    const taskListItemEl = document.createElement("div");
    taskListItemEl.classList.add("tasklist-item");
    taskListItemEl.classList.add(`task-${taskId}`);
    taskListItemEl.innerHTML = `
    <div>
        <input type="checkbox" id="task_${taskId}" />
        <label for="task_${taskId}">${text}</label>
    </div>
    <div>
        <button id="delete-button">-</button>
    </div>
    `;
    taskListContainerEl.appendChild(taskListItemEl);
    taskId++;
    inputFieldEl.value = '';
    updateTasks();
    const checkbox = taskListItemEl.querySelector('input[type="checkbox"]'); 
    checkbox.addEventListener('click', ()=>{
        updateTasks();
    })
    const deleteButtonEl = taskListItemEl.querySelector('#delete-button');
    deleteButtonEl.addEventListener('click', ()=>{
        taskListItemEl.remove();
        updateTasks();
    });
    console.log(taskListItemEl.checked);
  }
}

function updateTasks(){
    let count = 0;
    const checkboxes = document.querySelectorAll('.tasklist-item input[type="checkbox"]');
    const taskLeftEl = document.querySelector('#tasks-left');
    checkboxes.forEach((checkbox)=>{
        if(!checkbox.checked){
            count++;
        }
    });
    taskLeftEl.textContent = count;
}

inputFieldEl.addEventListener('input', function() {
    // Check if input field is not empty
    if (inputFieldEl.value.trim() !== '') {
        addItemEl.style.display = 'inline'; // Display the add item icon
    } else {
        addItemEl.style.display = 'none'; // Hide the add item icon
    }
  });

addItemEl.addEventListener('click', addTask);
inputFieldEl.addEventListener('keypress', (event)=>{
    if(event.key == 'Enter'){
        addTask();
    }
});
