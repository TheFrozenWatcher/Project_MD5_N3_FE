// src/components/AddressManager.js
import React, { useState } from "react";
import AddressForm from "./AddressForm";

export default function AddressManager() {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted:", formData);
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6 border border-blue-500">
      <button
        onClick={handleToggleForm}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showForm ? "Hide Form" : "Add New Address"}
      </button>
      {showForm && (
        <div className="mt-4 p-4 border rounded shadow-lg bg-white  border-black">
          <AddressForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        </div>
      )}
    </div>
  );
}
