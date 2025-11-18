// src/App.jsx
import "./index.css";
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import kittyGif from "./assets/kitty.gif";
import catFlowers from "./assets/cat-flowers.jpg";
import loveStamp from "./assets/love-stamp.png";
import card1 from "./assets/cards/card1.gif";
import card2 from "./assets/cards/card2.gif";
import card3 from "./assets/cards/card3.gif";
import heartDownload from "./assets/heart.png";
import c1 from "./assets/covers/c1.jpg";
import c2 from "./assets/covers/c2.jpg";
import c3 from "./assets/covers/c3.jpg";
import c4 from "./assets/covers/c4.jpg";
import c5 from "./assets/covers/c5.jpg";

/*
  Complete App.jsx ready to drop in.
  - Responsive tweaks: fluid card width + flip-card aspect ratio via CSS
  - Seal animation + WebAudio 'seal' sound + small PNG (heart) download
  - Sealed final page with animated kisses
*/

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/heart" element={<EnvelopePage />} />
        <Route path="/open" element={<OpenPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/final" element={<FinalLetterPage />} />
        <Route path="/sealed" element={<SealedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

/* ---------- Utilities ---------- */
function useLoadFonts() {
  useEffect(() => {
    const id = "love-app-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700;800&family=Poppins:wght@600;700;800&display=swap";
    document.head.appendChild(link);
    return () => link.remove();
  }, []);
}

/* ---------- BackgroundDecor ---------- */
function BackgroundDecor() {
  const items = [
    { key: "env1", emoji: "✉️", size: 42, left: 6, top: 12, anim: "drift-slow" },
    { key: "star1", emoji: "⭐", size: 56, left: 72, top: 6, anim: "drift-medium" },
    { key: "heart1", emoji: "💖", size: 36, left: 18, top: 40, anim: "drift-slow" },
    { key: "env2", emoji: "💌", size: 46, left: 86, top: 32, anim: "drift-fast" },
    { key: "spark1", emoji: "✨", size: 22, left: 30, top: 16, anim: "drift-fast" },
    { key: "star2", emoji: "🌟", size: 48, left: 4, top: 72, anim: "drift-slow" },
    { key: "env3", emoji: "✉️", size: 34, left: 60, top: 78, anim: "drift-medium" },
    { key: "heart3", emoji: "💗", size: 28, left: 92, top: 62, anim: "drift-slow" },
  ];

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {items.map((it) => (
        <div
          key={it.key}
          className={`bg-deco ${it.anim}`}
          style={{
            position: "absolute",
            left: `${it.left}%`,
            top: `${it.top}%`,
            fontSize: it.size,
            transformOrigin: "center",
            opacity: 0.95,
          }}
        >
          <div style={{ display: "inline-block", transform: "translateZ(0)" }}>{it.emoji}</div>
        </div>
      ))}
      <style>{`
        .bg-deco{ will-change: transform, opacity; }
        @keyframes floatYSlow { 0%{ transform: translateY(0px) rotate(0deg); opacity:0.95 } 50%{ transform: translateY(-18px) rotate(6deg); opacity:1 } 100%{ transform: translateY(0px) rotate(0deg); opacity:0.95 } }
        @keyframes floatYMed { 0%{ transform: translateY(0px) rotate(0deg) } 50%{ transform: translateY(-26px) rotate(-6deg) } 100%{ transform: translateY(0px) rotate(0deg) } }
        @keyframes floatYFast { 0%{ transform: translateY(0px) rotate(0deg) } 50%{ transform: translateY(-36px) rotate(10deg) } 100%{ transform: translateY(0px) rotate(0deg) } }

        .drift-slow{ animation: floatYSlow 8s ease-in-out infinite; }
        .drift-medium{ animation: floatYMed 10s ease-in-out infinite; }
        .drift-fast{ animation: floatYFast 6.8s ease-in-out infinite; }

        @media (max-width:700px){
          .bg-deco{ opacity:0.9; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Landing ---------- */
function Landing() {
  useLoadFonts();
  const navigate = useNavigate();
  const [burst, setBurst] = useState(0);
  function handleClick() {
    setBurst((b) => b + 1);
    setTimeout(() => navigate("/heart"), 900);
  }
  return (
    <div style={{ ...styles.page, fontFamily: "'Nunito', system-ui, -apple-system", position: "relative", overflow: "hidden" }}>
      <BackgroundDecor />
      <div style={styles.stripeOverlay} aria-hidden />
      <FloatingDecor />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.trafficLights}>
              <span style={{ ...styles.dot, background: "#ff7b9c" }} />
              <span style={{ ...styles.dot, background: "#ffd86b" }} />
              <span style={{ ...styles.dot, background: "#8be39e" }} />
            </div>
            <div style={{ flex: 1, textAlign: "center", fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#a84b70" }}>
              A Note for You <span style={{ color: "#ff5aaf" }}>❤</span>
            </div>
          </div>

          <div style={styles.cardBody}>
            <h1 className="responsive-title" style={{ ...styles.title, fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.5px" }}>
              Hey Princess! <span style={{ fontSize: 36 }}>💞</span>
            </h1>
            <p style={styles.subtitle}>
              I wanted to do something special for you, for this princess day,
              <br />
              so I made something special just for you...
            </p>

            <p style={{ ...styles.ctaHint }}>Click below to see what it is! ✨</p>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={handleClick} style={styles.cta} aria-label="Open my heart">
                Open My Heart 💖
              </motion.button>
            </div>

            <div style={styles.smallFooter}>Made with love, only for you 💕</div>
          </div>

          {/* ------------------- REPLACED GIF HERE ------------------- */}
          <div style={styles.catWrap}>
            <img
              src={kittyGif}
              alt="kitty gif"
              className="cat-small"
              style={{
                width: 150,
                height: "auto",
                borderRadius: 18,
                objectFit: "cover",
                boxShadow: "0 12px 30px rgba(30,20,50,0.12)",
              }}
            />
          </div>
          {/* ---------------------------------------------------------- */}

          <Confetti burstKey={burst} />
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Envelope ---------- */
function EnvelopePage() {
  useLoadFonts();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 260);
    return () => clearTimeout(t);
  }, []);

  function openEnvelope() {
    if (opening) return;
    setOpening(true);
    setTimeout(() => navigate("/open"), 700);
  }

  return (
    <div style={{ ...styles.page, fontFamily: "'Nunito', system-ui, -apple-system", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <BackgroundDecor />
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ scale: 0.7, opacity: 0, rotate: -6 }} animate={show ? { scale: [1.04, 0.98, 1], opacity: 1, rotate: [-3, 2, 0] } : {}} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
            <motion.button onClick={openEnvelope} disabled={opening} style={{ width: 260, height: 160, border: "none", background: "transparent", padding: 0, cursor: opening ? "default" : "pointer" }} whileTap={{ scale: 0.98 }}>
              <svg width="260" height="160" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="envGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#fffaf6" />
                    <stop offset="100%" stopColor="#fff3f8" />
                  </linearGradient>
                  <linearGradient id="flapGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#ffd7e6" />
                    <stop offset="100%" stopColor="#ffc0d9" />
                  </linearGradient>
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="#b76b82" floodOpacity="0.08" />
                  </filter>
                </defs>

                <g filter="url(#softShadow)">
                  <rect x="12" y="24" rx="14" width="236" height="112" fill="url(#envGrad)" stroke="#ffd7e6" strokeWidth="1.5" />
                </g>

                <path d="M24 34 L130 90 L236 34 L236 28 L24 28 Z" fill="#fff7f9" opacity="0.95" />
                <path d="M24 134 L130 78 L236 134" fill="#fff4f7" opacity="0.95" />

                <motion.g style={{ transformOrigin: "130px 28px" }} animate={opening ? { rotateX: -160 } : { rotateX: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                  <path d="M12 28 L130 86 L248 28 L248 24 L12 24 Z" fill="url(#flapGrad)" stroke="#ffb6d1" strokeWidth="1.2" />
                </motion.g>

                <motion.g animate={opening ? { scale: [1, 1.05, 0.92, 1.1, 0.95], opacity: [1, 0.8, 0.7] } : { scale: 1 }} transition={{ duration: 0.8 }} transform="translate(120,48)">
                  <path d="M8 0 C4 -6, -4 -6, -8 0 C-12 6, -6 14, 0 18 C6 14, 12 6, 8 0 Z" fill="#ff5a9e" />
                </motion.g>
              </svg>
            </motion.button>

            <div style={{ position: "absolute", top: 128, left: 0, right: 0, textAlign: "center", fontWeight: 700, color: "#a02b5a" }}>Click to open the envelope</div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 24 }}>
              <div style={{ ...styles.pill, animation: "beat 1.6s ease-in-out infinite" }} aria-hidden>
                Special Delivery 💌
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes beat {
          0%{ transform: scale(1) }
          25%{ transform: scale(1.06) }
          40%{ transform: scale(0.98) }
          60%{ transform: scale(1.03) }
          100%{ transform: scale(1) }
        }
      `}</style>
    </div>
  );
}

/* ---------- Open (letter) ---------- */
function OpenPage() {
  useLoadFonts();
  const navigate = useNavigate();
  return (
    <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative", overflow: "hidden" }}>
      <BackgroundDecor />
      <div style={{ maxWidth: 980, width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, color: "#d84b85", fontSize: 22 }}>A Love Letter 💌</div>
          <div style={{ color: "#b57b93", marginTop: 6 }}>From my heart to yours</div>
        </div>

        <div style={{ position: "relative", borderRadius: 18, background: "linear-gradient(180deg,#fffaf3 0%, #fff6f0 100%)", padding: 24, boxShadow: "0 22px 46px rgba(20,20,40,0.08)" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 28, minHeight: 320, position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "#ffeef6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#d94a8a" }}>💘</div>
              <div style={{ fontWeight: 700, color: "#c63b71" }}>My Sweetest Love</div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #f6e6ef", margin: "18px 0" }} />

            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", color: "#ff4c9e", fontWeight: 700, marginBottom: 8 }}>My dearest Chanchal,</p>

                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, lineHeight: 1.9, color: "#111" }}>
                  <p>
                    Every moment with you feels like a beautiful dream that I never want to wake up from. I want you to know that you are the most precious person in my life. Every day with you is a gift, and I'm grateful for every second we share together. You are my today and my forever.
                  </p>
                  <p style={{ textAlign: "right", marginTop: 18, color: "#d94a8a", fontWeight: 700 }}>With all my love, Always yours 💕</p>
                </div>

                <div style={{ marginTop: 14 }}>
                  <img
                    src={loveStamp}
                    alt="love stamp"
                    style={{
                      width: 84,
                      opacity: 0.95,
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>

              <div style={{ width: 240, flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                <div style={{ position: "relative", top: -28 }}>
                  <img
                    src={catFlowers}
                    alt="cat holding flowers"
                    style={{
                      width: 170,
                      borderRadius: 14,
                      objectFit: "cover",
                      boxShadow: "0 12px 30px rgba(30,20,50,0.08)"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
            <button onClick={() => navigate("/playlist")} style={{ background: "#ff4c9e", color: "#fff", padding: "14px 36px", borderRadius: 28, border: "none", fontWeight: 700, boxShadow: "0 12px 30px rgba(255,76,158,0.18)" }}>
              Continue To See More ✨
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 18, color: "#b57b93" }}>Made with love — tailored just for you 💖</div>
      </div>
    </div>
  );
}

/* ---------- Playlist Page (audio player + carousel) ---------- */
function PlaylistPage() {
  useLoadFonts();
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const [tracks] = useState(sampleTracks);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setTime({ current: audio.currentTime, duration: audio.duration || 0 });
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = tracks[current].src;
    audio.currentTime = 0;
    if (playing) audio.play();
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play();
    else audio.pause();
  }, [playing]);

  function playTrack(index) {
    if (index === current) {
      setPlaying((p) => !p);
    } else {
      setCurrent(index);
      setPlaying(true);
      const node = containerRef.current?.querySelectorAll(".track-card")[index];
      node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  function format(t) {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function seek(e) {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.target.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * (audio.duration || 0);
  }

  function scroll(offset) {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  return (
    <div style={{ ...styles.page, padding: "40px 20px", fontFamily: "'Nunito', system-ui", position: "relative", overflow: "hidden" }}>
      <BackgroundDecor />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", color: "#d84b85" }}>A Dedicated Playlist For You</h2>
          <div style={{ color: "#b57b93" }}>I Hope You'll Like It</div>
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 14, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
          <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={tracks[current].cover} alt="cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{tracks[current].title}</div>
            <div style={{ color: "#b57b93", fontSize: 13 }}>{tracks[current].artist}</div>
            <div style={{ height: 10, marginTop: 8, background: "#fdeff5", borderRadius: 6, overflow: "hidden" }} onClick={seek}>
              <div style={{ width: `${(time.current / time.duration || 0) * 100}%`, height: "100%", background: "#ff6fa8" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#a86b8a", marginTop: 6 }}>
              <div>{format(time.current)}</div>
              <div>{format(time.duration)}</div>
            </div>
          </div>

          <button onClick={() => setPlaying((p) => !p)} style={{ width: 46, height: 46, borderRadius: 28, background: "#ff4c9e", color: "#fff", border: "none", cursor: "pointer" }}>
            {playing ? "❚❚" : "▶"}
          </button>
        </div>

        <div style={{ position: "relative", marginTop: 28, padding: "28px", borderRadius: 18, background: "linear-gradient(180deg,#fffaf3 0%, #fff6f0 100%)", boxShadow: "0 22px 46px rgba(20,20,40,0.06)" }}>
          <button onClick={() => scroll(-300)} style={{ position: "absolute", left: 12, top: "48%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 999, border: "none", background: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.06)", cursor: "pointer" }}>‹</button>
          <button onClick={() => scroll(300)} style={{ position: "absolute", right: 12, top: "48%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 999, border: "none", background: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.06)", cursor: "pointer" }}>›</button>

          <div ref={containerRef} style={{ display: "flex", gap: 22, overflowX: "auto", padding: "12px 48px", scrollBehavior: "smooth" }}>
            {tracks.map((t, idx) => (
              <div
                key={t.id}
                className={"track-card"}
                onClick={() => playTrack(idx)}
                style={{
                  minWidth: 220,
                  background: "#fff",
                  borderRadius: 12,
                  padding: 14,
                  boxShadow: idx === current ? "0 18px 40px rgba(200,84,130,0.12)" : "0 8px 20px rgba(20,20,40,0.04)",
                  border: idx === current ? "2px solid #ffd4e7" : "1px solid #f3e7ec",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: "100%", height: 160, borderRadius: 8, overflow: "hidden" }}>
                  <img src={t.cover} alt={t.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ marginTop: 10, fontWeight: 700 }}>{t.title}</div>
                <div style={{ color: "#b57b93", fontSize: 13 }}>{t.artist}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
            <Link to="/cards" style={{ background: "#ff4c9e", color: "#fff", padding: "12px 28px", borderRadius: 28, textDecoration: "none", fontWeight: 700 }}>
              Continue to Next ✨
            </Link>
          </div>
        </div>

        <audio ref={audioRef} />
      </div>
    </div>
  );
}

/* ---------- Sample tracks (placeholder) ---------- */
const sampleTracks = [
  {
    id: 1,
    title: "Perfect",
    artist: "Our Future 🥰💕",
    src: "/audio/Perfect.mp3",
    cover: c1 ,
  },
  {
    id: 2,
    title: "Humsafar",
    artist: "Tu Meri Humsafar 🥺💞🫂",
    src: "/audio/Humsafar.mp3",
    cover: c2,
  },
  {
    id: 3,
    title: "Tum se hi",
    artist: "Tum Se Hi 🫵🏻☀️🌔✨🌹💕",
    src: "/audio/Tum se hi.mp3",
    cover: c3,
  },
  {
    id: 4,
    title: "Dil tu jaan tu",
    artist: "☺️💖💝",
    src: "/audio/Dil tu jaan tu.mp3",
    cover: c4,
  },
  {
    id: 5,
    title: "Raabta",
    artist: "👩🏼‍❤️‍👨🏼💕💕",
    src: "/audio/Raabta.mp3",
    cover: c5,
  },
];

/* ---------- Confetti ---------- */
function Confetti({ burstKey }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    if (burstKey === 0) return;
    const colors = ["#FF5A9E", "#FFD86B", "#8BE39E", "#8EC5FF", "#FFB3D6", "#C68CFF", "#FFF27A", "#FF8C66"];
    const pieces = [];
    for (let i = 0; i < 60; i++) {
      pieces.push({
        id: "c" + Math.random().toString(36).slice(2, 9),
        left: Math.random() * 80 + 10,
        delay: Math.random() * 0.2,
        rot: Math.random() * 720 - 360,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: "rect",
      });
    }
    for (let i = 0; i < 20; i++) {
      pieces.push({
        id: "s" + Math.random().toString(36).slice(2, 9),
        left: Math.random() * 80 + 10,
        delay: Math.random() * 0.25,
        rot: 0,
        size: Math.random() * 6 + 4,
        color: "#FFF",
        type: "spark",
      });
    }
    setParticles(pieces);
    const tid = setTimeout(() => setParticles([]), 1400);
    return () => clearTimeout(tid);
  }, [burstKey]);

  if (particles.length === 0) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "40%",
            transform: `translateY(-50%) rotate(${p.rot}deg)`,
            width: p.type === "rect" ? p.size : p.size,
            height: p.type === "rect" ? p.size * 0.6 : p.size,
            background: p.color,
            borderRadius: p.type === "spark" ? "50%" : 3,
            opacity: 0.95,
            filter: p.type === "spark" ? "drop-shadow(0 3px 8px rgba(255,200,255,0.12))" : "none",
            animation: `confettiFall ${900 + Math.random() * 400}ms cubic-bezier(.2,.7,.2,1) ${p.delay}s both, confettiRotate ${800 + Math.random() * 600}ms linear ${p.delay}s both`,
          }}
        />
      ))}

      <style>{`
        @keyframes confettiFall {
          0%{ transform: translateY(-20px) rotate(0deg); opacity:1 }
          60%{ opacity:1 }
          100%{ transform: translateY(420px) rotate(200deg); opacity:0 }
        }
        @keyframes confettiRotate{
          0%{ transform: translateY(-20px) rotate(0deg) }
          100%{ transform: translateY(420px) rotate(540deg) }
        }
      `}</style>
    </div>
  );
}

/* ---------- Floating decorations ---------- */
function FloatingDecor() {
  return (
    <>
      <div style={{ ...styles.floatItem, left: 40, top: 80, width: 90, height: 90 }} className="float-left">🌟</div>
      <div style={{ ...styles.floatItem, left: 120, top: 300, width: 40, height: 40 }} className="float-slow">💖</div>
      <div style={{ ...styles.floatItem, right: 80, top: 60, width: 120, height: 120 }} className="float-fast">☁️</div>
      <div style={{ ...styles.floatItem, right: 160, bottom: 140, width: 50, height: 50 }} className="float-slow">💗</div>
      <div style={{ ...styles.floatItem, left: 220, bottom: 80, width: 60, height: 60 }} className="float-fast">✨</div>
      <style>{`
        .float-left{ position:absolute; font-size:40px; transform-origin:center; animation: floatY 6s ease-in-out infinite; }
        .float-slow{ position:absolute; font-size:22px; animation: floatY 9s ease-in-out infinite; }
        .float-fast{ position:absolute; font-size:34px; animation: floatY 4.5s ease-in-out infinite; }
        @keyframes floatY{ 0%{ transform: translateY(0px);} 50%{ transform: translateY(-18px);} 100%{ transform: translateY(0px);} }
      `}</style>
    </>
  );
}

/* ---------- Cat doodling (upload toggle) ---------- */
function CatDoodlingWithToggle({ drawTrigger }) {
  const defaultGif = "https://i.gifer.com/embedded/download/2o5M.gif";
  const [useUploaded, setUseUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef(null);
  function onChoose() { inputRef.current?.click(); }
  function onFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    setUseUploaded(true);
  }
  return (
    <div style={{ width: 200, height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ position: "relative" }}>
        <img src={useUploaded && imageUrl ? imageUrl : defaultGif} alt="cat" style={{ width: 150, height: 150, borderRadius: 18, objectFit: "cover", boxShadow: "0 12px 30px rgba(30,20,50,0.12)" }} />
        <div style={{ position: "absolute", right: 6, bottom: 6, display: "flex", gap: 8 }}>
          <button onClick={onChoose} aria-label="Change cat image" title="Upload image" style={styles.iconBtn}>📷</button>
          <button onClick={() => setUseUploaded((u) => !u)} aria-label="Toggle GIF/upload" title="Toggle GIF / Uploaded image" style={styles.iconBtn}>{useUploaded ? "GIF" : "IMG"}</button>
          <input ref={inputRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        </div>

        <motion.svg viewBox="0 0 140 140" width="140" height="140" style={{ position: "absolute", right: -8, top: -28, overflow: "visible", pointerEvents: "none" }}>
          <motion.path d="M104 40 C92 18, 64 22, 70 48 C76 22, 46 18, 36 40 C26 64, 86 98, 104 40 Z" fill="none" stroke="#d92f5b" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={320} strokeDashoffset={drawTrigger ? 0 : 320} animate={drawTrigger ? { strokeDashoffset: [320, 0], scale: [1, 1.06, 1], opacity: [0.8, 1, 0.95] } : { strokeDashoffset: [320] }} transition={{ duration: 0.9, ease: "easeOut" }} />
          <motion.path d="M106 42 C95 22, 68 26, 74 50 C80 26, 50 22, 40 42 C30 64, 88 96, 106 42 Z" fill="none" stroke="#ff7a9e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={320} strokeDashoffset={drawTrigger ? 0 : 320} animate={drawTrigger ? { strokeDashoffset: [320, 0], opacity: [0.6, 1] } : { strokeDashoffset: [320] }} transition={{ duration: 1.05, ease: "easeOut" }} style={{ transformOrigin: "70px 60px" }} />
          <motion.path d="M90 30 q6 -6 12 0" stroke="#ff4c9e" strokeWidth={2} strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={drawTrigger ? { pathLength: [0, 1] } : { pathLength: 0 }} transition={{ duration: 0.5, delay: 0.2 }} />
          <motion.path d="M104 40 C92 18, 64 22, 70 48 C76 22, 46 18, 36 40 C26 64, 86 98, 104 40 Z" fill="#ff9db8" opacity={0.55} animate={drawTrigger ? { scale: [0.98, 1.08, 1], opacity: [0.4, 1, 0.9] } : { scale: 1 }} transition={{ duration: 1.1 }} style={{ transformOrigin: "70px 60px" }} />
        </motion.svg>
      </div>
    </div>
  );
}

/* ---------- Cards Page ---------- */
function CardsPage() {
  useLoadFonts();
  const navigate = useNavigate();
  const initial = [
    {
      id: "c1",
      front: card1,
      back: "With you, every love song feels like our story, every touch is a promise of forever.",
      revealed: false
    },
    {
      id: "c2",
      front: card2,
      back: "In your eyes, I’ve found my home; in your arms, my peace. You are my everything, and I will spend my life loving you more than words can say.",
      revealed: false
    },
    {
      id: "c3",
      front: card3,
      back: "Loving you feels like magic—effortless, beautiful, and meant to be. With every heartbeat, I’m reminded that my heart belongs to you.",
      revealed: false
    }
  ];
  
  const [cards, setCards] = useState(initial);
  const [message, setMessage] = useState("Start by tapping any card below");
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    const found = cards.filter((c) => c.revealed).length;
    if (found === 0) setMessage("Start by tapping any card above");
    else if (found < cards.length) setMessage(`${found} of ${cards.length} messages discovered! Keep exploring 💕`);
    else setMessage(`All ${cards.length} messages discovered! 🎉`);
    if (found === cards.length) {
      const t = setTimeout(() => setShowDone(true), 420);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [cards]);

  function flipCard(idx) {
    setCards((prev) => prev.map((c, i) => (i === idx ? { ...c, revealed: !c.revealed } : c)));
  }

  const discovered = cards.filter((c) => c.revealed).length;
  const pct = Math.round((discovered / cards.length) * 100);

  return (
    <div style={{ ...styles.page, paddingTop: 40 }}>
      <BackgroundDecor />
      <div style={{ filter: showDone ? "blur(6px)" : "none", transition: "filter 220ms", pointerEvents: showDone ? "none" : "auto" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", color: "#d84b85" }}>Some Special Cards For You</h2>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 6 }}>
              <div style={{ color: "#b57b93", textAlign: "center", fontSize: 15 }}>{message}</div>

              <div style={{ width: "60%", maxWidth: 420, marginTop: 12 }}>
                <div style={{ height: 10, background: "#fdeff5", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "#ff6fa8", transition: "width 420ms ease" }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "#fffaf3", borderRadius: 18, padding: 24, boxShadow: "0 22px 46px rgba(20,20,40,0.06)" }}>
            <div style={{ display: "flex", gap: 18, alignItems: "stretch" }}>
              {cards.map((c, idx) => (
                <FlipCard key={c.id} card={c} onClick={() => flipCard(idx)} />
              ))}
            </div>
            <div style={{ height: 8 }} />
          </div>

          <div style={{ textAlign: "center", marginTop: 18 }}>
            <button onClick={() => navigate("/playlist")} style={{ ...styles.cta, background: "#ffd0e6", color: "#d84b85" }}>Back</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDone && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.28)", backdropFilter: "blur(4px)", zIndex: 1200 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.28 }} style={{ width: 360, maxWidth: "92%", background: "#fff", borderRadius: 16, padding: 22, boxShadow: "0 20px 60px rgba(20,20,40,0.18)", textAlign: "center" }}>
              <motion.div animate={{ y: [0, -8, 0], rotate: [0, 6, -6, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }} style={{ fontSize: 34, marginBottom: 8 }}>🎉</motion.div>

              <div style={{ fontWeight: 800, color: "#d84b85", fontSize: 20, marginBottom: 8 }}>All Messages Unlocked!</div>
              <div style={{ fontSize: 14, color: "#6b4864", marginBottom: 14 }}>Each message is a piece of my heart that belongs to you forever. ✨</div>

              <motion.button whileHover={{ scale: 1.03, boxShadow: "0 18px 40px rgba(255,76,158,0.22)" }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/final")} style={{ display: "inline-block", width: "86%", background: "#ff4c9e", color: "#fff", padding: "12px 18px", borderRadius: 28, border: "none", fontWeight: 700, boxShadow: "0 12px 28px rgba(255,76,158,0.18)", cursor: "pointer" }}>
                Open the Final Letter 💌
              </motion.button>

              <div style={{ marginTop: 12 }}>
                <button onClick={() => setShowDone(false)} style={{ background: "transparent", border: "none", color: "#b36f93", cursor: "pointer", textDecoration: "underline", fontSize: 13 }}>
                  Stay here a bit longer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- FlipCard ---------- */
function FlipCard({ card, onClick }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ flex: 1, minHeight: 160, cursor: "pointer" }}
    >
      <div style={{ perspective: 1000 }}>
        <motion.div
          whileTap={{ scale: 0.99 }}
          className="flip-card-wrap"
          style={{ position: "relative", width: "100%" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transition: "transform 0.6s",
              transformStyle: "preserve-3d",
              transform: card.revealed ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT */}
            <div
              style={{
                backfaceVisibility: "hidden",
                position: "absolute",
                inset: 0,
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 10px 26px rgba(20,20,40,0.06)",
                border: "1px solid #f3e7ec",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <img
                  src={card.front}
                  alt="card"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* 🔹 Tint overlay (only when hovered & not revealed) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hover && !card.revealed ? 0.55 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)",
                    pointerEvents: "none",
                  }}
                />

                {/* Tap hint */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: hover && !card.revealed ? 1 : 0,
                    y: hover && !card.revealed ? 0 : 6,
                  }}
                  transition={{ duration: 0.22 }}
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "0 2px 6px rgba(0,0,0,0.4)",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  Tap ✨
                </motion.div>
              </div>
            </div>

            {/* BACK */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                position: "absolute",
                inset: 0,
                borderRadius: 10,
                padding: 18,
                background: "#fff",
                boxShadow: "0 10px 26px rgba(20,20,40,0.06)",
                border: "1px solid #f3e7ec",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", color: "#d84b85", fontWeight: 700, marginBottom: 8 }}>
                  Special Message
                </div>
                <div style={{ color: "#333" }}>{card.back}</div>
                <div style={{ marginTop: 12 }}>
                  <small style={{ color: "#b57b93" }}>Tap to flip back</small>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- FinalLetterPage (Seal animation + sound + download) ---------- */
function FinalLetterPage() {
  useLoadFonts();
  const navigate = useNavigate();
  const [sealing, setSealing] = useState(false);
  const sealAnchorRef = useRef(null);

  // Simple WebAudio 'seal' sound (soft stamp)
  function playSealSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = 220;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.value = 0;
      // small envelope
      const now = ctx.currentTime;
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.18, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
      o.frequency.setValueAtTime(220, now);
      o.frequency.exponentialRampToValueAtTime(140, now + 0.5);
      o.start(now);
      o.stop(now + 0.55);
    } catch (e) {
      // ignore if WebAudio unsupported
    }
  }

  // create small sealed SVG and trigger download (heart png)
  function downloadSealImage() {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="840" height="840" viewBox="0 0 420 420">
        <defs>
          <radialGradient id="hg" cx="50%" cy="35%" r="80%">
            <stop offset="0%" stop-color="#ff9bb3"/>
            <stop offset="100%" stop-color="#ef3d6b"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="#fff7f9"/>
        <g transform="translate(210,210)">
          <path d="M0 -60 C 40 -120, 140 -120, 140 -20 C 140 60, 0 120, 0 160 C 0 120, -140 60, -140 -20 C -140 -120, -40 -120, 0 -60 Z"
                fill="url(#hg)" stroke="#d82b61" stroke-width="6" />
        </g>
      </svg>
    `.trim();

    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 840;
      canvas.height = 840;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff7f9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "heart.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
      }, "image/png", 0.92);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      // fallback: download raw svg
      const a = document.createElement("a");
      a.href = URL.createObjectURL(svgBlob);
      a.download = "heart.svg";
      document.body.appendChild(a);
      a.click();
      a.remove();
    };

    img.src = url;
  }

  // animate a wax + stamp overlay then navigate to /sealed
  async function handleSeal() {
    if (sealing) return;
    setSealing(true);
    playSealSound();

    // create overlay group
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "2000";
    overlay.style.pointerEvents = "none";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    // wax blob
    const wax = document.createElement("div");
    wax.style.width = "120px";
    wax.style.height = "120px";
    wax.style.borderRadius = "999px";
    wax.style.background = "radial-gradient(circle at 30% 20%, #ffb2c6, #e6215b)";
    wax.style.boxShadow = "0 14px 40px rgba(230,50,90,0.32), inset 0 -6px 20px rgba(0,0,0,0.06)";
    wax.style.transform = "translateY(-40px) scale(0)";
    wax.style.opacity = "0";
    wax.style.pointerEvents = "none";
    wax.style.display = "flex";
    wax.style.alignItems = "center";
    wax.style.justifyContent = "center";

    // stamp emoji (could replace with your own stamp image)
    const stamp = document.createElement("div");
    stamp.textContent = "❣️";
    stamp.style.fontSize = "44px";
    stamp.style.transform = "translateY(-220px) rotate(-18deg)";
    stamp.style.opacity = "0";

    overlay.appendChild(wax);
    overlay.appendChild(stamp);
    document.body.appendChild(overlay);

    // CSS animations via JS timed steps
    await animatePromise(wax, [
      { transform: "translateY(-40px) scale(0.0)", opacity: 0 },
      { transform: "translateY(-20px) scale(1.08)", opacity: 1, offset: 0.65 },
      { transform: "translateY(-18px) scale(0.96)", offset: 0.85 },
      { transform: "translateY(-18px) scale(1.00)", offset: 1.0 },
    ], { duration: 700, easing: "cubic-bezier(.22,.9,.18,1)", fill: "forwards" });

    wax.animate([{ transform: "translateY(-18px) scale(1)" }, { transform: "translateY(-22px) scale(1.03)" }, { transform: "translateY(-18px) scale(1)" }], { duration: 420, easing: "ease-in-out" });

    await delay(120);
    await animatePromise(stamp, [
      { transform: "translateY(-220px) rotate(-18deg)", opacity: 0 },
      { transform: "translateY(-48px) rotate(-5deg)", opacity: 1, offset: 0.6 },
      { transform: "translateY(-22px) rotate(0deg)", opacity: 1, offset: 1.0 },
    ], { duration: 420, easing: "cubic-bezier(.2,.9,.18,1)", fill: "forwards" });

    stamp.animate([{ transform: "translateY(-22px) rotate(0deg) scale(1)" }, { transform: "translateY(-28px) rotate(0deg) scale(.94)" }, { transform: "translateY(-22px) rotate(0deg) scale(1)" }], { duration: 380 });

    const shine = document.createElement("div");
    shine.style.position = "absolute";
    shine.style.left = "calc(50% + 60px)";
    shine.style.top = "calc(50% - 60px)";
    shine.style.width = "10px";
    shine.style.height = "40px";
    shine.style.background = "linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.55), rgba(255,255,255,0.0))";
    shine.style.transform = "translate(-50%,-50%) rotate(30deg) scale(0)";
    overlay.appendChild(shine);
    shine.animate([{ transform: "translate(-50%,-50%) rotate(30deg) scale(0)" }, { transform: "translate(-50%,-50%) rotate(30deg) scale(1.6)", opacity: 1 }, { transform: "translate(-50%,-50%) rotate(30deg) scale(0)", opacity: 0 }], { duration: 520 });

    try { downloadSealImage(); } catch (e) { /* ignore */ }

    await delay(750);
    overlay.remove();
    navigate("/sealed");
  }

  return (
    <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 18px", position: "relative", overflow: "hidden" }}>
      <BackgroundDecor />
      <div style={{ maxWidth: 820, width: "100%", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }} style={{ background: "linear-gradient(180deg,#fffaf3, #fff6f0)", borderRadius: 18, padding: 28, boxShadow: "0 22px 46px rgba(20,20,40,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#ffdfe9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✉️</div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 22, color: "#231826" }}>Final Love Letter</div>
          </div>

          <div style={{ marginTop: 12, fontSize: 15, color: "#b36f93", fontWeight: 700 }}>My sweetest Cutiepie,</div>

          <div style={{ marginTop: 12, fontFamily: "'Nunito', sans-serif", fontSize: 16, lineHeight: 1.9, color: "#111" }}>
            <p style={{ margin: 0 }}>Hey Baiyko, you are the world to me.</p>
            <p style={{ marginTop: 12, color: "#66a6ff" }}>I hope this tiny world made you smile — and whispered how much you mean to me.</p>
            <p style={{ marginTop: 12 }}>I'll keep making memories, big and small, always with you.</p>
            <p style={{ marginTop: 12, color: "#caa6e0", fontStyle: "italic" }}>Forever yours, in every little universe.</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end", marginTop: 22 }}>
            <button onClick={handleSeal} style={{ background: "#ff7aa8", color: "#fff", padding: "12px 20px", borderRadius: 28, border: "none", fontWeight: 700, boxShadow: "0 12px 30px rgba(255,76,158,0.18)", cursor: "pointer" }}>
              Seal this Letter 💌
            </button>

            <button onClick={() => navigate("/")} style={{ background: "#bff0d9", color: "#0a4c36", padding: "10px 16px", borderRadius: 20, border: "none", fontWeight: 700, cursor: "pointer" }}>
              Restart
            </button>
          </div>

          <div style={{ marginTop: 18, color: "#b57b93", fontSize: 13 }}>Sealing will finish the experience.</div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Helper: small Promise-based animate wrapper ---------- */
function animatePromise(el, keyframes, options = {}) {
  return new Promise((res) => {
    const anim = el.animate(keyframes, options);
    anim.addEventListener("finish", () => res());
    setTimeout(() => res(), options.duration ? options.duration + 60 : 700);
  });
}
function delay(ms) { return new Promise((r) => setTimeout(r, ms)); }

/* ---------- SealedPage (final) with kisses pop ---------- */
function SealedPage() {
  useLoadFonts();
  const navigate = useNavigate();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 900);
    return () => clearInterval(id);
  }, []);

  function sendVirtualKisses() {
    const count = 18;
    const body = document.body;
    const container = document.createElement("div");
    container.className = "kiss-container";
    container.style.position = "fixed";
    container.style.left = "0";
    container.style.top = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.zIndex = 2200;
    body.appendChild(container);

    for (let i = 0; i < count; i++) {
      const kiss = document.createElement("div");
      kiss.className = "kiss";
      kiss.textContent = "💋";
      const startX = Math.random() * 100;
      const startY = 78 + Math.random() * 14;
      kiss.style.left = `${startX}%`;
      kiss.style.top = `${startY}%`;
      const size = 26 + Math.random() * 36;
      kiss.style.fontSize = `${size}px`;
      const rot = -35 + Math.random() * 70;
      kiss.style.setProperty("--r", `${rot}deg`);
      kiss.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      const dur = 900 + Math.random() * 900;
      const delayMs = Math.random() * 220;
      kiss.style.setProperty("--kiss-duration", `${dur}ms`);
      kiss.style.setProperty("--kiss-delay", `${delayMs}ms`);
      kiss.style.setProperty("--kiss-dx", `${-120 + Math.random() * 240}px`);
      kiss.style.setProperty("--kiss-peak-y", `${-160 - Math.random() * 200}px`);
      container.appendChild(kiss);
      const totalLifetime = dur + delayMs + 1200;
      setTimeout(() => {
        kiss.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: "forwards" });
        setTimeout(() => kiss.remove(), 300);
      }, totalLifetime - 240);
    }
    setTimeout(() => {
      container.remove();
    }, 4500);
  }

  return (
    <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 18px", position: "relative", overflow: "hidden" }}>
      <BackgroundDecor />
      <div style={{ maxWidth: 820, width: "100%", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }} style={{ background: "linear-gradient(180deg,#fffaf3, #fff6f0)", borderRadius: 18, padding: 40, boxShadow: "0 30px 70px rgba(30,25,40,0.12)", textAlign: "center", position: "relative" }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{ width: 76, height: 76, borderRadius: 999, background: "linear-gradient(180deg,#ffdff0,#ffdfef)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 30px rgba(255,140,170,0.12)" }}>
              <motion.div animate={{ rotate: [0, 12, -8, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} style={{ fontSize: 28 }}>💝</motion.div>
            </div>
          </div>

          <h1 style={{ margin: 6, color: "#e9448a", fontFamily: "'Poppins',sans-serif", fontSize: 36, fontWeight: 800 }}>Letter Sealed with Love</h1>
          <div style={{ color: "#b57b93", marginTop: 6 }}>I Love You Always</div>

          <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 8 }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div key={i} animate={pulse ? { y: [0, -6, 0], opacity: [0.7, 1, 0.7] } : { y: [0, 0, 0], opacity: 0.9 }} transition={{ duration: 1.1, delay: i * 0.06, repeat: Infinity }} style={{ fontSize: 18, color: "#ff7aa8", opacity: 0.9 }}>
                ♡
              </motion.div>
            ))}
          </div>

          <h3 style={{ marginTop: 18, color: "#c63b71", fontFamily: "'Poppins',sans-serif" }}>Always Yours 💕</h3>
          <div style={{ color: "#b57b93", marginTop: 6 }}>{new Date().toLocaleDateString()}</div>

          <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 18 }}>
            <motion.button whileHover={{ scale: 1.03, boxShadow: "0 18px 40px rgba(255,76,158,0.18)" }} onClick={() => navigate("/")} style={{ background: "#ff4c9e", color: "#fff", padding: "14px 24px", borderRadius: 28, border: "none", fontWeight: 800, cursor: "pointer" }}>
              Experience Again ✨
            </motion.button>

            <motion.button whileHover={{ scale: 1.03, boxShadow: "0 12px 30px rgba(30,150,110,0.12)" }} onClick={sendVirtualKisses} style={{ background: "#bff0d9", color: "#0a4c36", padding: "14px 24px", borderRadius: 28, border: "none", fontWeight: 800, cursor: "pointer", position: "relative" }}>
              Send a Virtual Kiss 💋
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style>{`
        .kiss-container { overflow: visible; pointer-events: none; }
        .kiss {
          position: absolute;
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
          opacity: 0;
          user-select: none;
          -webkit-user-select: none;
          animation-name: kissPop;
          animation-timing-function: cubic-bezier(.22,.9,.18,1);
          animation-fill-mode: forwards;
          animation-duration: var(--kiss-duration, 1400ms);
          animation-delay: var(--kiss-delay, 0ms);
        }
        @keyframes kissPop {
          0% { transform: translate(-50%, -50%) translateY(0) scale(0.6) rotate(var(--r, 0deg)); opacity: 0; }
          12% { transform: translate(-50%, -50%) translateY(-18px) scale(1.02) rotate(calc(var(--r, 0deg) + 6deg)); opacity: 1; }
          48% { transform: translate(-50%, var(--kiss-peak-y,-160px)) translateX(var(--kiss-dx,0px)) scale(1.06) rotate(calc(var(--r, 0deg) - 6deg)); opacity: 1; }
          100% { transform: translate(-50%, calc(var(--kiss-peak-y,-160px))) translateX(calc(var(--kiss-dx,0px) + 10px)) scale(1.02) rotate(calc(var(--r, 0deg) + 8deg)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Inline styles ---------- */
const styles = {
  page: {
    background: "linear-gradient(180deg, #fff6f8 0%, #fff1f6 100%)",
    minHeight: "100vh",
    position: "relative",
  },
  stripeOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(90deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 40px, transparent 40px), linear-gradient(90deg, rgba(255,240,250,0.6), rgba(255,240,245,0.6))",
    backgroundSize: "80px 100%",
    pointerEvents: "none",
  },
  // responsive card width (fluid)
  card: {
    width: "min(92%, 820px)",
    maxWidth: 820,
    borderRadius: 18,
    background: "linear-gradient(180deg,#fffaf3 0%, #fff6f0 100%)",
    boxShadow: "0 18px 40px rgba(20,20,40,0.12)",
    position: "relative",
    paddingBottom: 24,
    overflow: "visible",
  },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px 0 28px" },
  trafficLights: { display: "flex", gap: 8, alignItems: "center" },
  dot: { width: 12, height: 12, borderRadius: 10, display: "inline-block", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.3)" },
  cardBody: { padding: "12px 62px 36px 62px", textAlign: "center" },
  title: { fontSize: 56, margin: 6, fontWeight: 800, color: "#231826" },
  subtitle: { color: "#6b7280", marginTop: 12, fontSize: 16, lineHeight: 1.7 },
  ctaHint: { color: "#ff4c9e", marginTop: 18, fontWeight: 700 },
  cta: { background: "#ff4c9e", color: "#fff", border: "none", padding: "14px 36px", borderRadius: 28, fontSize: 18, cursor: "pointer", boxShadow: "0 8px 20px rgba(255,76,158,0.24)" },
  ctaSmall: { background: "#ff4c9e", color: "#fff", padding: "10px 18px", borderRadius: 18, textDecoration: "none" },
  smallFooter: { marginTop: 24, color: "#b57b93", fontSize: 13 },
  catWrap: { position: "absolute", right: 18, top: -36, width: 200, height: 200 },
  floatItem: { position: "absolute" },
  iconBtn: { background: "#fff", border: "none", padding: 8, borderRadius: 10, cursor: "pointer", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" },
  envelopeButton: { position: "relative", width: 220, height: 140, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 12 },
  pill: { background: "#fff1f6", padding: "10px 18px", borderRadius: 999, color: "#d14a82", fontWeight: 700 },
};
