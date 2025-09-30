import React, { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  // Fungsi login email/password
  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage("Login gagal: " + error.message)
    } else {
      navigate("/dashboard") // langsung redirect ke dashboard setelah login sukses
    }
  }

  // Fungsi login dengan Google OAuth
  const handleGoogleLogin = async () => {
    setMessage("")
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" })
    if (error) {
      setMessage("Login Google gagal: " + error.message)
    } else {
      // Biasanya sudah redirect otomatis, jika tidak bisa, lakukan manual:
      navigate("/dashboard")
    }
  }

  // Listener perubahan auth state, langsung redirect kalau sudah login
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/dashboard")
    })
    return () => listener.subscription.unsubscribe()
  }, [navigate])

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, sans-serif", background: "#fff" }}>
      {/* Bagian kiri: Form login */}
      <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 60px", boxSizing: "border-box" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FFD1E3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>🎓</span>
            </div>
            <span style={{ fontWeight: "bold", fontSize: 15, color: "#222" }}>KelasKampus</span>
          </div>
        </div>
        <h1 style={{ fontWeight: "700", fontSize: "44px", marginBottom: 4 }}>Selamat Datang</h1>
        <p style={{ color: "#222", fontSize: "17px", marginBottom: 38 }}>Masuk untuk Mulai Persiapan SNBT Anda</p>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", background: "#F2F5F7", borderRadius: 8, marginBottom: 15, border: "1px solid #e0e0e0" }}>
            <input type="email" placeholder="Masukkan Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ flex: 1, border: "none", background: "transparent", fontSize: 17, padding: "14px", outline: "none" }} />
            <span style={{ padding: "0 12px", color: "#AAA", fontSize: 19 }}>🔍</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", background: "#F2F5F7", borderRadius: 8, marginBottom: 15, border: "1px solid #e0e0e0" }}>
            <input type="password" placeholder="Masukkan Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ flex: 1, border: "none", background: "transparent", fontSize: 17, padding: "14px", outline: "none" }} />
            <span style={{ padding: "0 12px", color: "#AAA", fontSize: 19 }}>🔒</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, color: "#314255", marginBottom: 22 }}>
            <label><input type="checkbox" style={{ marginRight: 8 }} defaultChecked /> Remember me</label>
            <span style={{ cursor: "pointer", color: "#314255", fontWeight: 500 }}>Forgot Password?</span>
          </div>
          <button type="submit" style={{ width: "100%", background: "#37608F", color: "#fff", border: "none", borderRadius: 8, padding: "13px 0", fontWeight: 500, fontSize: 18, marginBottom: 18, cursor: "pointer" }}>Masuk</button>
        </form>
        <div style={{ width: "100%", display: "flex", alignItems: "center", margin: "16px 0" }}>
          <div style={{ flex: 1, borderBottom: "1.5px solid #C6CEDA" }}></div>
          <span style={{ padding: "0 15px", color: "#A0A9BC" }}>atau</span>
          <div style={{ flex: 1, borderBottom: "1.5px solid #C6CEDA" }}></div>
        </div>
        <button onClick={handleGoogleLogin} style={{ width: "100%", background: "#C6D9E7", color: "#222", border: "none", borderRadius: 8, padding: "13px 0", fontWeight: 500, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 22, cursor: "pointer" }}>
          <span style={{ background: "#fff", padding: "7px", borderRadius: "50%", marginRight: 6 }}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 21, height: 21 }} />
          </span>
          Masuk dengan Akun Google
        </button>
        <div style={{ width: "100%", textAlign: "center", fontSize: 15, marginTop: 8 }}>
          Belum punya akun?{" "}
          <span
            style={{ color: "#295B81", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/register")}
          >
            Daftar sekarang!
          </span>
        </div>
        {message && <p style={{ marginTop: 16, color: "red" }}>{message}</p>}
      </div>
      {/* Bagian kanan: gambar */}
      <div style={{ width: "50%", height: "100vh", background: "#eee", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?crop=entropy&fit=crop&w=800&q=80" alt="mahasiswa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
}
