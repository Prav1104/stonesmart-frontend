import React from "react";

export default function SlabTable({ slabs, onEdit, onDelete, onSort, sortBy, sortDir }) {
  const header = (key, label) => (
    <th
      className="px-3 py-2 cursor-pointer"
      onClick={() => onSort(key)}
    >
      {label} {sortBy === key ? (sortDir === "asc" ? "▲" : "▼") : ""}
    </th>
  );

  return (
    <table className="w-full bg-white border">
      <thead className="bg-gray-100">
        <tr>
          {header("name", "Name")}
          {header("origin", "Origin")}
          {header("thicknessMm", "Thickness")}
          {header("pricePerSqft", "Price")}
          <th className="px-3 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {slabs.length === 0 && (
          <tr>
            <td colSpan="5" className="p-4 text-center text-gray-500">
              No slabs found
            </td>
          </tr>
        )}

        {slabs.map((slab) => (
          <tr key={slab._id} className="border-t">
            <td className="p-2">{slab.name}</td>
            <td className="p-2">{slab.origin}</td>
            <td className="p-2">{slab.thicknessMm} mm</td>
            <td className="p-2">₹{slab.pricePerSqft}</td>
            <td className="p-2">
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => onEdit(slab)}
                >
                  Edit
                </button>

                <button
                  className="px-2 py-1 border rounded text-red-600"
                  onClick={() => onDelete(slab)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
