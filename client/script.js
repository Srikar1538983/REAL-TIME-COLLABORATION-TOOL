const socket = io("http://localhost:3000");
const editor = document.getElementById("editor");
const userCount = document.getElementById("userCount");
const toggleTheme = document.getElementById("toggleTheme");

// Load initial content
socket.on("loadContent", (content) => {
    editor.value = content;
});

// Detect changes and send updates
editor.addEventListener("input", () => {
    socket.emit("updateContent", editor.value);
});

// Receive updates from other users
socket.on("updateContent", (newContent) => {
    if (document.activeElement !== editor) {
        editor.value = newContent;
    }
});

// User Count Update
socket.on("userCount", (count) => {
    userCount.innerText = `Users: ${count}`;
});

// Dark Mode Toggle
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleTheme.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});