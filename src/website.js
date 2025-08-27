import "./css/styles.css";
import renderToDoItems from "./pages/todo/render"
import {renderProjects} from "./pages/todo/render";
import {initializeButtonEvents} from "./pages/todo/events";

function loadWebsite(){
    renderProjects();
    renderToDoItems();
    initializeButtonEvents();
}

export default loadWebsite;