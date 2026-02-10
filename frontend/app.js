const API_URL = window.API_URL || "http://backend:8000/api/feedback"; 
// later you will change this to backend container / nginx route

async function submitFeedback() {
    const name = document.getElementById("name").value;
    const feedback = document.getElementById("feedback").value;

    if (!name || !feedback) {
        alert("Please fill all fields");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, feedback })
    });

    document.getElementById("name").value = "";
    document.getElementById("feedback").value = "";

    loadFeedback();
}

async function loadFeedback() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("feedbackList");
    list.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name}: ${item.feedback}`;
        list.appendChild(li);
    });
}

// Load feedback on page load
loadFeedback();
