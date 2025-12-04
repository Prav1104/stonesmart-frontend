import React, { useEffect, useState, useCallback } from "react";
import { getSlabs, createSlab, updateSlab, deleteSlab } from "../../services/slabs";
import SlabForm from "../../components/slabs/SlabForm";
import "../../styles/slabs.css";
 // make sure this file exists (from previous message)

/* Debounce hook */
function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function Slabs() {
const [slabs, setSlabs] = useState([]);
const [search, setSearch] = useState("");
const [sortDir, setSortDir] = useState("asc");

const [showForm, setShowForm] = useState(false);
const [editing, setEditing] = useState(null);

const debouncedSearch = useDebounce(search, 300);

const fetchSlabs = useCallback(async () => {
  try {
    const res = await getSlabs({
      q: debouncedSearch,
      sortBy: "name",
      sortDir,
    });

const slabsArray = res.data?.data || [];
setSlabs(slabsArray);


    setSlabs(slabsArray || []);

  } catch (err) {
    console.error("Failed to load slabs:", err);
    alert("Failed to load slabs");
  }
}, [debouncedSearch, sortDir]);



  useEffect(() => {
    fetchSlabs();
  }, [fetchSlabs]);

const saveSlab = async (form) => {
  try {
    if (form._id) {
      // Editing case
      await updateSlab(form._id, form);
    } else {
      // Creating case
      await createSlab(form);
    }

    setShowForm(false);
    setEditing(null);
    fetchSlabs();
  } catch (err) {
    console.error("Save failed:", err);
    alert("Save failed");
  }
};


  const removeSlab = async (slab) => {
    if (!window.confirm("Delete this slab?")) return;
    try {
      await deleteSlab(slab._id);
      fetchSlabs();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  const handleSort = () => {
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="slabs-container">

      {/* Top Bar */}
      <div className="slabs-topbar">
        <input
          className="slab-search"
          placeholder="Search slabs... (e.g., Black, Rajasthan)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="add-slab-btn"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Add New Slab
        </button>
      </div>

      {/* Sort Button */}
      <div className="sort-container">
        <button className="sort-btn" onClick={handleSort}>
          Sort by Name ({sortDir})
        </button>
      </div>

      {/* Slabs Grid */}
      <div className="slabs-grid">
        {slabs.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666" }}>
            No slabs found.
          </div>
        ) : (
          slabs.map((slab) => (
            <div key={slab._id} className="slab-card">
              <h2 className="slab-title">{slab.name}</h2>

              <p><strong>Origin:</strong> {slab.origin}</p>
              <p><strong>Thickness:</strong> {slab.thicknessMm} mm</p>

              <p className="slab-price">₹ {slab.pricePerSqft} / sqft</p>

              <div className="slab-actions">
                <button
                  className="edit-btn"
                  onClick={() => { setEditing(slab); setShowForm(true); }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => removeSlab(slab)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
{showForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      <SlabForm
        initial={editing}
        onCancel={() => { setShowForm(false); setEditing(null); }}
        onSave={saveSlab}
      />
    </div>
  </div>
)}

    </div>
  );
}

