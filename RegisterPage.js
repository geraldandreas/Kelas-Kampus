import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "./supabaseClient"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setMessage("Password tidak sama!")
      return
    }
    setLoading(true)
    setMessage("")
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    setLoading(false)
    if (error) {
      setMessage("Registrasi gagal: " + error.message)
    } else {
      setMessage("Registrasi berhasil! Silahkan cek email untuk verifikasi.")
      // Redirect ke login setelah registrasi, bukan langsung dashboard
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }
  }

  const handleGoogleRegister = async () => {
    setMessage("")
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" })
    if (error) {
      setMessage("Google login error: " + error.message)
    }
    // Biasanya OAuth redirect otomatis, tidak perlu navigate manual
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fff", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Form sisi kiri */}
      <div style={{
        width: "50%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "0 60px", boxSizing: "border-box"
      }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FFD1E3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>🎓</span>
            </div>
            <span style={{ fontWeight: "bold", fontSize: 15, color: "#222" }}>KelasKampus</span>
          </div>
        </div>
        <h1 style={{ fontWeight: "700", fontSize: "44px", marginBottom: 4 }}>Selamat Datang</h1>
        <p style={{ color: "#222", fontSize: "17px", marginBottom: 38 }}>
          Daftar Sekarang untuk Mematangkan Persiapan SNBT
        </p>
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Masukkan Nama"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{
              width: "100%",
              marginBottom: 15,
              borderRadius: 8,
              border: "1px solid #dae1e9",
              padding: "13px 16px",
              fontSize: 16,
              background: "#F2F5F7"
            }}
          />
          <div style={{
            display: "flex", alignItems: "center",
            background: "#F2F5F7", borderRadius: 8,
            marginBottom: 15, border: "1px solid #e0e0e0"
          }}>
            <input
              type="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: 1, border: "none", background: "transparent",
                fontSize: 17, padding: "14px", outline: "none"
              }}
            />
            <span style={{ padding: "0 12px", color: "#AAA", fontSize: 19 }}>🔍</span>
          </div>
          <div style={{
            display: "flex", alignItems: "center",
            background: "#F2F5F7", borderRadius: 8,
            marginBottom: 15, border: "1px solid #e0e0e0"
          }}>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                flex: 1, border: "none", background: "transparent",
                fontSize: 17, padding: "14px", outline: "none"
              }}
            />
            <span style={{ padding: "0 12px", color: "#AAA", fontSize: 19 }}>🔒</span>
          </div>
          <div style={{
            display: "flex", alignItems: "center",
            background: "#F2F5F7", borderRadius: 8,
            marginBottom: 15, border: "1px solid #e0e0e0"
          }}>
            <input
              type="password"
              placeholder="Konfirmasi Password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              style={{
                flex: 1, border: "none", background: "transparent",
                fontSize: 17, padding: "14px", outline: "none"
              }}
            />
            <span style={{ padding: "0 12px", color: "#AAA", fontSize: 19 }}>🔒</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#a0acc1" : "#37608F",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "13px 0",
              fontWeight: 500,
              fontSize: 18,
              marginBottom: 18,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Sedang memproses..." : "Daftar"}
          </button>
          {message && <div style={{ color: "#d32f2f", marginBottom: 12 }}>{message}</div>}
        </form>
        <div style={{ width: "100%", display: "flex", alignItems: "center", margin: "16px 0" }}>
          <div style={{ flex: 1, borderBottom: "1.5px solid #C6CEDA" }}></div>
          <span style={{ padding: "0 15px", color: "#A0A9BC" }}>atau</span>
          <div style={{ flex: 1, borderBottom: "1.5px solid #C6CEDA" }}></div>
        </div>
        <button
          onClick={handleGoogleRegister}
          style={{
            width: "100%", background: "#C6D9E7", color: "#222", border: "none",
            borderRadius: 8, padding: "13px 0", fontWeight: 500,
            fontSize: 18, display: "flex",
            alignItems: "center", justifyContent: "center",
            gap: 16, marginBottom: 8, cursor: "pointer"
          }}
        >
          <span style={{ background: "#fff", padding: 7, borderRadius: "50%", marginRight: 6 }}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 21, height: 21 }} />
          </span>
          Daftar dengan Akun Google
        </button>
        <div style={{ fontSize: 15, marginTop: 10 }}>
          Sudah punya akun?{" "}
          <span
            style={{ color: "#295B81", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Masuk sekarang
          </span>
        </div>
      </div>
      {/* Bagian kanan: Gambar */}
      <div style={{ width: "50%", height: "100vh", background: "#eee", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?crop=entropy&fit=crop&w=800&q=80"
          alt="mahasiswa"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  )
}
