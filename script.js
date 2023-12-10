document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('crud-form');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    function addTask() {
        const taskInput = document.getElementById('task');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
            };

            tasks.push(task);
            saveTasksToLocalStorage();
            renderTask(task);
            taskInput.value = '';
        }
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    }

    window.addTask = addTask;

    window.deleteTask = function (taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasksToLocalStorage();
        renderTasks();
    };

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(renderTask);
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        tasks = storedTasks ? JSON.parse(storedTasks) : [];
        renderTasks();
    }

    loadTasksFromLocalStorage();
});
