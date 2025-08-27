import {toDoItems} from "../items/todo_items"

export function sortToDoItemsByDate(){
    const sortedToDoItems = toDoItems.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
    return sortedToDoItems;
};

export function reIndexToDoItems(container){
    container.querySelectorAll('.todo-row').forEach((el, i) =>{
        el.dataset.index = i;
    });
}

export function deleteToDoItemFromList(){
    const todolistContainer = document.querySelector('.todo-body');
    const activeContainer = todolistContainer.querySelector('.todo-row.active-overlay');

    const index = Number(activeContainer.dataset.index);

    toDoItems.splice(index, 1);
    activeContainer.remove();
    localStorage.setItem("toDoItems", JSON.stringify(toDoItems));
    reIndexToDoItems(todolistContainer);
}

export function isDateInThisWeek(dateInput) {
    const date = new Date(dateInput);

    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();

    const firstDayOfWeek = new Date(todayObj);
    firstDayOfWeek.setDate(todayDate - todayDay + 1);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    return date >= firstDayOfWeek && date <= lastDayOfWeek;
}

export function isDateToday(dateInput){
    const date = new Date(dateInput);
    const today = new Date()

    return date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear();
}

export function isDateTomorrow(dateInput){
    const date = new Date(dateInput);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return date.getDate() === tomorrow.getDate() &&
        date.getMonth() === tomorrow.getMonth() &&
        date.getFullYear() === tomorrow.getFullYear();
}