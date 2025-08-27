class ToDoItem {
  constructor(name, detail, priority, project, dueDate, completed = false) {
    this.name = name;
    this.detail = detail;
    this.priority = priority;
    this.project = project;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}

export const toDoTasks = [
  new ToDoItem(
    "Groceries", 
    "Milk, eggs, bread, and coffee", 
    "high", 
    "General",
    "2025-08-28"
  ),
  new ToDoItem(
    "Groceries", 
    "Coffee", 
    "medium", 
    "General",
    "2025-08-30"
  ),
  new ToDoItem(
    "Work assignment", 
    "Write the summary and proofread before submission", 
    "medium", 
    "Work",
    "2025-08-30"
  ),
  new ToDoItem(
    "Jogging", 
    "Do jogging in the park", 
    "low", 
    "Sports",
    "2025-09-10"
  ),
  new ToDoItem(
    "History lesson", 
    "Learn about Contantinople", 
    "low", 
    "School",
    "2025-09-02"
  ),
];

export let toDoItems = JSON.parse(localStorage.getItem("toDoItems")) || toDoTasks;

export function addToDoItem(name, detail, priority, project, dueDate){
  const newItem = new ToDoItem(name, detail, priority, project, dueDate, false);
  toDoItems.push(newItem);
  localStorage.setItem("toDoItems", JSON.stringify(toDoItems));
  return newItem;
}