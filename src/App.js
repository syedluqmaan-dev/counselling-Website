import { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "919242163432";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// ── Placeholder images (Unsplash) ──────────────────────────────────────────
const HERO_IMG = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80";
const CONSULTANT_1 = "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80";
const CONSULTANT_2 = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80";
const CONSULTANT_3 = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80";

// ── Data ───────────────────────────────────────────────────────────────────
const services = [
  { icon: "🧠", title: "Mental Health", desc: "Compassionate support for anxiety, depression, trauma, stress, and emotional burnout. You deserve to feel whole again.", color: "#3b8c8c" },
  { icon: "💑", title: "Relationship Issues", desc: "Navigate marriage challenges, family conflicts, communication breakdowns, and building deeper intimacy.", color: "#7c6f9f" },
  { icon: "🎓", title: "Educational & Career", desc: "Clarity for students and professionals — career transitions, academic pressure, purpose, and goal alignment.", color: "#c07a45" },
  { icon: "🌱", title: "Addiction Recovery", desc: "Structured, judgment-free recovery support for substance dependence and behavioral addictions.", color: "#4a8c5c" },
];

const consultants = [
  { name: "Dr. M H Sharieff", title: "Clinical Psychologist · 12 yrs exp", bio: "Specializes in trauma-informed care and cognitive behavioral therapy. Fluent in Urdu, Hindi & English." },
  { name: "Mr. Farhan Siddiqui", title: "Relationship Therapist · 9 yrs exp", img: CONSULTANT_2, bio: "Expert in couples therapy, family systems, and conflict resolution with a humanistic approach." },
  { name: "Ms. Priya Nair", title: "Career & Wellness Coach · 7 yrs exp", img: CONSULTANT_3, bio: "Empowers individuals through career transitions, life design, and mindfulness-based interventions." },
];

const testimonials = [
  { name: "Anonymous", text: "For the first time in years I felt genuinely heard. The sessions completely shifted how I see myself. Truly transformative.", stars: 5, tag: "Mental Health" },
  { name: "S. Merchant", text: "My marriage was on the brink. After 6 sessions, my wife and I communicate like partners again. Grateful beyond words.", stars: 5, tag: "Relationship" },
  { name: "Anonymous", text: "I was lost in my career for 3 years. Two sessions and I had a clear roadmap. Incredible clarity.", stars: 5, tag: "Career Guidance" },
  { name: "R. Patel", text: "The addiction recovery program saved my family. Judgment-free, structured, and genuinely caring.", stars: 5, tag: "Addiction Recovery" },
];

const sessionTypes = [
  { icon: "☕", label: "Café / Restaurant", desc: "Comfortable, informal setting of your choice" },
  { icon: "🏠", label: "Your Own Space", desc: "In the comfort of your home or private space" },
  { icon: "🏢", label: "Our Office", desc: "Private, professional consulting room" },
  { icon: "💻", label: "Online", desc: "Secure video or voice call, anytime anywhere" },
];

const events = [
  { date: "MAY 20", title: "Free Anxiety Awareness Workshop", desc: "Open group session — learn tools to manage everyday anxiety.", badge: "Free" },
  { date: "JUN 04", title: "Couples Communication Masterclass", desc: "A 2-hour deep-dive into healthy communication patterns.", badge: "Paid" },
  { date: "JUN 15", title: "Career Clarity Webinar", desc: "Online session: Finding your purpose in a distracted world.", badge: "Free" },
];

// ── Utility ────────────────────────────────────────────────────────────────
function useScrollFade(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Stars({ n }) {
  return <span style={{ color: "#e8a838", fontSize: "0.95rem", letterSpacing: 2 }}>{"★".repeat(n)}</span>;
}

// ── Components ─────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Services", "Consultants", "Process", "Testimonials", "Events", "Apply"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: scrolled ? "rgba(255,252,247,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
      transition: "all 0.4s ease",
      padding: "0 5vw",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 70,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#3b8c8c,#7c6f9f)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.1rem", fontWeight: 800 }}>🌿</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.1rem", color: "#1a3a3a", lineHeight: 1.1 }}>Tranquil Minds</div>
          <div style={{ fontSize: "0.6rem", color: "#5a7a7a", letterSpacing: 2, textTransform: "uppercase" }}>Counselling Centre</div>
        </div>
      </div>
      {/* Desktop nav */}
      <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#2a4a4a", textDecoration: "none", letterSpacing: 0.5, fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#3b8c8c"}
            onMouseLeave={e => e.target.style.color = "#2a4a4a"}
          >{l}</a>
        ))}
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{
          background: "#25D366", color: "#fff", borderRadius: 25, padding: "8px 20px",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem",
          textDecoration: "none", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 4px 15px rgba(37,211,102,0.3)"
        }}>
          <span>💬</span> Chat Now
        </a>
      </div>
      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }} className="hamburger">☰</button>
      {open && (
        <div style={{ position: "fixed", top: 70, left: 0, right: 0, background: "#fffcf7", padding: "24px 5vw", display: "flex", flexDirection: "column", gap: 18, boxShadow: "0 8px 30px rgba(0,0,0,0.1)", zIndex: 998 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#2a4a4a", textDecoration: "none", fontWeight: 600 }}>{l}</a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: 25, padding: "10px 20px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textDecoration: "none", textAlign: "center" }}>💬 Chat on WhatsApp</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(135deg, #f0f7f4 0%, #e8f0f7 50%, #f5f0f7 100%)",
      padding: "100px 5vw 60px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,140,140,0.12), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,159,0.1), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }} className="hero-grid">
        {/* Text */}
        <div style={{ animation: "fadeUp 0.9s ease both" }}>
          <div style={{ display: "inline-block", background: "rgba(59,140,140,0.1)", borderRadius: 30, padding: "6px 18px", marginBottom: 20 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#3b8c8c", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Professional Counselling Services</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            color: "#1a3a3a", lineHeight: 1.2, marginBottom: 24, fontWeight: 800,
          }}>
            Your Mind Deserves<br />
            <span style={{ background: "linear-gradient(135deg,#3b8c8c,#7c6f9f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gentle Care</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: "#3a5a5a", lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
            A safe, confidential space for healing and growth. Whether you're navigating anxiety, relationships, career confusion, or recovery — our certified counsellors are here, without judgment.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#apply" style={{
              background: "linear-gradient(135deg,#3b8c8c,#2d7070)", color: "#fff", borderRadius: 30,
              padding: "14px 32px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem",
              textDecoration: "none", boxShadow: "0 8px 25px rgba(59,140,140,0.35)", transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(59,140,140,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(59,140,140,0.35)"; }}
            >Book a Session →</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{
              background: "#fff", color: "#25D366", border: "2px solid #25D366", borderRadius: 30,
              padding: "14px 32px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem",
              textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#25D366"; }}
            >💬 Chat on WhatsApp</a>
          </div>
          {/* Trust badges */}
          <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
            {[["500+", "Lives Touched"], ["100%", "Confidential"], ["3", "Expert Consultants"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#3b8c8c", fontWeight: 800 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#5a7a7a", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Photo */}
        <div style={{ position: "relative", animation: "fadeUp 1.1s ease 0.2s both" }}>
          <div style={{ borderRadius: "40% 60% 60% 40% / 50% 40% 60% 50%", overflow: "hidden", boxShadow: "0 30px 80px rgba(59,140,140,0.25)", border: "4px solid rgba(255,255,255,0.8)" }}>
            <img src={HERO_IMG} alt="Counsellor" style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }} />
          </div>
          {/* Floating tag */}
          <div style={{ position: "absolute", bottom: 30, left: -20, background: "#fff", borderRadius: 16, padding: "12px 20px", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: "1px solid rgba(59,140,140,0.15)" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1a3a3a" }}>✨ Anonymous sessions available</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#5a7a7a" }}>Your privacy is always protected</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, vis] = useScrollFade();
  return (
    <section id="about" ref={ref} style={{
      padding: "90px 5vw", background: "#1a3a3a",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#7fcfcf", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>About Us</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#fff", fontWeight: 800, marginBottom: 28, lineHeight: 1.3 }}>
          A Place Where Healing Begins
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#a8c8c8", lineHeight: 1.85, maxWidth: 720, margin: "0 auto 36px" }}>
          Tranquil Minds is a professional counselling centre committed to providing empathetic, evidence-based mental health support. Our diverse team of certified psychologists and therapists believes in holistic healing — mind, body, and spirit. We offer a safe, non-judgmental space for every individual, couple, and family seeking clarity, healing, and growth.
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {["Certified Professionals", "100% Confidential", "Flexible Scheduling", "Multilingual Support"].map(b => (
            <div key={b} style={{ background: "rgba(59,140,140,0.2)", border: "1px solid rgba(59,140,140,0.4)", borderRadius: 30, padding: "8px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#7fcfcf", fontWeight: 600 }}>✓ {b}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [ref, vis] = useScrollFade();
  return (
    <section id="services" ref={ref} style={{ padding: "90px 5vw", background: "#fffcf7", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#3b8c8c", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>What We Offer</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#1a3a3a", fontWeight: 800 }}>Areas of Counselling</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 28 }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 24, padding: "36px 28px", border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)", transition: "transform 0.3s, box-shadow 0.3s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)"; }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.7rem", marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#1a3a3a", fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#5a7a7a", lineHeight: 1.7 }}>{s.desc}</p>
              <div style={{ marginTop: 20, display: "inline-block", background: `${s.color}18`, borderRadius: 20, padding: "4px 14px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: s.color, fontWeight: 700 }}>Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Consultants() {
  const [ref, vis] = useScrollFade();
  return (
    <section id="consultants" ref={ref} style={{ padding: "90px 5vw", background: "linear-gradient(135deg,#f0f7f4,#f5f0f7)", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#7c6f9f", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Meet the Team</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#1a3a3a", fontWeight: 800 }}>Your Counsellors</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {consultants.map((c, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 28, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.07)", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <div style={{ height: 260, overflow: "hidden" }}>
                <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "none"}
                />
              </div>
              <div style={{ padding: "24px 24px 28px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#1a3a3a", fontWeight: 700, marginBottom: 4 }}>{c.name}</h3>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#7c6f9f", fontWeight: 700, letterSpacing: 0.5, marginBottom: 14 }}>{c.title}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.87rem", color: "#5a7a7a", lineHeight: 1.7 }}>{c.bio}</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 18, background: "linear-gradient(135deg,#3b8c8c,#7c6f9f)", color: "#fff", borderRadius: 20, padding: "8px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>Book with {c.name.split(" ")[1]} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [ref, vis] = useScrollFade();
  const steps = [
    { n: "01", title: "Book a Session", desc: "Fill our simple form or WhatsApp us directly to schedule your first consultation." },
    { n: "02", title: "Choose Your Format", desc: "Pick your session type — café, home, office, or online — and whether anonymous or face-to-face." },
    { n: "03", title: "Attend & Heal", desc: "Meet your counsellor in a safe, confidential environment. Your journey begins here." },
    { n: "04", title: "Follow Up & Grow", desc: "Schedule follow-up sessions and track your progress with personalised care plans." },
  ];
  return (
    <section id="process" ref={ref} style={{ padding: "90px 5vw", background: "#fff", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#3b8c8c", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>How It Works</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#1a3a3a", fontWeight: 800 }}>Your Healing Journey</h2>
        </div>
        {/* Session Type Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 60 }}>
          {sessionTypes.map((s, i) => (
            <div key={i} style={{ background: "linear-gradient(135deg,#f0f7f4,#f5f0f7)", borderRadius: 20, padding: "28px 20px", textAlign: "center", border: "2px solid transparent", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.border = "2px solid #3b8c8c"; e.currentTarget.style.background = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "2px solid transparent"; e.currentTarget.style.background = "linear-gradient(135deg,#f0f7f4,#f5f0f7)"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#1a3a3a", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#5a7a7a" }}>{s.desc}</div>
            </div>
          ))}
        </div>
        {/* Anonymous toggle info */}
        <div style={{ background: "linear-gradient(135deg,#1a3a3a,#2d5a5a)", borderRadius: 24, padding: "32px 40px", marginBottom: 60, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: "3rem" }}>🎭</div>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>Your Identity, Your Choice</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#a8c8c8", fontSize: "0.9rem", lineHeight: 1.7 }}>
              You can attend fully <strong style={{ color: "#7fcfcf" }}>anonymous</strong> — no name, no face required. Or choose to <strong style={{ color: "#7fcfcf" }}>show face</strong> for a more personal connection. Both are equally valid and fully protected under our strict confidentiality policy.
            </p>
          </div>
        </div>
        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 18 }}>
              <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#3b8c8c,#7c6f9f)", color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</div>
              <div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#1a3a3a", marginBottom: 6, fontSize: "1rem" }}>{s.title}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", color: "#5a7a7a", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [ref, vis] = useScrollFade();
  return (
    <section id="testimonials" ref={ref} style={{ padding: "90px 5vw", background: "#fffcf7", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#c07a45", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>What Clients Say</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#1a3a3a", fontWeight: 800 }}>Real Stories, Real Healing</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 24, padding: "32px 28px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "relative" }}>
              <div style={{ fontSize: "3rem", color: "#3b8c8c", opacity: 0.2, position: "absolute", top: 16, right: 20, fontFamily: "Georgia", lineHeight: 1 }}>"</div>
              <Stars n={t.stars} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#3a5a5a", lineHeight: 1.75, margin: "14px 0 18px", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#3b8c8c,#7c6f9f)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.9rem" }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1a3a3a" }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#7c6f9f" }}>{t.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  const [ref, vis] = useScrollFade();
  return (
    <section id="events" ref={ref} style={{ padding: "90px 5vw", background: "#1a3a3a", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#7fcfcf", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Upcoming</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#fff", fontWeight: 800 }}>Events & Updates</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {events.map((e, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: "28px 28px", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s" }}
              onMouseEnter={e2 => { e2.currentTarget.style.background = "rgba(59,140,140,0.15)"; e2.currentTarget.style.borderColor = "rgba(59,140,140,0.4)"; }}
              onMouseLeave={e2 => { e2.currentTarget.style.background = "rgba(255,255,255,0.05)"; e2.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ background: "rgba(59,140,140,0.2)", borderRadius: 12, padding: "8px 14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "0.75rem", color: "#7fcfcf", letterSpacing: 1 }}>{e.date}</div>
                <div style={{ background: e.badge === "Free" ? "rgba(74,140,92,0.3)" : "rgba(192,122,69,0.3)", borderRadius: 20, padding: "4px 12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: e.badge === "Free" ? "#7fcfa0" : "#e8b870" }}>{e.badge}</div>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>{e.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", color: "#8aacac", lineHeight: 1.65 }}>{e.desc}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 18, color: "#7fcfcf", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 700, textDecoration: "none" }}>Register via WhatsApp →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplyForm() {
  const [ref, vis] = useScrollFade();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    session: "",
    clientType: "",
    anonymous: "no",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello! I'd like to book a session.%0AName: ${form.anonymous === "yes" ? "Anonymous" : form.name}%0AService: ${form.service}%0ASession Type: ${form.session}%0AAnonymous: ${form.anonymous}%0ANotes: ${form.notes}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };
  const inputStyle = { width: "100%", padding: "12px 16px", border: "1.5px solid #e0eded", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#1a3a3a", background: "#fafefe", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#5a7a7a", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6, display: "block" };
  return (
    <section id="apply" ref={ref} style={{ padding: "90px 5vw", background: "linear-gradient(135deg,#f0f7f4,#f5f0f7)", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#3b8c8c", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Get Started</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#1a3a3a", fontWeight: 800 }}>Book Your Session</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#5a7a7a", marginTop: 12, fontSize: "0.9rem" }}>Fill this form and you'll be redirected to WhatsApp for instant confirmation & payment.</p>
        </div>
        {submitted ? (
          <div style={{ background: "#fff", borderRadius: 24, padding: "48px", textAlign: "center", boxShadow: "0 8px 32px rgba(59,140,140,0.12)" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🌿</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#1a3a3a", fontSize: "1.6rem", marginBottom: 12 }}>You're on your way!</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#5a7a7a", lineHeight: 1.7 }}>Your request has been sent to WhatsApp. Our team will confirm your session and share payment details shortly.</p>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 28, padding: "44px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle} onFocus={e => e.target.style.borderColor = "#3b8c8c"} onBlur={e => e.target.style.borderColor = "#e0eded"} />
              </div>
              <div>
                <label style={labelStyle}>Phone / WhatsApp</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" style={inputStyle} onFocus={e => e.target.style.borderColor = "#3b8c8c"} onBlur={e => e.target.style.borderColor = "#e0eded"} />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>Email Address</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle} onFocus={e => e.target.style.borderColor = "#3b8c8c"} onBlur={e => e.target.style.borderColor = "#e0eded"} />
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>Area of Concern</label>
              <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, appearance: "none" }}>
                <option value="">Select a service...</option>
                <option>Mental Health (Anxiety/Depression/Trauma)</option>
                <option>Relationship Issues (Marriage/Family)</option>
                <option>Educational & Career Guidance</option>
                <option>Addiction Recovery</option>
              </select>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>Preferred Session Type</label>
              <select name="session" value={form.session} onChange={handleChange} style={{ ...inputStyle, appearance: "none" }}>
                <option value="">Select session type...</option>
                <option>☕ Café / Restaurant (your choice)</option>
                <option>🏠 Your Own Space</option>
                <option>🏢 Our Office</option>
                <option>💻 Online (Video/Voice)</option>
              </select>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>Client Type</label>
              <select
                name="clientType"
                value={form.clientType}
                onChange={handleChange}
                style={{ ...inputStyle, appearance: "none" }}
              >
                <option value="">Select client type...</option>
                <option>Children</option>
                <option>Adolescent</option>
                <option>Adults</option>
                <option>Couples</option>
                <option>Family</option>
                <option>Professional</option>
                <option>Personal</option>
              </select>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>Session Identity Preference</label>
              <div style={{ display: "flex", gap: 16 }}>
                {[["no", "👤 Show Face", "#3b8c8c"], ["yes", "🎭 Stay Anonymous", "#7c6f9f"]].map(([val, lbl, col]) => (
                  <label key={val} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: form.anonymous === val ? `${col}14` : "#fafafa", border: `2px solid ${form.anonymous === val ? col : "#e0eded"}`, borderRadius: 12, padding: "12px 16px", cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#1a3a3a", fontWeight: form.anonymous === val ? 700 : 400 }}>
                    <input type="radio" name="anonymous" value={val} checked={form.anonymous === val} onChange={handleChange} style={{ accentColor: col }} />
                    {lbl}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={labelStyle}>Brief Note (Optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Anything you'd like us to know before the session..." rows={3} style={{ ...inputStyle, resize: "vertical" }} onFocus={e => e.target.style.borderColor = "#3b8c8c"} onBlur={e => e.target.style.borderColor = "#e0eded"} />
            </div>
            <button onClick={handleSubmit} style={{
              marginTop: 28, width: "100%", background: "linear-gradient(135deg,#3b8c8c,#7c6f9f)", color: "#fff",
              border: "none", borderRadius: 16, padding: "16px", fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
              fontSize: "1rem", cursor: "pointer", letterSpacing: 0.5, boxShadow: "0 8px 25px rgba(59,140,140,0.3)",
              transition: "all 0.3s",
            }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "none"}
            >
              💬 Submit & Continue on WhatsApp →
            </button>
            <p style={{ marginTop: 14, textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#8aacac" }}>🔒 Your information is 100% confidential and secure.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0f2525", padding: "60px 5vw 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#3b8c8c,#7c6f9f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🌿</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>Tranquil Minds</div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6a9a9a", lineHeight: 1.75, maxWidth: 320 }}>A compassionate counselling centre dedicated to your mental, emotional, and relational wellbeing.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, background: "#25D366", color: "#fff", borderRadius: 25, padding: "10px 20px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}>💬 +92 421 634 32</a>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", fontSize: "0.82rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Navigate</h4>
            {["About", "Services", "Consultants", "Process", "Testimonials", "Events", "Apply"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6a9a9a", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#7fcfcf"}
                onMouseLeave={e => e.target.style.color = "#6a9a9a"}
              >{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", fontSize: "0.82rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Services</h4>
            {["Mental Health", "Relationships", "Career Guidance", "Addiction Recovery"].map(s => (
              <div key={s} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6a9a9a", marginBottom: 10 }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#4a7a7a" }}>© 2025 Tranquil Minds Counselling Centre. All rights reserved.</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#4a7a7a" }}>Built with care by <span style={{ color: "#7fcfcf" }}>Ariar Technology</span></div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fffcf7; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Consultants />
      <Process />
      <Testimonials />
      <Events />
      <ApplyForm />
      <Footer />
      {/* Floating WhatsApp */}
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 998,
        background: "#25D366", color: "#fff", width: 58, height: 58, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem",
        boxShadow: "0 6px 24px rgba(37,211,102,0.5)", textDecoration: "none",
        animation: "fadeUp 1s ease 1s both",
      }} title="Chat on WhatsApp">💬</a>
    </>
  );
}