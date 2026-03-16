import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./EditButton.css";

// Drop this component anywhere inside a product card/page
// It only renders when admin is logged in
function EditButton({ productId }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;

  return (
    <Link to={`/admin/edit/${productId}`} className="edit-fab" title="Edit Product">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
      Edit
    </Link>
  );
}

export default EditButton;