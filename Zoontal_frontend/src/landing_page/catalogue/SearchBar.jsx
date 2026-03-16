import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="position-relative w-75 " >
        <FiSearch
          size={18}
          className="position-absolute"
          style={{ left: "10px", top: "50%", transform: "translateY(-50%)", color: "#999" }}
        />

        <input
          type="text"
          className="form-control border-0 border-bottom rounded-0 ps-5 pe-5"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ boxShadow: "none" }}
        />

        {value && (
          <button
            className="btn p-0 position-absolute"
            style={{
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#999"
            }}
            onClick={onClear}
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
