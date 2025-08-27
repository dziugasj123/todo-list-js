import {toDoItems} from "../items/todo_items"

export function showOverlay(hiddenOverlayDiv){
    const detailsOverlayDiv = document.querySelector(hiddenOverlayDiv);
    detailsOverlayDiv.classList.remove('hidden');
}

export function showDetailsOverlay(){
    const todolistContainer = document.querySelector('.todo-body');
    const activeContainer = todolistContainer.querySelector('.todo-row.active-overlay');
    const detailsOverlayContainer = document.querySelector('.overlay-details-info');
    detailsOverlayContainer.textContent = '';

    const index = Number(activeContainer.dataset.index);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = 'Name:';
    const nameSpanName = document.createElement('span');
    nameSpanName.textContent = toDoItems[index].name;

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = 'Priority:';
    const prioritySpanPriority = document.createElement('span');
    prioritySpanPriority.textContent = toDoItems[index].priority;

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = 'Date:';
    const dueDateSpanDueDate = document.createElement('span');
    dueDateSpanDueDate.textContent = toDoItems[index].dueDate;

    const detailSpan = document.createElement('span');
    detailSpan.textContent = 'Details:';
    const detailSpanDetail = document.createElement('span');
    detailSpanDetail.textContent = toDoItems[index].detail;

    detailsOverlayContainer.append(nameSpan,nameSpanName,prioritySpan, prioritySpanPriority,dueDateSpan, dueDateSpanDueDate,detailSpan,detailSpanDetail);
    showOverlay('.detail-overlay');
}

export function closeOverlay(overlayDivClass, overlayBtnClass){
    const detailsOverlayDiv = document.querySelector(overlayDivClass);
    const detailsCloseBtn = document.querySelector(overlayBtnClass);
    detailsCloseBtn.addEventListener('click', (btn)=>{
        detailsOverlayDiv.classList.add('hidden');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !detailsOverlayDiv.classList.contains('hidden')) {
        detailsOverlayDiv.classList.add('hidden');
        }
    });
}