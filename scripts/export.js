const data = localStorage.getItem("posts");

document.getElementById("export").innerHTML = `${data}<br>`;