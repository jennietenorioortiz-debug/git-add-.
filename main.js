console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  btn.addEventListener("click", generatePlan);
});

async function generatePlan() {
  console.log("Generate button clicked");

  const payload = {
    company: document.getElementById("company").value,
    industry: document.getElementById("industry").value,
    goal: document.getElementById("goal").value,
    audience: document.getElementById("audience").value,
    budget: document.getElementById("budget").value,
    timeline: document.getElementById("timeline").value
  };

  console.log("Sending payload:", payload);

  try {
    const res = await fetch("/.netlify/functions/generatePlan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Response from function:", data);

    document.getElementById("planSection").style.display = "block";
    document.getElementById("planContent").innerHTML =
      `<pre>${data.plan}</pre>`;

  } catch (err) {
    console.error("Error:", err);
  }
}

