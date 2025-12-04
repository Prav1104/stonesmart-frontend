import React, { useState, useEffect, useCallback } from "react";
import { getLeads, createLead, updateLead, deleteLead } from "../services/leads";
import LeadForm from "../components/leads/LeadForm";

import "../styles/leads.css";


/* Debounce */
function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortDir, setSortDir] = useState("asc");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  /* Fetch Leads */
  const fetchLeads = useCallback(async () => {
    try {
      const res = await getLeads({
        q: debouncedSearch,
        status: status !== "All" ? status : "",
        sortDir,
      });

      const arr = res.data || res.data?.data || [];
      setLeads(arr);
    } catch (err) {
      console.error("Failed to load leads:", err);
      alert("Failed to load leads");
    }
  }, [debouncedSearch, status, sortDir]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

const saveLead = async (form) => {
  try {
    // 🔥 FIXED UPDATE LOGIC
    if (form._id) {
      await updateLead(form._id, form);
    } else {
      await createLead(form);
    }

    setShowForm(false);
    setEditing(null);
    fetchLeads();

  } catch (err) {
    console.error("Save failed:", err);
    alert("Save failed");
  }
};


  const removeLead = async (lead) => {
    if (!window.confirm("Delete this lead?")) return;
    await deleteLead(lead._id);
    fetchLeads();
  };

  return (
    <div className="leads-container">

      {/* Top Controls */}
      <div className="leads-topbar">
        <input
          className="lead-search"
          placeholder="Search leads by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="lead-filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>New</option>
          <option>Follow-Up</option>
          <option>Converted</option>
          <option>Closed</option>
        </select>

        <button className="add-lead-btn" onClick={() => { setEditing(null); setShowForm(true); }}>
          + Add Lead
        </button>
      </div>

      {/* Sort Button */}
      <div className="sort-container">
        <button className="sort-btn" onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}>
          Sort by Name ({sortDir})
        </button>
      </div>

      {/* Leads Grid */}
      <div className="leads-grid">
        {leads.length === 0 ? (
          <p className="empty-msg">No leads found.</p>
        ) : (
          leads.map((lead) => (
            <div key={lead._id} className="lead-card">
              <h2 className="lead-title">{lead.name}</h2>

              <p><strong>Phone:</strong> {lead.phone}</p>
              <p><strong>Source:</strong> {lead.source}</p>
              <p><strong>Status:</strong> {lead.status}</p>

              <div className="lead-actions">
                <button className="edit-btn" onClick={() => { setEditing(lead); setShowForm(true); }}>Edit</button>
                <button className="delete-btn" onClick={() => removeLead(lead)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <LeadForm
              initial={editing}
              onSave={saveLead}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
