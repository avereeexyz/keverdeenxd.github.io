const themeToggle = document.getElementById('theme-toggle');

// Check if a theme preference is already stored in localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.innerHTML = '☀️'; // Change the button icon to the sun for dark mode
} else {
  document.body.classList.remove('dark-mode');
  themeToggle.innerHTML = '🌙'; // Default to light mode (moon icon)
}

// Toggle the theme on button click
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // If dark mode is activated, set it in localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '☀️'; // Sun icon for dark mode
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '🌙'; // Moon icon for light mode
  }
});
