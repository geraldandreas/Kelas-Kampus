import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import DashboardPage from "./DashboardPage";

export default function App() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* LandingPage */}
        <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <LandingPage />} />

        {/* Register hanya tersedia jika belum login */}
        <Route path="/register" element={!session ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />

        {/* Login hanya tersedia jika belum login */}
        <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/dashboard" replace />} />

        {/* Dashboard hanya untuk user yang sudah login */}
        <Route path="/dashboard" element={session ? <DashboardPage /> : <Navigate to="/login" replace />} />

        {/* Halaman tidak dikenal redirect ke landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
