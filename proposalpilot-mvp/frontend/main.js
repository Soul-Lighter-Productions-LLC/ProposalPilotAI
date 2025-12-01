const summaryInput = document.getElementById("summary");
const submitButton = document.getElementById("submit");
const resultEl = document.getElementById("result");

const render = (message, isError = false) => {
  resultEl.textContent = message;
  resultEl.style.color = isError ? "#ff6b6b" : "#5ed3ff";
};

submitButton.addEventListener("click", async () => {
  const projectSummary = summaryInput.value.trim();

  if (!projectSummary) {
    render("Please enter a project summary before running a scan.", true);
    return;
  }

  render("Submitting to viability worker...");

  try {
    // API URL is configured in config.js
    const apiUrl = window.API_URL || "http://localhost:8787";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ projectSummary }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data?.message ?? "Unknown error");
    }

    render(JSON.stringify(data.data, null, 2));
  } catch (error) {
    render(`Viability scan failed: ${error.message}`, true);
  }
});

