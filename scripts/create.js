// Event listener for post creation form submission
const form = document.getElementById("postForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Get and trim input values
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  
  // Validate input
  if (title && content) {
    // Easter egg: Konami code
    if (title === "upupdowndownleftrightleftrightba") {
      window.location.href = "egg.html";
      return;
    }
    
    // Retrieve existing posts or create empty array
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    // Create new post object
    posts.push({ 
      title, 
      content, 
      timestamp: Date.now() 
    });
    
    // Save updated posts to localStorage
    localStorage.setItem("posts", JSON.stringify(posts));
    
    // Redirect to feed
    window.location.href = "index.html";
  } else {
    // Show error if fields are empty
    alert("Please fill in all fields!");
  }
});