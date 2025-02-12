const API_URL = "http://localhost:3000/tasks";

const addToList = async () => {
    let taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() !== "") {
        try {
            await fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({task: taskInput.value.trim()})
            })
        } catch (error) {
            console.error("Error adding task:", error)
        }

        taskInput.value = "";
        loadTasks();
    }
};

const removeTask = async (taskId) => {
    try{
        await fetch(`${API_URL}/${taskId}`, {method: "DELETE"});
        loadTasks();
    }catch (error){
        console.error("Error deleting task:", error);
    }
};

const loadTasks = async () => {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        let taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.task; 
            if(task.completed) li.style.textDecoration = "line-through";

            let completeBtn = document.createElement("button");
            completeBtn.textContent = "✔";
            completeBtn.onclick = () => markTaskCompleted(task._id);
            completeBtn.className  = "complete-btn";

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.onclick = () => removeTask(task._id);
            deleteBtn.className = "delete-btn";
    
            li.appendChild(deleteBtn);
            li.appendChild(completeBtn);
            taskList.appendChild(li);
        });
    } catch (error){
        console.error("Error loading Tasks:", error);
    }
    
};

const markTaskCompleted = async (id) => {
    try{
        await fetch(`${API_URL}/${id}/completed`, {method: "PATCH"});
        loadTasks();
    } catch(error){
        console.error("Failed to mark task as completed:", error);
    }
}

window.onload = loadTasks;