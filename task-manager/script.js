document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const saveTasksBtn = document.getElementById('saveTasksBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const searchInput = document.getElementById('searchInput');
  const modeToggle = document.querySelector('.mode-toggle');
  const emptyState = document.getElementById('emptyState');
  const taskStatus = document.getElementById('taskStatus');
  const currentYear = document.getElementById('currentYear');

  if (!taskInput || !addTaskBtn || !taskList || !saveTasksBtn || !clearAllBtn || !searchInput) {
    return;
  }

  const storageKey = 'build-with-femi.tasks.v2';
  const legacyStorageKey = 'tasks';

  function announce(message) {
    if (!taskStatus) return;
    taskStatus.textContent = message;
  }

  function updateEmptyState() {
    if (!emptyState) return;
    emptyState.hidden = taskList.children.length > 0;
  }

  function createActionButton(label, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `btn btn-sm ${className}`;
    button.textContent = label;
    return button;
  }

  function createTaskElement(taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item list-group-item';

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = taskText;

    taskItem.append(
      text,
      createActionButton('Remind Me', 'reminder-btn'),
      createActionButton('Delete', 'btn-danger')
    );
    return taskItem;
  }

  function addTask(taskText, shouldAnnounce = true) {
    const cleanText = taskText.trim();
    if (!cleanText) {
      if (shouldAnnounce) announce('Enter a task before adding it.');
      return;
    }

    taskList.appendChild(createTaskElement(cleanText));
    taskInput.value = '';
    updateEmptyState();
    if (shouldAnnounce) announce('Task added. Select Save Tasks to keep it in this browser.');
  }

  function taskTexts() {
    return Array.from(taskList.querySelectorAll('.task-text')).map((task) => task.textContent);
  }

  function loadTasks() {
    let tasks = [];
    try {
      const saved = localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey);
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) {
        tasks = parsed
          .map((task) => typeof task === 'string' ? task.replace(/Delete\s*Remind Me$/i, '').trim() : '')
          .filter(Boolean);
      }
    } catch (error) {
      console.warn('Saved tasks could not be restored.', error);
      announce('Saved tasks could not be restored. You can start a fresh list.');
    }

    tasks.forEach((task) => addTask(task, false));
    updateEmptyState();
  }

  addTaskBtn.addEventListener('click', function () {
    addTask(taskInput.value);
  });

  taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask(taskInput.value);
    }
  });

  taskList.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (!button) return;

    const taskItem = button.closest('.task-item');
    const text = taskItem ? taskItem.querySelector('.task-text') : null;
    if (!taskItem || !text) return;

    if (button.classList.contains('btn-danger')) {
      taskItem.remove();
      updateEmptyState();
      announce('Task deleted. Save the list to keep this change.');
      return;
    }

    if (button.classList.contains('reminder-btn')) {
      const response = window.prompt('Set reminder time in minutes:');
      if (response === null) return;

      const reminderTime = Number(response);
      if (!Number.isFinite(reminderTime) || reminderTime <= 0) {
        announce('Enter a valid reminder time greater than zero.');
        return;
      }

      window.setTimeout(function () {
        window.alert(`Reminder: Time to complete your task: "${text.textContent}"`);
      }, reminderTime * 60 * 1000);
      announce(`Reminder set for "${text.textContent}" in ${reminderTime} minute(s).`);
    }
  });

  saveTasksBtn.addEventListener('click', function () {
    try {
      localStorage.setItem(storageKey, JSON.stringify(taskTexts()));
      localStorage.removeItem(legacyStorageKey);
      announce('Tasks saved privately in this browser.');
    } catch (error) {
      console.warn('Tasks could not be saved.', error);
      announce('This browser did not allow the tasks to be saved.');
    }
  });

  clearAllBtn.addEventListener('click', function () {
    if (taskList.children.length === 0 || window.confirm('Clear every task from this browser?')) {
      taskList.replaceChildren();
      localStorage.removeItem(storageKey);
      localStorage.removeItem(legacyStorageKey);
      updateEmptyState();
      announce('All tasks cleared.');
    }
  });

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    Array.from(taskList.children).forEach((task) => {
      const text = task.querySelector('.task-text');
      task.hidden = Boolean(text && !text.textContent.toLowerCase().includes(searchTerm));
    });
  });

  if (modeToggle) {
    const savedTheme = localStorage.getItem('build-with-femi.theme');
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');

    modeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('build-with-femi.theme', isDark ? 'dark' : 'light');
      const icon = modeToggle.querySelector('i');
      if (icon) icon.className = isDark ? 'fa fa-sun-o' : 'fa fa-moon-o';
    });
  }

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
  loadTasks();
  taskInput.focus();
});
