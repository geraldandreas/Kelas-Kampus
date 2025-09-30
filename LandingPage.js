import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

export default function LandingPage({ session, onLogout }) {
  const navigate = useNavigate()
  const berandaRef = useRef(null)
  const pengalamanRef = useRef(null)
  const faqRef = useRef(null)

  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const faqItems = [
    {
      question: "Lorem Ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed ligula bibendum, varius purus sit amet, cursus est. Maecenas rhoncus condimentum ex eu fringilla. Sed et elit eros. Mauris blandit a nibh vel interdum. Donec lectus orci, eleifend sit amet nibh sit amet, interdum dictum magna. Etiam vel est sagittis, cursus lectus ac, consectetur nisi.",
    },
    {
      question: "Lorem Ipsum dolor sit amet?",
      answer: "",
    },
    {
      question: "Lorem Ipsum dolor sit amet?",
      answer: "",
    },
    {
      question: "Lorem Ipsum dolor sit amet?",
      answer: "",
    },
  ];

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index)
  }

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", background: "#fff" }}>
      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          background: "#fff",
          borderBottom: "1px solid #eaeaea",
          padding: "18px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#FFD1E3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 700 }}>ðŸŽ“</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 20 }}>KelasKampus</span>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 18 }}>
          <button style={navButtonStyle} onClick={() => scrollToRef(berandaRef)}>
            Beranda
          </button>
          <button style={navButtonStyle} onClick={() => scrollToRef(pengalamanRef)}>
            Kata Mereka
          </button>
          <button style={navButtonStyle} onClick={() => scrollToRef(faqRef)}>
            FAQ
          </button>
        </div>
        {session ? (
          <button
            onClick={onLogout}
            style={{
              background: "#d32f2f",
              color: "#fff",
              borderRadius: 7,
              fontSize: 17,
              border: "none",
              fontWeight: 600,
              padding: "8px 30px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "#295B81",
              color: "#fff",
              borderRadius: 7,
              fontSize: 17,
              border: "none",
              fontWeight: 600,
              padding: "8px 30px",
              cursor: "pointer",
            }}
          >
            Masuk
          </button>
        )}
      </nav>

      {/* HERO (Landing Atas) */}
      <section
        ref={berandaRef}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "96px 80px 50px 80px",
          background: "#fff",
        }}
      >
        <div style={{ flex: 1, minWidth: 400 }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 800,
              marginBottom: 18,
              lineHeight: 1.07,
            }}
          >
            Tryout SNBT 2026 <br />
            Menuju PTN Impianmu!
          </h1>
          <p style={{ fontSize: "22px", color: "#46505C", marginBottom: 22 }}>
            Belajar efektif, nilai maksimal. Mulai dari Try Out Online sekarang juga!
          </p>
          <button
            style={{
              background: "#295B81",
              color: "#FFF",
              fontWeight: 600,
              fontSize: "20px",
              border: "none",
              borderRadius: "8px",
              padding: "16px 42px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Coba Gratis Sekarang!
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: 22,
            alignItems: "flex-start",
            marginLeft: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0"
              alt="Siswa 1"
              style={{
                borderRadius: "18px",
                objectFit: "cover",
                width: 210,
                height: 165,
                background: "#eee",
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
              alt="Siswa 2"
              style={{
                borderRadius: "18px",
                objectFit: "cover",
                width: 210,
                height: 165,
                border: "4px solid #295B81",
                background: "#eee",
              }}
            />
          </div>
          <img
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5"
            alt="Graduation"
            style={{
              borderRadius: "18px",
              objectFit: "cover",
              width: 180,
              height: 360,
              background: "#eee",
            }}
          />
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section
        style={{
          background: "#c4dae4",
          padding: "60px 0 46px 0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "700",
            marginBottom: 44,
            fontSize: 28,
          }}
        >
          Kenapa <span style={{ color: "#295B81" }}>Kelas Kampus</span> pilihan
          terbaik?
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: 35,
            maxWidth: 1080,
            margin: "auto",
            flexWrap: "wrap",
          }}
        >
          <Feature
            title="Soal Terbaru & Relevan"
            desc="Soal Pilihan yang Diantaranya Diambil Dari soal Tes UTBK Tahun Sebelumnya dan Merupakan Soal Terbaik UTBK SBMPTN"
          />
          <Feature
            title="Pembahasan To-The-Point"
            desc="Setiap soal dilengkapi penjelasan singkat dan ringkasan topik, jadi lebih cepat paham."
          />
          <Feature
            title="Akses Fleksibel & Terjangkau"
            desc="Soal Pilihan yang Diantaranya Diambil Dari soal Tes UTBK Tahun Sebelumnya dan Merupakan Soal Terbaik UTBK SBMPTN."
          />
          <Feature
            title="Rekomendasi Nilai"
            desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt."
          />
        </div>
      </section>

      {/* KATA MEREKA / TESTIMONI */}
      <section
        ref={pengalamanRef}
        style={{ background: "#91b6cd", padding: "62px 8vw 62px 8vw" }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: 800,
            fontSize: 25,
            color: "#0a1f33",
            marginBottom: 35,
          }}
        >
          Belajar lebih percaya diri dari pengalaman nyata pengguna
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 22,
          }}
        >
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              style={{
                background: "#bdd0dc",
                padding: 20,
                borderRadius: 16,
                textAlign: "left",
              }}
            >
              <p>
                <span style={{ fontSize: 20 }}>â</span> Lorem ipsum dolor sit
                amet consectetur adipiscing elit sed do eiusmod tempor
                incididunt
              </p>
              <div style={{ fontSize: 13, color: "#29426d", marginTop: 15 }}>
                <strong>Nurianti</strong>{" "}
                <span style={{ opacity: 0.7 }}>
                  <br />
                  SMAN 1 Bandung
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={faqRef}
        style={{
          background: "#c4dae4",
          padding: "55px 20px",
          minHeight: 400,
        }}
      >
        <h2
          style={{
            color: "#0a1f33",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 50,
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          FREQUENTLY ASK QUESTION (FAQ)
        </h2>
        <div style={{ maxWidth: 820, margin: "auto" }}>
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleFaq(idx)}
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: "15px 20px",
                marginBottom: 13,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.10)",
                border: openFaqIndex === idx ? "2px solid #295B81" : "none",
                userSelect: "none",
              }}
            >
                
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "#2f435f",
                }}
              >
                <span>{item.question}</span>
                <span>{openFaqIndex === idx ? <FaChevronUp /> : <FaChevronDown />}</span>
              </div>
              {openFaqIndex === idx && item.answer && (
                <p
                  style={{
                    marginTop: 10,
                    color: "#454545",
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}
                >
                  {item.answer}
                </p>
              )}
              
            </div>
            
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          fontSize: 15,
          padding: "24px 0",
          background: "#fff",
          borderTop: "1px solid #eee",
          color: "#888",
        }}
      >
        Kelas Kampus &copy; 2025
      </footer>
    </div>
  )
}

function Feature({ title, desc }) {
  return (
    <div style={{ width: 245, textAlign: "left" }}>
      <h4 style={{ fontWeight: 700, marginBottom: 7, fontSize: 17 }}>{title}</h4>
      <p style={{ fontSize: 15, color: "#2f435f" }}>{desc}</p>
    </div>
  )
}

const navButtonStyle = {
  background: "none",
  border: "none",
  color: "#222",
  fontSize: 17,
  cursor: "pointer",
  fontWeight: 500,
  padding: 0,
}