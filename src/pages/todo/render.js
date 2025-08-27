import {toDoItems} from "../items/todo_items"
import { sortToDoItemsByDate, isDateToday, isDateInThisWeek, isDateTomorrow } from "./utils";

export default function renderToDoItems(itemPass = 'home-link active', otherValue){
    const tBody = document.querySelector('.todo-body');
    tBody.innerHTML = '';
    sortToDoItemsByDate();

    for (let i = 0; i < toDoItems.length; i++){
        const row = document.createElement('tr');
        row.className = 'todo-row';
        row.dataset.index = i;

        const tdName = document.createElement('td');
        tdName.className = 'todo-cell todo-cell--name';
        const label = document.createElement('label');
        const nameP = document.createElement('span');
        nameP.textContent = toDoItems[i].name;
        const checkInp = document.createElement('input');
        checkInp.type = 'checkbox';
        checkInp.checked = toDoItems[i].completed;
        label.append(checkInp,nameP);
        tdName.append(label);

        const tdPriority = document.createElement('td');
        tdPriority.className = 'todo-cell todo-cell--priority';
        const priorityP = document.createElement('span');
        priorityP.className = 'todo-priority';
        priorityP.textContent = toDoItems[i].priority;
        tdPriority.append(priorityP);
        
        const tdDue = document.createElement('td');
        tdDue.className = 'todo-cell todo-cell--duedate';
        const dueP = document.createElement('span');
        if (isDateToday(toDoItems[i].dueDate)){
            dueP.textContent = "Today";
        }
        else if (isDateTomorrow(toDoItems[i].dueDate)){
            dueP.textContent = "Tomorrow";
        }
        else{
            dueP.textContent = toDoItems[i].dueDate;
        }
        tdDue.append(dueP);

        const tdActions = document.createElement('td');
        tdActions.className = 'todo-cell todo-cell--actions';
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'detail-btn';
        detailsBtn.textContent = 'Details';
        tdActions.append(detailsBtn,deleteBtn);
        
        row.append(tdName, tdPriority, tdDue, tdActions);

        if (itemPass === 'itsProject'){
            if (otherValue != toDoItems[i].project){
                row.classList.add("active");
            }
        }
        if (itemPass === 'today-link active' && !isDateToday(toDoItems[i].dueDate)){
            row.classList.add("active");
        }
        if (itemPass === 'this-week-link active' && !isDateInThisWeek(toDoItems[i].dueDate)){
            row.classList.add("active");
        }

        if (toDoItems[i].priority === 'high'){
            priorityP.classList.add('high');
        }
        if (toDoItems[i].priority === 'medium'){
            priorityP.classList.add('medium');
        }
        if (toDoItems[i].priority === 'low'){
            priorityP.classList.add('low');
        }
        tBody.appendChild(row);
    }
}

export function renderProjects(){
    const projectItemsContainer = document.querySelector('.project-items-container');
    projectItemsContainer.innerHTML = '';
    let arr = toDoItems.map(a => a.project);
    arr = [...new Set(arr)];

    arr.forEach((el)=>{
        const liItem = document.createElement("li");
        const projectItem = document.createElement("button");
        projectItem.classList.add("project-item");
        const spanItem = document.createElement("span");
        spanItem.textContent = el;
        projectItem.append(spanItem);
        liItem.append(projectItem);
        projectItemsContainer.append(liItem);
    });
}