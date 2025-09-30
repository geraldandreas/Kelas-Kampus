import React from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
    } else {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <button onClick={handleLogout} style={{
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer"
    }}>
      Logout
    </button>
  );
}
