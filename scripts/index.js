// Retrieve posts from localStorage
const posts = JSON.parse(localStorage.getItem("posts")) || [];
const feed = document.getElementById("feed");

// Render posts or show empty state
function renderPosts() {
  if (!posts) {
    feed.innerHTML = "<p>No posts yet. Create one!</p>";
    localStorage.setItem("posts", JSON.stringify([]));
    return;
  }
  if (posts.length === 0) {
    feed.innerHTML = "<p>No posts yet. Create one!</p>";
    return;
  }

  // Clear existing feed content
  feed.innerHTML = '';

  // Create post elements
  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <h2>${escapeHTML(post.title)}</h2>
      <p>${escapeHTML(post.content)}</p>
      <small>Posted on: ${new Date(post.timestamp).toLocaleString()}</small>
      <div class="post-actions">
        <a href="view.html?id=${index}">View Post</a>
        <button data-index="${index}" class="delete-btn">Delete</button>
        <button data-index="${index}" class="edit-btn">Edit</button>
      </div>
    `;
    feed.appendChild(postElement);
  });

  // Add event listeners for delete and edit buttons using event delegation
  feed.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    const editBtn = e.target.closest('.edit-btn');

    if (deleteBtn) {
      deletePost(deleteBtn.dataset.index);
    }

    if (editBtn) {
      editPost(editBtn.dataset.index);
    }
  });
}

// Delete a post by index
function deletePost(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}

// Edit a post by index
function editPost(index) {
  const newTitle = prompt("Edit Title", posts[index]?.title || "");
  const newContent = prompt("Edit Content", posts[index]?.content || "");
  
  if (newTitle?.trim() && newContent?.trim()) {
    posts[index].title = newTitle.trim();
    posts[index].content = newContent.trim();
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  } else {
    alert("Both title and content must be filled out.");
  }
}

// Utility function to escape HTML to prevent XSS
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, char =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])
  );
}

// Initial render of posts
renderPosts();