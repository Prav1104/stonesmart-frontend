import React from "react";

export default function SlabCard({ slab, onEdit, onDelete }) {
  return (
    <div
      className="
        p-6 rounded-2xl shadow-lg 
        bg-gradient-to-br from-blue-500/10 to-purple-500/10 
        hover:from-purple-500/20 hover:to-pink-500/20 
        transition-all duration-300
        border border-gray-200 hover:border-blue-400
        transform hover:-translate-y-1
      "
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-wide">
        {slab.name}
      </h2>

      {/* Info */}
      <div className="space-y-1 text-gray-700">
        <p><strong>Origin:</strong> {slab.origin}</p>
        <p><strong>Thickness:</strong> {slab.thicknessMm} mm</p>
      </div>

      {/* Price */}
      <p className="text-2xl font-semibold text-blue-700 mt-4">
        ₹ {slab.pricePerSqft} / sqft
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          className="
            flex-1 py-2 rounded-lg font-semibold 
            bg-yellow-500 hover:bg-yellow-600 
            text-white transition
          "
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          className="
            flex-1 py-2 rounded-lg font-semibold 
            bg-red-600 hover:bg-red-700 
            text-white transition
          "
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
