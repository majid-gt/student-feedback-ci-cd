async function submitFeedback() {
    const name = document.getElementById("name").value;
    const feedback = document.getElementById("feedback").value;

    if (!name || !feedback) {
        alert("Please fill all fields");
        return;
    }

    await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, feedback })
    });

    document.getElementById("name").value = "";
    document.getElementById("feedback").value = "";

    loadFeedback();
}

async function loadFeedback() {
    const res = await fetch("/api/feedback");
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
