import {showOverlay,showDetailsOverlay, closeOverlay} from "./overlay";
import {addToDoItem, toDoItems} from "../items/todo_items"
import renderToDoItems from "./render";
import { renderProjects } from "./render";
import { deleteToDoItemFromList } from "./utils";

export function initializeButtonEvents(){
    setupDetailsButtonListeners();
    setupNavBarButtonListeners();
    setupAddTaskListeners();
    removeActiveFromNavBar();
    setupCheckBox();
}

function removeActiveFromNavBar(){
  document.querySelectorAll('.navbar-links-container button, .project-items-container button')
    .forEach(btn => btn.classList.remove('active'));
}

function setupNavBarButtonListeners(){
    const navbarLinksContainer = document.querySelector('.navbar-links-container');
    const projectItemsContainer = document.querySelector('.project-items-container');
    
    navbarLinksContainer.addEventListener('click', (btn)=> {
        const button = btn.target.closest('button');
        if (!button) return;
        removeActiveFromNavBar();

        button.classList.add('active');

        renderToDoItems(button.classList.value);
    });
    
    projectItemsContainer.addEventListener('click', (btn) => {
        const button = btn.target.closest('button');
        if (!button) return;
        removeActiveFromNavBar();
        button.classList.add('active');

        console.log(button.textContent);

        renderToDoItems('itsProject', button.textContent);
    });
}

function setupAddTaskListeners(){
    setupAddTaskMenu();
    closeOverlay('.add-task-overlay','.add-task-overlay-close-btn');
    setupSubmitButton();
}

function setupAddTaskMenu(){
    const addTaskButton = document.querySelector('.add-task-btn');
    addTaskButton.addEventListener('click', (event)=>{
        showOverlay('.add-task-overlay.hidden');
    });
}


function setupSubmitButton(){
    const form = document.querySelector('.add-task-overlay-details-info');
    const addTaskOverlay = document.querySelector('.add-task-overlay');
    form.addEventListener('submit', (event) => {
        if (event && typeof event.preventDefault === 'function'){
            event.preventDefault();
        } 
        const nameText = document.querySelector('.add-task-overlay-name-input').value;
        const projectNameText = document.querySelector('.add-task-overlay-project-input').value;
        const priority = document.querySelector('.add-task-overlay-priority-input').value;
        const detailsText = document.querySelector('.add-task-overlay-details-input').value;
        const dueDate = document.querySelector('.add-task-overlay-date-input').value;

        addToDoItem(nameText, detailsText, priority, projectNameText, dueDate);
        closeOverlay('.add-task-overlay','.add-task-overlay-close-btn');
        addTaskOverlay.classList.add('hidden');

        form.reset();
        renderProjects();
        removeActiveFromNavBar();
        renderToDoItems();
    });
}

function setupDetailsButtonListeners(){
    setupDetailsChosenItem();
    closeOverlay('.detail-overlay','.overlay-close-btn');
}

function setupDetailsChosenItem(){
    const toDoList = document.querySelector('.todo-body');

    toDoList.addEventListener('click', (event)=>{
        if (event.target.tagName === 'BUTTON'){
            toDoList.querySelectorAll('.todo-row').forEach(div => div.classList.remove('active-overlay'));
            const itemContainer = event.target.closest('.todo-row');
            itemContainer.classList.add('active-overlay');
        }
        if (event.target.className === 'detail-btn'){
            showDetailsOverlay();
        }
        if (event.target.className === 'delete-btn'){
            deleteToDoItemFromList();
        }
    });
}

function setupCheckBox(){
    document.querySelector('.todo-body').addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const row = e.target.closest('.todo-row');
            const idx = row.dataset.index;
            toDoItems[idx].completed = e.target.checked;
            localStorage.setItem("toDoItems", JSON.stringify(toDoItems));
        }
    });
}
