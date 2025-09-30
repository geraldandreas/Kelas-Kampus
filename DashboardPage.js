import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const sampleActivities = [
  {
    title: "Tryout UTBK 2024 - Tes Potensi Skolastik",
    daysAgo: 2,
    status: "Selesai",
    score: 85,
  },
  {
    title: "Tryout UTBK 2024 - Literasi Bahasa Indonesia",
    daysAgo: 5,
    status: "Berlangsung",
    progressPercent: 60,
  },
];

const sampleMateri = [
  {
    title: "Penalaran Matematika",
    description: "Pelajari konsep dasar matematika untuk UTBK",
  },
  {
    title: "Literasi Bahasa Indonesia",
    description: "Materi lengkap literasi dan pemahaman teks",
  },
];

const sampleNews = [
  {
    type: "UTBK SNBT",
    title: "Raih Kampus Impian Anda Bersama Kami",
    description:
      "Persiapkan diri Anda dengan materi lengkap dan tryout berkualitas untuk menghadapi UTBK-SNBT 2024.",
    timeAgo: "1 minggu yang lalu",
  },
  {
    type: "UPDATE",
    title: "Fitur Analisis Hasil Tryout Terbaru",
    description:
      "Dapatkan insight mendalam tentang performa Anda dengan fitur analisis yang telah diperbaharui.",
    timeAgo: "3 hari yang lalu",
  },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");
  const [saldo] = useState(0);
  const [totalSaldo] = useState(0);
  const [tryoutCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const name = data.user.user_metadata?.full_name || data.user.email || "User";
        setUserName(name);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Logout gagal: " + error.message);
    } else {
      navigate("/login");
    }
  };

  const linkButtonStyle = {
    background: "none",
    border: "none",
    padding: 0,
    fontSize: 14,
    color: "#2C79C8",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', Arial, sans-serif",
        padding: 24,
        background: "#F4F8FF",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#FFB7CE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 24,
              color: "#222",
            }}
          >
            K
          </div>
          <div>
            <div style={{ fontWeight: "bold", fontSize: 18 }}>Kelas Kampus</div>
            <div style={{ fontSize: 12, color: "#666" }}>Tryout Indonesia</div>
          </div>
        </div>
        <nav
          style={{
            display: "flex",
            gap: 20,
            fontSize: 15,
            color: "#778CA2",
          }}
        >
          <button style={linkButtonStyle} onClick={() => {}}>
            Beranda
          </button>
          <button style={linkButtonStyle} onClick={() => {}}>
            Materi
          </button>
          <button style={linkButtonStyle} onClick={() => {}}>
            Panduan
          </button>
          <button style={linkButtonStyle} onClick={() => {}}>
            FAQ
          </button>
        </nav>
        <button
          onClick={handleLogout}
          style={{
            background: "#8BA7BB",
            color: "#fff",
            border: "none",
            borderRadius: 20,
            padding: "8px 24px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      {/* Banner */}
      <section
        style={{
          background: "#8DA9BC",
          borderRadius: 18,
          padding: "24px 36px",
          marginBottom: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontWeight: "bold", fontSize: 28 }}>
            Selamat Datang, {userName}!
          </h2>
          <p style={{ fontSize: 16, marginTop: 4, maxWidth: 400 }}>
            Siap lanjut tryout hari ini? Mari mulai persiapan UTBK terbaikmu!
          </p>
          <button
            style={{
              marginTop: 8,
              padding: "10px 22px",
              borderRadius: 16,
              border: "none",
              background: "#E7F0F9",
              color: "#37608F",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Mulai Tryout
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&fit=crop&w=180&q=80"
          alt="Tryout Study"
          style={{ width: 160, height: 90, objectFit: "cover", borderRadius: 14 }}
        />
      </section>

      {/* Cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: 20,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 14,
            boxShadow: "0 6px 16px rgba(53,73,88,0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: "bold" }}>Rp {saldo}</div>
          <div style={{ color: "#555" }}>Saldo Saya</div>
          <button
            style={{
              marginTop: 12,
              padding: "10px 24px",
              borderRadius: 12,
              border: "none",
              background: "#8BA7BB",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Isi Saldo
          </button>
        </div>
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 14,
            boxShadow: "0 6px 16px rgba(53,73,88,0.12)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          <div>Lihat dan mulai tryout terbaru</div>
          <button
            style={{
              marginTop: 6,
              padding: "10px 24px",
              borderRadius: 12,
              border: "none",
              background: "#8BA7BB",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Lihat Semua Tryout
          </button>
        </div>
        <div
          style={{
            background: "#8DA9BC",
            color: "#fff",
            padding: 20,
            borderRadius: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <div style={{ fontSize: 32, fontWeight: "bold" }}>Rp {totalSaldo}</div>
            <div>Total saldo tersedia</div>
            <small>Siap untuk tryout premium</small>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            💰
          </div>
        </div>
        <div
          style={{
            background: "linear-gradient(90deg, #18BA82 0%, #30C39E 100%)",
            color: "#fff",
            padding: 20,
            borderRadius: 14,
            boxShadow: "0 6px 14px rgba(24,186,130,0.3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 32, fontWeight: "bold" }}>{tryoutCount}</div>
            <div>Tryout yang telah diikuti</div>
            <small>Terus semangat belajar!</small>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            📄
          </div>
        </div>
      </section>

      {/* Aktivitas & Materi */}
      <section style={{ display: "flex", gap: 24, marginBottom: 28 }}>
        <div style={{ flex: 1 }}>
          <h3>Aktivitas Terakhir</h3>
          {sampleActivities.map((a, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: 16,
                marginBottom: 12,
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {a.title}
                <button
                  style={linkButtonStyle}
                  onClick={() => {
                    // aksi review hasil
                  }}
                >
                  Review Hasil →
                </button>
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  color: "#777",
                  display: "flex",
                  gap: 12,
                }}
              >
                <span>{a.daysAgo} hari yang lalu</span>
                <span>
                  Status: <strong>{a.status}</strong>
                </span>
                {a.score !== undefined && <span>Skor: {a.score}</span>}
                {a.progressPercent !== undefined && (
                  <span>Progress: {a.progressPercent}%</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h3>
            Materi Terbaru{" "}
            <button
              style={{ ...linkButtonStyle, marginLeft: 8 }}
              onClick={() => {
                // aksi lihat semua materi
              }}
            >
              Lihat Semua →
            </button>
          </h3>
          {sampleMateri.map((m, i) => (
            <div
              key={i}
              style={{
                background: "#eef5fe",
                borderRadius: 14,
                padding: 16,
                marginBottom: 12,
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                {m.title}
              </div>
              <div style={{ fontSize: 13, color: "#556" }}>{m.description}</div>
              <button
                style={{
                  marginTop: 8,
                  padding: "8px 18px",
                  borderRadius: 12,
                  border: "none",
                  background: "#2C79C8",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Mulai Belajar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Berita */}
      <section>
        <h3>Berita & Info Terkini</h3>
        {sampleNews.map((n, i) => (
          <div
            key={i}
            style={{
              background: "#eef5fe",
              borderRadius: 14,
              padding: 20,
              marginBottom: 12,
              boxShadow: "0 3px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                marginBottom: 8,
                fontSize: 12,
                fontWeight: "bold",
                display: "inline-block",
                background: n.type === "UPDATE" ? "#F2C5A3" : "#A3C7D2",
                color: n.type === "UPDATE" ? "#7C5338" : "#2F5461",
                padding: "3px 10px",
                borderRadius: 20,
                textTransform: "uppercase",
              }}
            >
              {n.type}
            </div>
            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 6 }}>
              {n.title}
            </div>
            <div style={{ fontSize: 13, color: "#555" }}>{n.description}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
              <span>📅 </span>
              {n.timeAgo}
            </div>
          </div>
        ))}
      </section>

      <footer
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-between",
          color: "#8A8E96",
          fontSize: 14,
          borderTop: "1px solid #ddd",
          paddingTop: 12,
        }}
      >
        <div>© 2025 Kelas Kampus. Semua hak cipta dilindungi.</div>
        <div style={{ display: "flex", gap: 16 }}>
          <button style={linkButtonStyle} onClick={() => {}}>
            Bantuan
          </button>
          <button style={linkButtonStyle} onClick={() => {}}>
            Kebijakan Privasi
          </button>
          <button style={linkButtonStyle} onClick={() => {}}>
            Syarat Layanan
          </button>
          <button style={linkButtonStyle} onClick={() => {}}>
            Kontak
          </button>
        </div>
      </footer>
    </div>
  );
}
