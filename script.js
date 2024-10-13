document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const saveTasksBtn = document.getElementById('saveTasksBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const searchInput = document.getElementById('searchInput');
  const modeToggle = document.querySelector('.mode-toggle');

  // Ensure task input can be focused
  taskInput.focus();

  addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item', 'list-group-item');
      taskItem.innerHTML = `
        ${taskText}
        <button class="btn btn-danger btn-sm">Delete</button>
        <button class="btn reminder-btn btn-sm">Remind Me</button>
      `;
      taskList.appendChild(taskItem);
      taskInput.value = ''; // Clear input after adding
    }
  });

  // Remove task functionality
  taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-danger')) {
      e.target.parentElement.remove();
    }
  });

  // Toggle dark mode
  modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });

  // Save tasks to localStorage
  saveTasksBtn.addEventListener('click', function() {
    const tasks = Array.from(taskList.children).map(task => task.textContent.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  // Clear all tasks and localStorage
  clearAllBtn.addEventListener('click', function() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
  });

  // Search task functionality
  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const tasks = Array.from(taskList.children);
    tasks.forEach(task => {
      const taskText = task.textContent.toLowerCase();
      task.style.display = taskText.includes(searchTerm) ? 'block' : 'none';
    });
  });

  // Add event listener for "Remind Me" button
  taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('reminder-btn')) {
      const taskItem = e.target.parentElement;
      const taskText = taskItem.textContent.trim();

      // Ask the user to set a time for the reminder (in minutes)
      const reminderTime = parseInt(prompt('Set reminder time in minutes:'), 10);

      if (!isNaN(reminderTime) && reminderTime > 0) {
        // Convert reminder time from minutes to milliseconds
        const reminderMilliseconds = reminderTime * 60 * 1000;

        // Use setTimeout to trigger a reminder after the specified time
        setTimeout(() => {
          alert(`Reminder: Time to complete your task: "${taskText}"`);
          // Optional: You can also play an alarm sound here if needed
          // let alarm = new Audio('path-to-your-alarm-sound.mp3');
          // alarm.play();
        }, reminderMilliseconds);

        alert(`Reminder set for "${taskText}" in ${reminderTime} minute(s)!`);
      } else {
        alert('Please enter a valid time in minutes.');
      }
    }
  });
});
