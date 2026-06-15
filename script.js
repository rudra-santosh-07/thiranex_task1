// Load leads from localStorage
let leads = JSON.parse(localStorage.getItem("leads")) || [];

const leadForm = document.getElementById("leadForm");
const leadTableBody = document.querySelector("#leadTable tbody");

// Render leads in table
function renderLeads() {
  leadTableBody.innerHTML = "";
  leads.forEach((lead, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${lead.name}</td>
      <td>${lead.email}</td>
      <td class="status-${lead.status}">${lead.status}</td>
      <td>${lead.notes}</td>
      <td>
        <button onclick="updateStatus(${index}, 'contacted')">Contacted</button>
        <button onclick="updateStatus(${index}, 'converted')">Converted</button>
        <button onclick="deleteLead(${index})">Delete</button>
      </td>
    `;

    leadTableBody.appendChild(row);
  });
}

// Add new lead
leadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const notes = document.getElementById("notes").value;

  leads.push({ name, email, notes, status: "new" });
  localStorage.setItem("leads", JSON.stringify(leads));
  renderLeads();
  leadForm.reset();
});

// Update lead status
function updateStatus(index, newStatus) {
  leads[index].status = newStatus;
  localStorage.setItem("leads", JSON.stringify(leads));
  renderLeads();
}

// Delete lead
function deleteLead(index) {
  leads.splice(index, 1);
  localStorage.setItem("leads", JSON.stringify(leads));
  renderLeads();
}

// Initial render
renderLeads();