const themeToggle = document.getElementById('theme-toggle');

// Check if a theme preference is already stored in localStorage, otherwise default to dark mode
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.innerHTML = '☀️'; // Sun icon for dark mode
} else {
  // Default to dark mode if nothing is stored
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark'); // Save dark mode as the default
  themeToggle.innerHTML = '☀️'; // Sun icon for dark mode
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

// Fetching Discord status using your Discord User ID
const discordUserID = "1454841600974000159"; 

fetch(`https://api.lanyard.rest/v1/users/${discordUserID}`)
  .then(response => response.json())
  .then(data => {
    const discordStatusElement = document.getElementById("discord-status");

    if (data.data) {
      const { activities, discord_status, avatar } = data.data;
      const activity = activities ? activities[0] : null;
      
      // Construct the avatar URL
      const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUserID}/${avatar}.png`;

      // Display activity details (e.g., playing a game)
      if (activity) {
        discordStatusElement.innerHTML = `
          <img src="${avatarUrl}" alt="Discord Avatar" width="50" height="50">
          <p>Status: ${discord_status}</p>
          <p>Playing: ${activity.name}</p>
          <p>Details: ${activity.details}</p>
        `;
      } else {
        discordStatusElement.innerHTML = `
          <img src="${avatarUrl}" alt="Discord Avatar" width="50" height="50">
          <p>Currently not playing any games.</p>
        `;
      }
    } else {
      discordStatusElement.innerHTML = "<p>Unable to fetch status. Please try again later.</p>";
    }
  })
  .catch(() => {
    document.getElementById("discord-status").innerHTML = "<p>Failed to fetch Discord status.</p>";
  });
