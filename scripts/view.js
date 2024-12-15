// Parse URL parameters to get post ID
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"), 10);

// Retrieve posts from localStorage
const posts = JSON.parse(localStorage.getItem("posts")) || [];
const post = posts[id];
const postDiv = document.getElementById("post");

// Render post or show error
if (post) {
  postDiv.innerHTML = `
    <h2>${escapeHTML(post.title)}</h2>
    <p>${escapeHTML(post.content)}</p>
    <small>Posted on: ${new Date(post.timestamp).toLocaleString()}</small>
  `;
} else {
  postDiv.innerHTML = "<p>Post not found! Please return to the feed.</p>";
}

// Utility function to escape HTML to prevent XSS
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, char =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])
  );
}