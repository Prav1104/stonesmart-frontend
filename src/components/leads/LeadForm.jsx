import React, { useState, useEffect } from "react";

export default function LeadForm({ initial, onSave, onCancel }) {
const [form, setForm] = useState({
  _id: null,
  name: "",
  phone: "",
  source: "",
  status: "New",
  note: ""
});


  useEffect(() => {
if (initial) {
  setForm({
    _id: initial._id,   // 🔥 REQUIRED FOR UPDATE
    name: initial.name,
    phone: initial.phone,
    source: initial.source || "",
    status: initial.status || "New",
    note: initial.note || ""
  });
}

  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="slab-form" onSubmit={submit}>
      <h2 className="slab-form-title">
        {initial ? "Edit Lead" : "Add New Lead"}
      </h2>

      <label className="slab-label">Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label className="slab-label">Phone</label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <label className="slab-label">Source</label>
      <input
        name="source"
        value={form.source}
        onChange={handleChange}
        placeholder="Instagram, Facebook, Referral..."
      />

      <label className="slab-label">Status</label>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>New</option>
        <option>Follow-Up</option>
        <option>Converted</option>
        <option>Closed</option>
      </select>

      <label className="slab-label">Note</label>
      <input
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Optional notes"
      />

      <div className="slab-form-actions">
        <button type="submit" className="save-btn">
          {initial ? "Save Changes" : "Add Lead"}
        </button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
