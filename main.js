console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  btn.addEventListener("click", generatePlan);
});

async function generatePlan() {
  console.log("Generate button clicked");

  const companyInput = document.getElementById("company");
  const industryInput = document.getElementById("industry");
  const goalInput = document.getElementById("goal");
  const audienceInput = document.getElementById("audience");
  const budgetInput = document.getElementById("budget");
  const timelineInput = document.getElementById("timeline");

  if (!companyInput || !industryInput || !goalInput || !timelineInput) {
    console.error("One or more inputs not found");
    return;
  }

  const payload = {
    company: companyInput.value,
    industry: industryInput.value,
    goal: goalInput.value,
    audience: audienceInput.value,
    budget: budgetInput.value,
    timeline: timelineInput.value
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

    const planSection = document.getElementById("planSection");
    const planContent = document.getElementById("planContent");

    if (!planSection || !planContent) {
      console.error("Plan section missing");
      return;
    }

    planSection.style.display = "block";
    planContent.innerHTML = `<pre>${data.plan}</pre>`;

  } catch (err) {
    console.error("Error generating plan:", err);
  }
}
