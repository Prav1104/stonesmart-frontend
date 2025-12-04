import React, { useState, useEffect } from "react";
import "../../styles/slabs.css"; // ensure file exists

export default function SlabForm({ initial, onSave, onCancel }) {
const [form, setForm] = useState({
  _id: null,     // 🔥 new slabs don’t have ID
  name: "",
  origin: "",
  thicknessMm: "",
  pricePerSqft: "",
});




  useEffect(() => {
if (initial) {
  setForm({
    _id: initial._id,        // 🔥 IMPORTANT
    name: initial.name,
    origin: initial.origin,
    thicknessMm: initial.thicknessMm,
    pricePerSqft: initial.pricePerSqft,
  });
}

  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="slab-form" onSubmit={submitForm}>
      <h2 className="slab-form-title">
        {initial ? "Edit Slab" : "Add New Slab"}
      </h2>

      {/* Name */}
      <label className="slab-label">Slab Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="e.g., Black Galaxy"
        required
      />

      {/* Origin */}
      <label className="slab-label">Origin</label>
      <input
        name="origin"
        value={form.origin}
        onChange={handleChange}
        placeholder="e.g., Andhra Pradesh"
        required
      />

      {/* Thickness */}
      <label className="slab-label">Thickness (mm)</label>
      <input
        type="number"
        name="thicknessMm"
        value={form.thicknessMm}
        onChange={handleChange}
        placeholder="15 / 18 / 20"
        required
      />

      {/* Price */}
      <label className="slab-label">Price per Sqft (₹)</label>
      <input
        type="number"
        name="pricePerSqft"
        value={form.pricePerSqft}
        onChange={handleChange}
        placeholder="e.g., 180"
        required
      />

      {/* Buttons */}
      <div className="slab-form-actions">
        <button type="submit" className="save-btn">
          {initial ? "Save Changes" : "Add Slab"}
        </button>

        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
