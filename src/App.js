/**
 * MindSphere — App.jsx  (Rebuilt & Fixed)
 * ─────────────────────────────────────────
 * Changes from original:
 *  1. Fully responsive at 100% width — no overflow on any screen
 *  2. "Contact Us" in nav → opens WhatsApp to 9242163432
 *  3. "Book Now" → navigates to a clean multi-step booking page (separate view)
 *  4. Edit button relocated to top-right corner (always visible, non-intrusive)
 *  5. All layout bugs fixed (hero grid, stats overflow, footer, form rows)
 *  6. Payment gateway placeholder ready (step 4 shows "Payment coming soon" note)
 */

import { useState, useEffect, useRef, createContext, useContext } from "react";

/* ─────────────────────────────────────────────────────────────
   DEFAULT CONTENT (inline — no external JSON needed)
───────────────────────────────────────────────────────────── */
const defaultContent = {
  site: {
    name: "MindSphere",
    tagline: "Private Psychology",
    phone: "+91 92421 63432",
    email: "hello@mindsphere.com",
    address1: "Bengaluru, Karnataka",
    address2: "Online across India",
    whatsapp: "https://wa.me/919242163432",
    copyright: "© 2025 MindSphere Psychology. All rights reserved.",
  },
  hero: {
    badge: "Trusted by 500+ clients across India",
    heading1: "Private, Compassionate",
    heading2: "Psychology for",
    heading3: "Every Chapter of Life",
    subtext: "Expert psychological support delivered with absolute discretion — in person, online, or anonymously. Your wellbeing, your terms.",
    cta1: "Book a Session",
    cta2: "Learn More",
    stats: [
      { num: "500+", label: "Clients Supported" },
      { num: "12+", label: "Years Experience" },
      { num: "98%", label: "Satisfaction Rate" },
      { num: "100%", label: "Confidential" },
    ],
    floatBadgeTitle: "Fully Confidential",
    floatBadgeSub: "HIPAA & GDPR Compliant",
    floatLabel: "Next Available",
    floatAvailability: "This Week",
    floatCta: "Reserve your slot →",
  },
  trustBar: [
    "✦ Registered Clinical Psychologists",
    "✦ 100% Confidential",
    "✦ Online & In-Person",
    "✦ Anonymous Sessions Available",
    "✦ Evening & Weekend Slots",
    "✦ Insurance Accepted",
  ],
  about: {
    label: "Who We Are",
    heading: "A Practice Built on Dignity, Trust & Expertise",
    body: "MindSphere was founded on a simple belief: that world-class psychological care should be accessible, private, and deeply human. We bring together India's leading specialists under one roof.",
    statNum: "12+",
    statLabel: "Years of trusted practice across India",
    pillars: [
      { icon: "🔐", title: "Absolute Confidentiality", desc: "Your identity and sessions are protected by strict clinical and legal confidentiality standards." },
      { icon: "🏅", title: "Accredited Specialists", desc: "Every practitioner holds post-graduate clinical qualifications and active registration." },
      { icon: "🌍", title: "Flexible Access", desc: "Meet in person, online, at your home, or completely anonymously — your comfort defines the format." },
    ],
  },
  services: {
    label: "Our Services",
    heading: "Specialist Care for Every Stage of Life",
    subtext: "From children's developmental support to executive performance coaching — comprehensive psychological care under one trusted practice.",
    items: [
      { icon: "🧒", age: "Ages 4–17", title: "Children & Young People", desc: "Developmental support, school anxiety, behavioural challenges, and adolescent mental health — delivered with warmth and expertise.", tags: ["Anxiety", "ADHD", "Trauma", "School Refusal"] },
      { icon: "🧑", age: "Adults 18+", title: "Individual Adult Therapy", desc: "One-to-one sessions for depression, anxiety, life transitions, grief, trauma, and personal growth.", tags: ["Depression", "Anxiety", "Grief", "CBT"] },
      { icon: "💑", age: "Couples", title: "Couples & Relationships", desc: "Evidence-based couples therapy to rebuild communication, navigate conflict, and strengthen emotional connection.", tags: ["Communication", "Infidelity", "Pre-marital"] },
      { icon: "💼", age: "Professionals", title: "Executive & Workplace", desc: "Performance psychology, leadership coaching, burnout recovery, and workplace stress management.", tags: ["Burnout", "Leadership", "Stress"] },
      { icon: "🔐", age: "All Ages", title: "Private & Confidential", desc: "Completely discreet sessions for high-profile individuals, sensitive matters, or those requiring extra privacy.", tags: ["Anonymous", "Discreet", "VIP"] },
      { icon: "👴", age: "55+ Adults", title: "Older Adult Psychology", desc: "Specialist support for life transitions, cognitive health, loneliness, loss, and late-life wellbeing.", tags: ["Dementia", "Retirement", "Loss"] },
    ],
  },
  sessionFormats: {
    label: "How We Meet",
    heading: "Sessions That Come to You",
    subtext: "We believe the right environment unlocks the best therapy. Choose the format that suits you.",
    items: [
      { icon: "☕", sub: "Out & About", title: "Café or Quiet Restaurant", desc: "Relaxed, neutral territory. Perfect for first sessions or those who prefer informal settings.", detail: "We come to your preferred location" },
      { icon: "🏠", sub: "Your Space", title: "Home or Private Space", desc: "Maximum comfort and privacy. Available across Bengaluru and select cities.", detail: null },
      { icon: "🏢", sub: "Our Rooms", title: "Consulting Rooms", desc: "Professionally appointed, discreet rooms in prime Bengaluru locations.", detail: "Indiranagar & Koramangala" },
      { icon: "🖥️", sub: "Anywhere", title: "Secure Video Session", desc: "End-to-end encrypted video. Attend from anywhere in India.", detail: null },
    ],
    anonSub: "Maximum Privacy",
    anonTitle: "Fully Anonymous Sessions — No Identity Required",
    anonDesc: "Attend via voice only. No name, no face, no records linked to your identity. A unique reference code protects your privacy completely.",
    anonCta: "Book Anonymously",
  },
  howItWorks: {
    label: "The Process",
    heading: "From First Click to First Session",
    subtext: "Getting started is straightforward, confidential, and entirely on your terms.",
    steps: [
      { n: "01", icon: "📋", title: "Tell Us What You Need", desc: "Complete our brief, secure intake form. No sensitive details required upfront — just enough to match you with the right specialist." },
      { n: "02", icon: "🤝", title: "We Match You", desc: "Within 24 hours, a senior clinician reviews your needs and recommends the best-fit specialist and format." },
      { n: "03", icon: "📅", title: "Book Your Session", desc: "Choose your slot, confirm your format preference, and complete a secure deposit to lock your appointment." },
      { n: "04", icon: "💬", title: "Your First Session", desc: "Meet your specialist, establish goals, and experience the difference of truly bespoke psychological care." },
      { n: "05", icon: "🌱", title: "Ongoing Support", desc: "Regular check-ins, session notes on request, and a care plan tailored to your pace and goals." },
      { n: "06", icon: "📈", title: "Track Your Progress", desc: "Optional wellbeing check-ins help you see how far you've come and celebrate your growth." },
    ],
    feeLabel: "Session Investment",
    feeRange: "₹2,500 – ₹8,000",
    feePer: "per session",
    feeNote: "Sliding scale available · Insurance accepted · First consultation free",
    feeCta1: "Book a Free Consult",
    feeCta2: "Ask a Question",
  },
  specialists: {
    label: "Our Team",
    heading: "Psychologists You Can Trust",
    subtext: "Highly qualified, warmly human. Every specialist is accredited, experienced, and chosen for their exceptional care.",
    team: [
      { img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80", name: "Dr. Priya Sharma", role: "Clinical Psychologist · Adults & Trauma", creds: "PhD Clinical Psychology, NIMHANS", bio: "12 years specialising in trauma, PTSD, and adult mental health. Known for her grounded, compassionate approach.", spec: ["Trauma", "PTSD", "Anxiety", "CBT"], langs: "English, Hindi, Kannada" },
      { img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80", name: "Dr. Arun Menon", role: "Couples & Family Therapist", creds: "MSc Psychology, IIT Bombay", bio: "Specialist in relationship dynamics, communication, and pre-marital counselling. Over 800 couples supported.", spec: ["Couples", "Family", "Communication"], langs: "English, Malayalam, Tamil" },
      { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80", name: "Dr. Kavita Nair", role: "Child & Adolescent Psychologist", creds: "MPhil Clinical Psychology, Manipal", bio: "Dedicated to children's emotional development, school anxiety, and neurodivergent support. Warm, playful, effective.", spec: ["Children", "ADHD", "Adolescents", "OCD"], langs: "English, Hindi, Malayalam" },
    ],
  },
  testimonials: {
    label: "Client Stories",
    heading: "Real Experiences, Real Change",
    subtext: "Our clients' words, shared with their permission. Names changed for privacy.",
    items: [
      { quote: "I was terrified to see a psychologist. MindSphere made it feel as natural as meeting a friend for coffee. Three months on, my anxiety is manageable for the first time in years.", who: "Sneha R., 34 · Bengaluru", tag: "Anxiety & CBT" },
      { quote: "The anonymous session option meant I could get support without anyone knowing. As a senior executive, privacy isn't optional for me — it's essential.", who: "Anonymous · Corporate Client", tag: "Executive Wellbeing" },
      { quote: "Dr. Arun helped my husband and I find each other again after two very hard years. We're genuinely grateful.", who: "Preethi & Rahul M. · Couples Therapy", tag: "Couples Therapy" },
      { quote: "My daughter went from refusing school to thriving. The difference in just 8 sessions was remarkable.", who: "Parent of Arya, 11 · Mysuru", tag: "Child Psychology" },
      { quote: "I've tried three other therapists before MindSphere. The matching process meant I found exactly the right fit immediately.", who: "Vikram S., 42 · Online Client", tag: "Depression & Life Transitions" },
      { quote: "The video sessions fit my schedule perfectly, and the security gave me peace of mind to open up honestly.", who: "Ananya P., 28 · Remote Session", tag: "Stress & Burnout" },
    ],
  },
  booking: {
    label: "Get Started",
    heading: "Book Your First Session",
    subtext: "Confidential, simple, and entirely on your terms. Our care coordinator will confirm within 2 hours.",
    doneHeading: "Request Received — Thank You",
    doneBody: "Our care coordinator will reach out within 2 hours to confirm your appointment details and answer any questions.",
    paymentNote: "Secure payment via Razorpay will be introduced shortly. For now, payment details will be shared via WhatsApp after booking confirmation.",
    submitLabel: "Send Booking Request via WhatsApp",
    confirmNote: "No payment taken now. A care coordinator will confirm your slot within 2 hours.",
  },
  footer: {
    about: "Private, expert psychological care across Bengaluru and online across India. Absolute confidentiality guaranteed.",
  },
};

/* ─────────────────────────────────────────────────────────────
   EDIT CONTEXT
───────────────────────────────────────────────────────────── */
const EditCtx = createContext(null);
function useEdit() { return useContext(EditCtx); }

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────── */
const T = {
  sage:    "#3D7A6A",
  sageDk:  "#2B5C4F",
  sageLt:  "#EAF2F0",
  sagePale:"#F4FAF8",
  gold:    "#B5873C",
  goldLt:  "#FDF3E3",
  white:   "#FFFFFF",
  bg:      "#F8FAFA",
  bgAlt:   "#F1F5F3",
  text:    "#111B18",
  textMd:  "#3A4F48",
  textLt:  "#738C84",
  border:  "#DDE7E3",
  shSm:   "0 1px 4px rgba(17,27,24,.06), 0 2px 10px rgba(17,27,24,.04)",
  shMd:   "0 4px 24px rgba(17,27,24,.08), 0 1px 4px rgba(17,27,24,.04)",
  shLg:   "0 12px 48px rgba(17,27,24,.10), 0 4px 16px rgba(17,27,24,.06)",
  r:      "8px",
  rLg:    "14px",
  rXl:    "20px",
};

/* ─────────────────────────────────────────────────────────────
   PATH UTILITIES
───────────────────────────────────────────────────────────── */
function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return "";
    return acc[isNaN(key) ? key : Number(key)];
  }, obj) ?? "";
}
function setByPath(obj, path, value) {
  const keys = path.split(".");
  const clone = JSON.parse(JSON.stringify(obj));
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = isNaN(keys[i]) ? keys[i] : Number(keys[i]);
    cur = cur[k];
  }
  const lastKey = isNaN(keys[keys.length - 1]) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
  cur[lastKey] = value;
  return clone;
}

/* ─────────────────────────────────────────────────────────────
   EDITABLE
───────────────────────────────────────────────────────────── */
function Editable({ path, style = {}, multi = false, as: Tag = "span" }) {
  const { editMode, getValue, setValue } = useEdit();
  const value = getValue(path);
  const [active, setActive] = useState(false);
  const [hover, setHover]   = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (active && inputRef.current) inputRef.current.focus();
  }, [active]);

  if (!editMode) return <Tag style={style}>{value}</Tag>;

  const ringStyle = hover || active ? {
    outline: "2px dashed #2563EB", outlineOffset: 2, borderRadius: 3, cursor: "text",
  } : { cursor: "text" };

  if (active) {
    const shared = {
      ref: inputRef, value,
      onChange: e => setValue(path, e.target.value),
      onBlur: () => setActive(false),
      onKeyDown: e => {
        if (!multi && e.key === "Enter") { e.preventDefault(); setActive(false); }
        if (e.key === "Escape") setActive(false);
      },
      style: {
        ...style, font: "inherit", border: "2px solid #2563EB",
        borderRadius: 4, padding: "2px 6px", background: "#EFF6FF",
        color: T.text, outline: "none", display: "block",
        width: multi ? "100%" : undefined,
        minWidth: multi ? undefined : Math.max(120, (value?.length || 10) * 9),
        resize: multi ? "vertical" : undefined,
        minHeight: multi ? 72 : undefined,
      },
    };
    return multi ? <textarea {...shared} rows={3} /> : <input {...shared} />;
  }

  return (
    <Tag style={{ ...style, ...ringStyle }}
      onClick={() => setActive(true)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title="Click to edit">
      {value || <span style={{ color: "#9CA3AF", fontStyle: "italic" }}>empty</span>}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────── */
function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,300;0,600;1,300&display=swap');
      :root {
        --sage:#3D7A6A; --sage-dk:#2B5C4F; --sage-lt:#EAF2F0; --sage-pale:#F4FAF8;
        --gold:#B5873C; --gold-lt:#FDF3E3; --bg:#F8FAFA; --bg-alt:#F1F5F3;
        --text:#111B18; --text-md:#3A4F48; --text-lt:#738C84; --border:#DDE7E3;
        --px:clamp(16px,5vw,80px); --r:8px; --rLg:14px; --rXl:20px;
      }
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
      html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;overflow-x:hidden;}
      body{font-family:'DM Sans',-apple-system,sans-serif;background:#fff;
        color:var(--text);-webkit-font-smoothing:antialiased;line-height:1.6;
        overflow-x:hidden;width:100%;}
      a{text-decoration:none;color:inherit;}
      button{cursor:pointer;border:none;font-family:inherit;}
      input,select,textarea{font-family:inherit;}
      img{display:block;max-width:100%;}

      @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:none;}}
      @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
      @keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:none;}}

      .reveal{opacity:0;transform:translateY(18px);
        transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);}
      .reveal.in{opacity:1;transform:none;}
      .d1{transition-delay:.06s!important;}.d2{transition-delay:.12s!important;}
      .d3{transition-delay:.18s!important;}.d4{transition-delay:.24s!important;}
      .d5{transition-delay:.30s!important;}.d6{transition-delay:.36s!important;}

      .container{max-width:1200px;margin:0 auto;padding:0 var(--px);width:100%;}
      .section{padding:clamp(52px,8vw,88px) var(--px);}

      .btn{display:inline-flex;align-items:center;justify-content:center;
        font-family:inherit;font-size:.875rem;font-weight:600;letter-spacing:.01em;
        border-radius:var(--r);padding:12px 24px;border:2px solid transparent;
        transition:background .2s,color .2s,border-color .2s,transform .15s,box-shadow .2s;
        cursor:pointer;white-space:nowrap;}
      .btn-primary{background:var(--sage);color:#fff;border-color:var(--sage);}
      .btn-primary:hover{background:var(--sage-dk);border-color:var(--sage-dk);
        transform:translateY(-1px);box-shadow:0 6px 20px rgba(61,122,106,.28);}
      .btn-secondary{background:transparent;color:var(--sage);border-color:var(--sage);}
      .btn-secondary:hover{background:var(--sage);color:#fff;transform:translateY(-1px);}
      .btn-gold{background:var(--gold);color:#fff;border-color:var(--gold);}
      .btn-gold:hover{background:#9B7130;border-color:#9B7130;transform:translateY(-1px);}
      .btn-ghost{background:transparent;color:var(--text-md);border-color:var(--border);}
      .btn-ghost:hover{background:var(--bg);}
      .btn-lg{padding:14px 32px;font-size:.9375rem;}
      .btn-sm{padding:9px 18px;font-size:.8125rem;}
      .btn-block{width:100%;text-align:center;}

      .card{background:#fff;border:1px solid var(--border);border-radius:var(--rLg);padding:26px;
        transition:transform .22s ease,box-shadow .22s ease;}
      .card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(17,27,24,.09);}

      .field{width:100%;padding:11px 14px;border:1.5px solid var(--border);
        border-radius:var(--r);font-size:.9rem;color:var(--text);background:#fff;
        transition:border-color .18s;outline:none;}
      .field:focus{border-color:var(--sage);}
      .field::placeholder{color:var(--text-lt);}
      label.lbl{display:block;font-size:.72rem;font-weight:700;letter-spacing:.07em;
        text-transform:uppercase;color:var(--text-md);margin-bottom:6px;}

      .opt-card{border:1.5px solid var(--border);border-radius:var(--r);
        padding:14px 16px;cursor:pointer;transition:all .18s;background:var(--bg);}
      .opt-card:hover,.opt-card.active{border-color:var(--sage);background:var(--sage-pale);}

      .badge{display:inline-flex;align-items:center;gap:6px;
        background:var(--sage-pale);border:1px solid var(--sage-lt);
        border-radius:100px;padding:5px 12px;
        font-size:.72rem;font-weight:600;color:var(--sage);letter-spacing:.04em;}

      /* Responsive grid helpers */
      .grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(16px,3vw,44px);}
      .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2.5vw,36px);}
      .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(14px,2.5vw,32px);}

      @media(max-width:1024px){
        .grid-4{grid-template-columns:repeat(2,1fr)!important;}
        .grid-3{grid-template-columns:repeat(2,1fr)!important;}
      }
      @media(max-width:768px){
        .grid-2{grid-template-columns:1fr!important;}
        .grid-3{grid-template-columns:1fr!important;}
        .grid-4{grid-template-columns:repeat(2,1fr)!important;}
        .nav-desktop{display:none!important;}
        .nav-ham{display:flex!important;}
        .hero-img{display:none!important;}
        .hero-stats{grid-template-columns:repeat(2,1fr)!important;}
        .footer-grid{grid-template-columns:1fr 1fr!important;}
        .process-grid{grid-template-columns:1fr!important;}
      }
      @media(max-width:480px){
        .grid-4{grid-template-columns:1fr!important;}
        .cta-row{flex-direction:column!important;}
        .cta-row .btn{width:100%;}
        .slots-grid{grid-template-columns:repeat(3,1fr)!important;}
        .footer-grid{grid-template-columns:1fr!important;}
        .form-row-2{grid-template-columns:1fr!important;}
      }

      /* Edit mode */
      .edit-active [title="Click to edit"]:hover{background:rgba(37,99,235,.04);border-radius:3px;}
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.07) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); }, { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

/* ─────────────────────────────────────────────────────────────
   SHARED UI
───────────────────────────────────────────────────────────── */
function SectionHead({ labelPath, h2Path, subPath, center = false }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? 600 : "none", margin: center ? "0 auto" : undefined }}>
      {labelPath && (
        <div style={{ marginBottom: 14 }}>
          <span className="badge">
            <Editable path={labelPath} />
          </span>
        </div>
      )}
      <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.02em", color: T.text, marginBottom: subPath ? 14 : 0, fontFamily: "'Fraunces', serif" }}>
        <Editable path={h2Path} />
      </h2>
      {subPath && (
        <p style={{ fontSize: "clamp(.88rem,1.5vw,1rem)", fontWeight: 400, color: T.textLt, lineHeight: 1.8, maxWidth: center ? 520 : 600, margin: center ? "0 auto" : undefined }}>
          <Editable path={subPath} multi />
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EDIT TOOLBAR — top right corner, always accessible
───────────────────────────────────────────────────────────── */
function EditToolbar({ editMode, setEditMode, onSave, hasChanges }) {
  if (!editMode) {
    return (
      <button
        onClick={() => setEditMode(true)}
        style={{
          position: "fixed", top: 78, right: 16, zIndex: 2000,
          background: T.white, border: `1.5px solid ${T.border}`,
          borderRadius: 100, padding: "7px 14px",
          fontSize: ".75rem", fontWeight: 700, color: T.sage,
          display: "flex", alignItems: "center", gap: 6,
          boxShadow: T.shSm, cursor: "pointer",
          transition: "box-shadow .2s",
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = T.shMd}
        onMouseLeave={e => e.currentTarget.style.boxShadow = T.shSm}
      >
        ✏️ Edit
      </button>
    );
  }
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 3000,
      background: "#1E3A5F",
      padding: "10px clamp(12px,3vw,24px)",
      display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
    }}>
      <span style={{ fontSize: ".8rem", fontWeight: 600, color: "rgba(255,255,255,.85)", flex: 1, minWidth: 0 }}>
        ✏️ Edit Mode — click any text to edit
      </span>
      <button
        onClick={onSave}
        style={{
          background: hasChanges ? "#16A34A" : "#374151", color: "#fff",
          border: "none", borderRadius: 100, padding: "8px 18px",
          fontSize: ".78rem", fontWeight: 700, cursor: "pointer",
        }}
      >
        💾 Save JSON
      </button>
      <button
        onClick={() => setEditMode(false)}
        style={{
          background: "rgba(255,255,255,.15)", color: "#fff", border: "none",
          borderRadius: 100, padding: "8px 14px", fontSize: ".78rem", fontWeight: 600, cursor: "pointer",
        }}
      >
        ✕ Exit
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar({ onBookNow, editMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { getValue } = useEdit();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const waLink = `https://wa.me/919242163432?text=${encodeURIComponent("Hi MindSphere, I'd like to learn more about your services.")}`;

  const links = [
    { label: "About",        href: "#about" },
    { label: "Services",     href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Specialists",  href: "#specialists" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: editMode ? 48 : 0, left: 0, right: 0, zIndex: 999, height: 68,
        background: scrolled ? "rgba(255,255,255,.98)" : "rgba(255,255,255,.94)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        boxShadow: scrolled ? T.shSm : "none",
        transition: "all .3s ease",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", height: "100%",
          padding: "0 var(--px)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          overflow: "hidden",
        }}>
          {/* Logo */}
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 14s1.5-3 3-3 3 3 3 3" />
                <line x1="12" y1="5" x2="12" y2="7" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: T.text, lineHeight: 1.1, fontFamily: "'Fraunces', serif" }}>
                <Editable path="site.name" />
              </div>
              <div style={{ fontSize: ".58rem", color: T.sage, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>
                <Editable path="site.tagline" />
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
            {links.map(l => (
              <a key={l.href} href={l.href}
                style={{ padding: "8px 12px", borderRadius: 6, fontSize: ".84rem", fontWeight: 500, color: T.textMd, transition: "color .18s, background .18s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.color = T.sage; e.currentTarget.style.background = T.sagePale; }}
                onMouseLeave={e => { e.currentTarget.style.color = T.textMd; e.currentTarget.style.background = "transparent"; }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <a href={waLink} target="_blank" rel="noreferrer"
              style={{ fontSize: ".82rem", fontWeight: 600, color: T.sage, display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${T.sageLt}`, background: T.sagePale, transition: "all .18s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.sageLt}
              onMouseLeave={e => e.currentTarget.style.background = T.sagePale}>
              💬 Contact Us
            </a>
            <button className="btn btn-primary btn-sm" onClick={onBookNow}>Book Now</button>
          </div>

          {/* Hamburger */}
          <button className="nav-ham" onClick={() => setOpen(v => !v)}
            style={{ display: "none", flexDirection: "column", gap: 5, padding: 6, background: "none", border: "none" }}
            aria-label="Menu">
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2, background: T.text, borderRadius: 2, transition: ".2s",
                transform: open && i === 0 ? "rotate(45deg) translate(5px,5px)" : open && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", top: (editMode ? 48 : 0) + 68, left: 0, right: 0, zIndex: 998,
          background: T.white, borderBottom: `1px solid ${T.border}`,
          boxShadow: T.shMd, padding: "20px var(--px) 24px",
          animation: "slideDown .22s ease both",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 16 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ padding: "13px 8px", fontSize: ".95rem", fontWeight: 500, color: T.textMd, borderBottom: `1px solid ${T.border}` }}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href={waLink} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 8, border: `1.5px solid ${T.sage}`, color: T.sage, fontWeight: 600, fontSize: ".9rem", background: T.sagePale }}
              onClick={() => setOpen(false)}>
              💬 Contact Us on WhatsApp
            </a>
            <button className="btn btn-primary btn-block" onClick={() => { setOpen(false); onBookNow(); }}>
              Book Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function Hero({ onBookNow }) {
  const { content } = useEdit();
  const stats = content.hero.stats;

  return (
    <section id="top" style={{ minHeight: "100vh", background: T.white, display: "flex", alignItems: "center", paddingTop: 68 }}>
      <div style={{ width: "100%", padding: "clamp(40px,6vw,72px) var(--px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}
            className="hero-layout">

            {/* Left text */}
            <div style={{ maxWidth: 680, animation: "fadeUp .8s ease both" }}>
              <div style={{ marginBottom: 24 }}>
                <span className="badge">🏅 <Editable path="hero.badge" /></span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", fontWeight: 300, lineHeight: 1.14, letterSpacing: "-.02em", color: T.text, marginBottom: 20, fontFamily: "'Fraunces', serif" }}>
                <Editable path="hero.heading1" /><br />
                <span style={{ color: T.sage, fontWeight: 600 }}><Editable path="hero.heading2" /></span>{" "}
                <span style={{ color: T.sage, fontStyle: "italic" }}><Editable path="hero.heading3" /></span>
              </h1>

              <p style={{ fontSize: "clamp(.9rem,1.6vw,1.05rem)", color: T.textLt, lineHeight: 1.8, maxWidth: 520, marginBottom: 36 }}>
                <Editable path="hero.subtext" multi />
              </p>

              <div className="cta-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <button className="btn btn-primary btn-lg" onClick={onBookNow}><Editable path="hero.cta1" /></button>
                <a href="#about" className="btn btn-secondary btn-lg"><Editable path="hero.cta2" /></a>
              </div>

              {/* Stats — responsive grid */}
              <div className="hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", paddingTop: 28, borderTop: `1px solid ${T.border}`, gap: "clamp(8px,2vw,16px)" }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ padding: "clamp(10px,2vw,18px) 0" }}>
                    <div style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 700, color: T.sage, lineHeight: 1, fontFamily: "'Fraunces', serif" }}>
                      <Editable path={`hero.stats.${i}.num`} />
                    </div>
                    <div style={{ fontSize: "clamp(.6rem,.9vw,.7rem)", fontWeight: 500, color: T.textLt, marginTop: 5, textTransform: "uppercase", letterSpacing: ".06em" }}>
                      <Editable path={`hero.stats.${i}.label`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRUST BAR
───────────────────────────────────────────────────────────── */
function TrustBar() {
  const { content } = useEdit();
  return (
    <div style={{ background: T.sage, overflow: "hidden", width: "100%" }}>
      <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[...content.trustBar, ...content.trustBar].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 22px", flexShrink: 0 }}>
            <span style={{ fontSize: ".74rem", fontWeight: 500, color: "rgba(255,255,255,.9)", whiteSpace: "nowrap" }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────── */
function About() {
  const [ref, on] = useReveal();
  const { content } = useEdit();
  const pillars = content.about.pillars;

  return (
    <section id="about" ref={ref} className="section" style={{ background: T.white }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: "center" }}>
          <div className={`reveal ${on ? "in" : ""}`} style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80"
              alt="Office" style={{ width: "100%", height: "clamp(280px,35vw,400px)", objectFit: "cover", borderRadius: T.rXl }} />
            <div style={{
              position: "absolute", bottom: 24, right: -10, background: T.white, borderRadius: T.rLg,
              padding: "18px 22px", boxShadow: T.shMd, border: `1px solid ${T.border}`, maxWidth: 190,
            }}>
              <div style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: T.sage, lineHeight: 1, fontFamily: "'Fraunces', serif" }}>
                <Editable path="about.statNum" />
              </div>
              <div style={{ fontSize: ".76rem", color: T.textLt, marginTop: 4, lineHeight: 1.5 }}>
                <Editable path="about.statLabel" multi />
              </div>
            </div>
          </div>

          <div className={`reveal d2 ${on ? "in" : ""}`}>
            <SectionHead labelPath="about.label" h2Path="about.heading" subPath="about.body" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
              {pillars.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: T.r, background: T.bg, border: `1px solid ${T.border}` }}>
                  <div style={{ width: 38, height: 38, borderRadius: 8, background: T.sageLt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".875rem", color: T.text, marginBottom: 2 }}>
                      <Editable path={`about.pillars.${i}.title`} />
                    </div>
                    <div style={{ fontSize: ".8rem", color: T.textLt, lineHeight: 1.6 }}>
                      <Editable path={`about.pillars.${i}.desc`} multi />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────────────────────── */
const SVC_COLORS = [T.sage, "#2B7A5A", T.gold, "#5A6F8A", "#6B4E8A", "#8A6040"];

function Services() {
  const [ref, on] = useReveal();
  const { content } = useEdit();
  const items = content.services.items;

  return (
    <section id="services" ref={ref} className="section" style={{ background: T.bgAlt }}>
      <div className="container">
        <div className={`reveal ${on ? "in" : ""}`} style={{ marginBottom: 44 }}>
          <SectionHead labelPath="services.label" h2Path="services.heading" subPath="services.subtext" center />
        </div>
        <div className="grid-3">
          {items.map((s, i) => {
            const c = SVC_COLORS[i] || T.sage;
            return (
              <div key={i} className={`card reveal d${Math.min(i + 1, 6)} ${on ? "in" : ""}`} style={{ padding: "26px 22px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: c + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontSize: ".64rem", fontWeight: 700, color: c, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 5 }}>
                  <Editable path={`services.items.${i}.age`} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: T.text, marginBottom: 9, lineHeight: 1.3 }}>
                  <Editable path={`services.items.${i}.title`} />
                </h3>
                <p style={{ fontSize: ".83rem", color: T.textLt, lineHeight: 1.75, marginBottom: 16 }}>
                  <Editable path={`services.items.${i}.desc`} multi />
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {s.tags.map((t, j) => (
                    <span key={j} style={{ fontSize: ".63rem", fontWeight: 600, color: c, background: c + "14", padding: "3px 9px", borderRadius: 100 }}>
                      <Editable path={`services.items.${i}.tags.${j}`} />
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SESSION FORMATS
───────────────────────────────────────────────────────────── */
function SessionFormats() {
  const [ref, on] = useReveal();
  const { content } = useEdit();
  const items = content.sessionFormats.items;

  return (
    <section ref={ref} className="section" style={{ background: T.white }}>
      <div className="container">
        <div className={`reveal ${on ? "in" : ""}`} style={{ marginBottom: 44 }}>
          <SectionHead labelPath="sessionFormats.label" h2Path="sessionFormats.heading" subPath="sessionFormats.subtext" center />
        </div>
        <div className="grid-4" style={{ marginBottom: 20 }}>
          {items.map((f, i) => (
            <div key={i} className={`card reveal d${i + 1} ${on ? "in" : ""}`} style={{ padding: "22px 18px" }}>
              <div style={{ fontSize: "1.7rem", marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontSize: ".64rem", fontWeight: 700, color: T.sage, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 5 }}>
                <Editable path={`sessionFormats.items.${i}.sub`} />
              </div>
              <h3 style={{ fontSize: ".97rem", fontWeight: 700, color: T.text, marginBottom: 8, lineHeight: 1.3 }}>
                <Editable path={`sessionFormats.items.${i}.title`} />
              </h3>
              <p style={{ fontSize: ".8rem", color: T.textLt, lineHeight: 1.7 }}>
                <Editable path={`sessionFormats.items.${i}.desc`} multi />
              </p>
              {f.detail && (
                <div style={{ fontSize: ".7rem", color: T.sage, fontWeight: 500, marginTop: 8 }}>
                  <Editable path={`sessionFormats.items.${i}.detail`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Anonymous card */}
        <div className={`reveal d5 ${on ? "in" : ""}`} style={{
          background: `linear-gradient(110deg,${T.sageDk} 0%,${T.sage} 100%)`,
          borderRadius: T.rXl, padding: "clamp(20px,4vw,32px) clamp(20px,4vw,40px)",
          display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap",
        }}>
          <div style={{ fontSize: "2rem", flexShrink: 0 }}>🎭</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: ".64rem", fontWeight: 700, color: "rgba(255,255,255,.6)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 5 }}>
              <Editable path="sessionFormats.anonSub" style={{ color: "rgba(255,255,255,.6)" }} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: "clamp(1rem,2.5vw,1.2rem)", color: "#fff", marginBottom: 7, fontFamily: "'Fraunces', serif" }}>
              <Editable path="sessionFormats.anonTitle" style={{ color: "#fff" }} />
            </h3>
            <p style={{ fontSize: ".875rem", color: "rgba(255,255,255,.76)", lineHeight: 1.75, maxWidth: 520 }}>
              <Editable path="sessionFormats.anonDesc" multi style={{ color: "rgba(255,255,255,.76)" }} />
            </p>
          </div>
          <a href="#book" className="btn" style={{ background: "rgba(255,255,255,.18)", color: "#fff", border: "1.5px solid rgba(255,255,255,.35)", flexShrink: 0 }}>
            <Editable path="sessionFormats.anonCta" style={{ color: "#fff" }} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────────────────────── */
function HowItWorks({ onBookNow }) {
  const [ref, on] = useReveal();
  const { content, getValue } = useEdit();
  const steps = content.howItWorks.steps;

  return (
    <section id="how-it-works" ref={ref} className="section" style={{ background: T.bgAlt }}>
      <div className="container">
        <div className={`reveal ${on ? "in" : ""}`} style={{ marginBottom: 44 }}>
          <SectionHead labelPath="howItWorks.label" h2Path="howItWorks.heading" subPath="howItWorks.subtext" center />
        </div>

        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: T.border, borderRadius: T.rLg, overflow: "hidden", marginBottom: 24 }}>
          {steps.map((s, i) => (
            <div key={i} className={`reveal d${(i % 3) + 1} ${on ? "in" : ""}`}
              style={{ background: T.white, padding: "28px 22px", transition: "background .2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = T.sagePale}
              onMouseLeave={e => e.currentTarget.style.background = T.white}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${T.sage}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".8rem", fontWeight: 700, color: T.sage, flexShrink: 0 }}>
                  <Editable path={`howItWorks.steps.${i}.n`} />
                </div>
                <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: ".97rem", color: T.text, marginBottom: 8 }}>
                <Editable path={`howItWorks.steps.${i}.title`} />
              </h3>
              <p style={{ fontSize: ".81rem", color: T.textLt, lineHeight: 1.75 }}>
                <Editable path={`howItWorks.steps.${i}.desc`} multi />
              </p>
            </div>
          ))}
        </div>

        {/* Fee row */}
        <div className={`reveal d4 ${on ? "in" : ""}`} style={{
          background: T.white, borderRadius: T.rLg, border: `1px solid ${T.border}`,
          padding: "24px 30px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 24, flexWrap: "wrap", boxShadow: T.shSm,
        }}>
          <div>
            <div style={{ fontSize: ".7rem", fontWeight: 600, color: T.textLt, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 5 }}>
              <Editable path="howItWorks.feeLabel" />
            </div>
            <div style={{ fontWeight: 700, fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: T.text, fontFamily: "'Fraunces', serif" }}>
              <Editable path="howItWorks.feeRange" />
              <span style={{ fontWeight: 400, fontSize: ".9rem", color: T.textLt }}>{" "}<Editable path="howItWorks.feePer" /></span>
            </div>
            <div style={{ fontSize: ".76rem", color: T.textLt, marginTop: 5 }}>
              <Editable path="howItWorks.feeNote" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onBookNow}>
              <Editable path="howItWorks.feeCta1" style={{ color: "inherit" }} />
            </button>
            <a href={`https://wa.me/919242163432?text=${encodeURIComponent("Hi, I have a question about MindSphere.")}`} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Editable path="howItWorks.feeCta2" style={{ color: "inherit" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPECIALISTS
───────────────────────────────────────────────────────────── */
function Specialists() {
  const [ref, on] = useReveal();
  const { content } = useEdit();
  const team = content.specialists.team;

  return (
    <section id="specialists" ref={ref} className="section" style={{ background: T.white }}>
      <div className="container">
        <div className={`reveal ${on ? "in" : ""}`} style={{ marginBottom: 44 }}>
          <SectionHead labelPath="specialists.label" h2Path="specialists.heading" subPath="specialists.subtext" center />
        </div>
        <div className="grid-3">
          {team.map((m, i) => (
            <div key={i} className={`reveal d${i + 1} ${on ? "in" : ""}`}
              style={{ background: T.white, borderRadius: T.rXl, overflow: "hidden", border: `1px solid ${T.border}`, boxShadow: T.shSm, transition: "transform .22s ease,box-shadow .22s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = T.shLg; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = T.shSm; }}>

              <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
                <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .5s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(17,27,24,.8),transparent)", padding: "28px 16px 12px" }}>
                  <span style={{ fontSize: ".64rem", color: "rgba(255,255,255,.8)", fontWeight: 500 }}>
                    <Editable path={`specialists.team.${i}.creds`} style={{ color: "rgba(255,255,255,.8)" }} />
                  </span>
                </div>
              </div>

              <div style={{ padding: "20px 20px 24px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: T.text, marginBottom: 3, fontFamily: "'Fraunces', serif" }}>
                  <Editable path={`specialists.team.${i}.name`} />
                </h3>
                <div style={{ fontSize: ".67rem", fontWeight: 700, color: T.sage, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>
                  <Editable path={`specialists.team.${i}.role`} />
                </div>
                <p style={{ fontSize: ".81rem", color: T.textLt, lineHeight: 1.7, marginBottom: 12 }}>
                  <Editable path={`specialists.team.${i}.bio`} multi />
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                  {m.spec.map((sp, j) => (
                    <span key={j} style={{ fontSize: ".62rem", fontWeight: 600, color: T.sage, background: T.sageLt, padding: "3px 9px", borderRadius: 100 }}>
                      <Editable path={`specialists.team.${i}.spec.${j}`} />
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", background: T.bg, borderRadius: T.r, marginBottom: 14, fontSize: ".74rem", color: T.textMd, fontWeight: 500 }}>
                  🌐 <Editable path={`specialists.team.${i}.langs`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────── */
function Testimonials() {
  const [ref, on] = useReveal();
  const { content } = useEdit();
  const items = content.testimonials.items;

  return (
    <section id="testimonials" ref={ref} className="section" style={{ background: T.bgAlt }}>
      <div className="container">
        <div className={`reveal ${on ? "in" : ""}`} style={{ marginBottom: 44 }}>
          <SectionHead labelPath="testimonials.label" h2Path="testimonials.heading" subPath="testimonials.subtext" center />
        </div>
        <div className="grid-3">
          {items.map((t, i) => (
            <div key={i} className={`card reveal d${Math.min(i + 1, 6)} ${on ? "in" : ""}`}
              style={{ padding: "24px 22px" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.sage}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill={T.gold} stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: ".88rem", color: T.textMd, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>
                "<Editable path={`testimonials.items.${i}.quote`} multi />"
              </p>
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontWeight: 600, fontSize: ".77rem", color: T.text }}>
                  <Editable path={`testimonials.items.${i}.who`} />
                </div>
                <span style={{ fontSize: ".62rem", fontWeight: 700, color: T.sage, background: T.sageLt, padding: "3px 9px", borderRadius: 100 }}>
                  <Editable path={`testimonials.items.${i}.tag`} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────────────────────────── */
function CTASection({ onBookNow }) {
  return (
    <section className="section" style={{ background: T.white }}>
      <div className="container">
        <div style={{
          background: `linear-gradient(135deg, ${T.sageDk} 0%, ${T.sage} 60%, #4A9A86 100%)`,
          borderRadius: T.rXl, padding: "clamp(36px,6vw,68px) clamp(24px,5vw,72px)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: ".64rem", fontWeight: 700, color: "rgba(255,255,255,.6)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 14 }}>
            Take the First Step
          </div>
          <h2 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", marginBottom: 16, fontFamily: "'Fraunces', serif", lineHeight: 1.2 }}>
            You deserve support.<br />
            <span style={{ fontStyle: "italic", fontWeight: 600 }}>We're ready when you are.</span>
          </h2>
          <p style={{ fontSize: "clamp(.88rem,1.5vw,1rem)", color: "rgba(255,255,255,.78)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 32px" }}>
            First consultation is free. No commitment, no pressure — just a confidential conversation about how we can help.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-lg" style={{ background: "#fff", color: T.sage, border: "none" }} onClick={onBookNow}>
              Book a Free Consultation
            </button>
            <a href={`https://wa.me/919242163432?text=${encodeURIComponent("Hi MindSphere, I'd like to learn more.")}`}
              target="_blank" rel="noreferrer"
              className="btn btn-lg"
              style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,.4)" }}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
  const { getValue } = useEdit();
  return (
    <footer style={{ background: T.text, padding: "clamp(44px,7vw,68px) var(--px) 30px", overflowX: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "clamp(24px,4vw,44px)", marginBottom: 44 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" /><path d="M9 14s1.5-3 3-3 3 3 3 3" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", fontFamily: "'Fraunces', serif" }}>
                <Editable path="site.name" style={{ color: "#fff" }} />
              </span>
            </div>
            <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", lineHeight: 1.8, maxWidth: 275, marginBottom: 20 }}>
              <Editable path="footer.about" multi style={{ color: "rgba(255,255,255,.5)" }} />
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { ico: "📞", path: "site.phone", href: `tel:${getValue("site.phone")}` },
                { ico: "✉️", path: "site.email", href: `mailto:${getValue("site.email")}` },
                { ico: "📍", path: "site.address1", href: "#" },
                { ico: "📍", path: "site.address2", href: "#" },
              ].map((c, i) => (
                <a key={i} href={c.href}
                  style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: ".78rem", color: "rgba(255,255,255,.55)", transition: "color .18s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.9)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.55)"}>
                  <span style={{ flexShrink: 0, marginTop: 1 }}>{c.ico}</span>
                  <Editable path={c.path} style={{ color: "inherit" }} />
                </a>
              ))}
            </div>
          </div>

          {[
            { h: "Practice", items: ["Executive Psychology", "Trauma & PTSD", "Couples Therapy", "Anxiety & Depression", "Children", "Older Adults"] },
            { h: "Formats", items: ["Café or Restaurant", "Home Sessions", "Our Consulting Rooms", "Online Video", "Anonymous Session"] },
            { h: "Navigate", items: ["About Us", "Our Specialists", "How It Works", "Testimonials", "Book Appointment", "Privacy Policy"] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontWeight: 700, fontSize: ".64rem", color: T.sage, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>{col.h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.items.map(it => (
                  <a key={it} href="#" style={{ fontSize: ".8rem", color: "rgba(255,255,255,.5)", transition: "color .18s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.85)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.5)"}>{it}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,.08)", margin: "0 0 22px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: ".69rem", color: "rgba(255,255,255,.3)" }}>
            <Editable path="site.copyright" style={{ color: "rgba(255,255,255,.3)" }} />
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Privacy", "Terms", "Confidentiality", "GDPR"].map(l => (
              <a key={l} href="#" style={{ fontSize: ".68rem", color: "rgba(255,255,255,.3)", transition: "color .18s" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.7)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.3)"}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   STICKY CTA
───────────────────────────────────────────────────────────── */
function StickyCTA({ onBookNow }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const waLink = "https://wa.me/919242163432?text=" + encodeURIComponent("Hi MindSphere, I'd like to get in touch.");
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 20, zIndex: 990,
      display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end",
      opacity: show ? 1 : 0, transform: show ? "none" : "translateY(8px)",
      transition: "all .3s ease", pointerEvents: show ? "auto" : "none",
    }}>
      <a href={waLink} target="_blank" rel="noreferrer" title="WhatsApp"
        style={{ width: 50, height: 50, borderRadius: "50%", background: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", boxShadow: "0 4px 18px rgba(37,211,102,.4)", transition: "transform .2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>💬</a>
      <button className="btn btn-primary btn-sm" onClick={onBookNow} style={{ borderRadius: 100, boxShadow: `0 4px 18px rgba(61,122,106,.35)` }}>
        Book Now
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BOOKING PAGE — Clean standalone multi-step flow
───────────────────────────────────────────────────────────── */
function BookingPage({ onBack }) {
  const { content, getValue } = useEdit();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    category: "", format: "", specialist: "any",
    anon: false, name: "", email: "", phone: "", dob: "", notes: "", slot: "",
  });
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const CATS = [
    { v: "children", l: "Children & Young People", ico: "🧒", d: "Ages 4–17" },
    { v: "adults", l: "Individual Adults", ico: "🧑", d: "18 and above" },
    { v: "couples", l: "Couples & Relationships", ico: "💑", d: "Partners or family" },
    { v: "executive", l: "Professionals / Executives", ico: "💼", d: "Workplace & performance" },
    { v: "private", l: "Private & Confidential", ico: "🔐", d: "High discretion required" },
    { v: "older", l: "Older Adults", ico: "👴", d: "55 and above" },
  ];
  const FMTS = [
    { v: "cafe", l: "Café or Restaurant", ico: "☕", s: "We come to your preferred spot" },
    { v: "home", l: "Your Home or Private Space", ico: "🏠", s: "Maximum comfort & privacy" },
    { v: "office", l: "Our Consulting Rooms", ico: "🏢", s: "Indiranagar or Koramangala, Bengaluru" },
    { v: "online", l: "Secure Video Session", ico: "🖥️", s: "Encrypted • Available across India" },
    { v: "anon", l: "Anonymous Voice Session", ico: "🎭", s: "Voice only • No identity required" },
  ];
  const SPECS = [
    { v: "priya", l: "Dr. Priya Sharma", s: "Adults · Trauma · Anxiety" },
    { v: "arun", l: "Dr. Arun Menon", s: "Couples · Family · Communication" },
    { v: "kavita", l: "Dr. Kavita Nair", s: "Children · ADHD · Adolescents" },
    { v: "any", l: "Best match for me", s: "We'll assign the right specialist" },
  ];
  const SLOTS = [
    "Mon 9:00 AM", "Mon 1:00 PM", "Mon 5:30 PM",
    "Tue 10:00 AM", "Tue 2:00 PM", "Tue 6:00 PM",
    "Wed 9:00 AM", "Wed 12:30 PM", "Wed 4:30 PM",
    "Thu 11:00 AM", "Thu 3:00 PM", "Thu 5:30 PM",
    "Fri 9:00 AM", "Fri 1:00 PM", "Fri 3:30 PM",
  ];

  const waMsg = () => {
    const isAnon = form.anon || form.format === "anon";
    return `New MindSphere Booking 🌿\n\n` +
      `Category: ${CATS.find(c => c.v === form.category)?.l || form.category}\n` +
      `Format: ${FMTS.find(f => f.v === form.format)?.l || form.format}\n` +
      `Specialist: ${SPECS.find(s => s.v === form.specialist)?.l || form.specialist}\n` +
      `Name: ${isAnon ? "Anonymous" : form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Preferred Slot: ${form.slot}\n` +
      `Notes: ${form.notes || "None"}`;
  };

  const submit = () => {
    window.open(`https://wa.me/919242163432?text=${encodeURIComponent(waMsg())}`, "_blank");
    setDone(true);
  };

  const steps = ["Your Needs", "How to Meet", "Your Details", "Choose Slot"];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, paddingTop: 68 }}>
      {/* Header bar */}
      <div style={{
        background: T.white, borderBottom: `1px solid ${T.border}`,
        padding: "0 var(--px)", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: "100%", gap: 16,
      }}>
        <button onClick={onBack} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, color: T.textMd, fontWeight: 600, fontSize: ".85rem", cursor: "pointer", padding: "8px 0" }}>
          ← Back to site
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" /><path d="M9 14s1.5-3 3-3 3 3 3 3" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, color: T.text, fontSize: ".95rem", fontFamily: "'Fraunces', serif" }}>MindSphere</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".75rem", color: T.textLt }}>
          🔒 <span>Confidential</span>
        </div>
      </div>

      {done ? (
        /* Success */
        <div style={{ maxWidth: 540, margin: "0 auto", padding: "60px var(--px)", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: T.sageLt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", margin: "0 auto 28px" }}>✅</div>
          <h2 style={{ fontWeight: 600, fontSize: "clamp(1.5rem,3vw,2rem)", color: T.text, marginBottom: 14, fontFamily: "'Fraunces', serif" }}>
            Request Sent — Thank You
          </h2>
          <p style={{ fontSize: ".93rem", color: T.textLt, lineHeight: 1.8, marginBottom: 28 }}>
            Our care coordinator will reach out within 2 hours to confirm your appointment. Check your WhatsApp.
          </p>
          <div style={{ background: T.sagePale, border: `1px solid ${T.sageLt}`, borderRadius: T.rLg, padding: "16px 20px", marginBottom: 28, textAlign: "left" }}>
            <div style={{ fontSize: ".72rem", fontWeight: 700, color: T.sage, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>Your booking summary</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Category", CATS.find(c => c.v === form.category)?.l],
                ["Format", FMTS.find(f => f.v === form.format)?.l],
                ["Specialist", SPECS.find(s => s.v === form.specialist)?.l],
                ["Preferred Slot", form.slot],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", gap: 12 }}>
                  <span style={{ color: T.textLt }}>{k}</span>
                  <span style={{ color: T.text, fontWeight: 600, textAlign: "right" }}>{v || "—"}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onBack}>← Back to site</button>
            <a href={`https://wa.me/919242163432`} target="_blank" rel="noreferrer" className="btn btn-secondary">💬 Continue on WhatsApp</a>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(24px,5vw,48px) var(--px)" }}>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: T.text, marginBottom: 10, fontFamily: "'Fraunces', serif" }}>
              Book Your <span style={{ fontStyle: "italic", color: T.sage, fontWeight: 600 }}>First Session</span>
            </h1>
            <p style={{ fontSize: ".9rem", color: T.textLt, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
              Confidential, simple, and entirely on your terms. Takes about 3 minutes.
            </p>
          </div>

          {/* Step indicator */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 0, background: T.white, borderRadius: 100, padding: 5, border: `1px solid ${T.border}`, boxShadow: T.shSm, overflowX: "auto" }}>
              {steps.map((lbl, i) => (
                <div key={lbl} onClick={() => step > i + 1 && setStep(i + 1)} style={{
                  flex: 1, padding: "9px 8px", borderRadius: 100,
                  background: step === i + 1 ? T.sage : "transparent",
                  cursor: step > i + 1 ? "pointer" : "default",
                  textAlign: "center", whiteSpace: "nowrap", minWidth: 0,
                  transition: "background .2s",
                }}>
                  <span style={{ fontSize: "clamp(.66rem,.9vw,.72rem)", fontWeight: 600, color: step === i + 1 ? "#fff" : step > i + 1 ? T.sage : T.textLt }}>
                    {i + 1}. {lbl}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div style={{ marginTop: 10, height: 3, background: T.border, borderRadius: 100 }}>
              <div style={{ height: "100%", borderRadius: 100, background: T.sage, width: `${(step / steps.length) * 100}%`, transition: "width .4s ease" }} />
            </div>
          </div>

          {/* Form card */}
          <div style={{ background: T.white, borderRadius: T.rXl, padding: "clamp(20px,5vw,40px)", boxShadow: T.shLg, border: `1px solid ${T.border}` }}>

            {/* STEP 1 — Who */}
            {step === 1 && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: T.text, marginBottom: 5 }}>Who are the sessions for?</h2>
                  <p style={{ fontSize: ".84rem", color: T.textLt }}>Select the category that best describes your needs.</p>
                </div>
                <div className="grid-3" style={{ marginBottom: 28 }}>
                  {CATS.map(c => (
                    <div key={c.v}
                      onClick={() => set("category", c.v)}
                      style={{
                        border: `1.5px solid ${form.category === c.v ? T.sage : T.border}`,
                        background: form.category === c.v ? T.sagePale : T.bg,
                        borderRadius: T.rLg, padding: "16px 12px", cursor: "pointer",
                        textAlign: "center", transition: "all .18s",
                      }}>
                      <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{c.ico}</div>
                      <div style={{ fontWeight: 600, fontSize: ".82rem", color: form.category === c.v ? T.sage : T.text, marginBottom: 3, lineHeight: 1.3 }}>{c.l}</div>
                      <div style={{ fontSize: ".68rem", color: T.textLt }}>{c.d}</div>
                      {form.category === c.v && <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px auto 0" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn btn-primary" onClick={() => form.category && setStep(2)} style={{ opacity: form.category ? 1 : .35 }}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Format & Specialist */}
            {step === 2 && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: T.text, marginBottom: 5 }}>How would you like to meet?</h2>
                  <p style={{ fontSize: ".84rem", color: T.textLt }}>Choose your preferred session format and specialist.</p>
                </div>

                <label className="lbl" style={{ marginBottom: 10 }}>Session Format</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {FMTS.map(f => (
                    <div key={f.v}
                      onClick={() => set("format", f.v)}
                      style={{
                        border: `1.5px solid ${form.format === f.v ? T.sage : T.border}`,
                        background: form.format === f.v ? T.sagePale : T.bg,
                        borderRadius: T.r, padding: "13px 16px", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 14, transition: "all .18s",
                      }}>
                      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{f.ico}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: ".85rem", color: form.format === f.v ? T.sage : T.text }}>{f.l}</div>
                        <div style={{ fontSize: ".72rem", color: T.textLt, marginTop: 2 }}>{f.s}</div>
                      </div>
                      {form.format === f.v && (
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.sage, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <label className="lbl" style={{ marginBottom: 10 }}>Preferred Specialist</label>
                <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
                  {SPECS.map(s => (
                    <div key={s.v}
                      onClick={() => set("specialist", s.v)}
                      style={{
                        border: `1.5px solid ${form.specialist === s.v ? T.sage : T.border}`,
                        background: form.specialist === s.v ? T.sagePale : T.bg,
                        borderRadius: T.r, padding: "12px 14px", cursor: "pointer", transition: "all .18s",
                      }}>
                      <div style={{ fontWeight: 600, fontSize: ".82rem", color: form.specialist === s.v ? T.sage : T.text, marginBottom: 3 }}>{s.l}</div>
                      <div style={{ fontSize: ".7rem", color: T.textLt }}>{s.s}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary" onClick={() => form.format && setStep(3)} style={{ opacity: form.format ? 1 : .35 }}>Continue →</button>
                </div>
              </div>
            )}

            {/* STEP 3 — Details */}
            {step === 3 && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: T.text, marginBottom: 5 }}>Your Contact Details</h2>
                  <p style={{ fontSize: ".84rem", color: T.textLt }}>Held in strict clinical confidence. Never shared with third parties.</p>
                </div>

                {/* Anonymous toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: T.bg, border: `1.5px solid ${form.anon ? T.sage : T.border}`, borderRadius: T.r, marginBottom: 22, cursor: "pointer", transition: "border-color .18s" }}
                  onClick={() => set("anon", !form.anon)}>
                  <div style={{ width: 42, height: 24, borderRadius: 12, background: form.anon ? T.sage : T.border, position: "relative", transition: "background .2s", flexShrink: 0 }}>
                    <div style={{ position: "absolute", top: 4, left: form.anon ? 20 : 4, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.18)" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".85rem", color: T.text }}>🎭 Submit Anonymously</div>
                    <div style={{ fontSize: ".72rem", color: T.textLt, marginTop: 2 }}>Your name won't be stored. We'll use a private reference code.</div>
                  </div>
                </div>

                <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
                  {!form.anon && <>
                    <div style={{ marginBottom: 16 }}>
                      <label className="lbl">Full Name</label>
                      <input className="field" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label className="lbl">Date of Birth</label>
                      <input className="field" type="date" value={form.dob} onChange={e => set("dob", e.target.value)} />
                    </div>
                  </>}
                  <div style={{ marginBottom: 16 }}>
                    <label className="lbl">Email Address *</label>
                    <input className="field" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="lbl">WhatsApp / Phone</label>
                    <input className="field" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label className="lbl">Brief Note (Optional)</label>
                  <textarea className="field" rows={3} value={form.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} placeholder="Tell us a little about what you'd like support with…" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn btn-primary" onClick={() => form.email && setStep(4)} style={{ opacity: form.email ? 1 : .35 }}>Choose Slot →</button>
                </div>
              </div>
            )}

            {/* STEP 4 — Slot & Confirm */}
            {step === 4 && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: T.text, marginBottom: 5 }}>Choose Your Preferred Slot</h2>
                  <p style={{ fontSize: ".84rem", color: T.textLt }}>Select a time. Your coordinator will confirm availability within 2 hours.</p>
                </div>

                <div className="slots-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 7, marginBottom: 24 }}>
                  {SLOTS.map(sl => (
                    <div key={sl} onClick={() => set("slot", sl)} style={{
                      border: `1.5px solid ${form.slot === sl ? T.sage : T.border}`,
                      background: form.slot === sl ? T.sageLt : T.bg,
                      borderRadius: T.r, padding: "10px 5px", cursor: "pointer",
                      fontSize: ".73rem", fontWeight: 500, textAlign: "center",
                      color: form.slot === sl ? T.sage : T.textMd, transition: "all .15s",
                    }}>{sl}</div>
                  ))}
                </div>

                {/* Summary */}
                <div style={{ background: T.bg, borderRadius: T.r, padding: "18px 20px", border: `1px solid ${T.border}`, marginBottom: 18 }}>
                  <div style={{ fontSize: ".67rem", fontWeight: 700, color: T.textLt, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>Booking Summary</div>
                  <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
                    {[
                      ["Category", CATS.find(c => c.v === form.category)?.l],
                      ["Format", FMTS.find(f => f.v === form.format)?.l],
                      ["Specialist", SPECS.find(s => s.v === form.specialist)?.l],
                      ["Preferred Slot", form.slot || "Not selected"],
                      ["Identity", form.anon ? "Anonymous 🎭" : "Named"],
                      ["Contact", form.email],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: ".66rem", color: T.textLt, marginBottom: 2, textTransform: "uppercase", letterSpacing: ".06em" }}>{k}</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: T.text }}>{v || "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment placeholder */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: T.goldLt, border: `1px solid ${T.gold}40`, borderRadius: T.r, marginBottom: 22 }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>💳</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: ".82rem", color: T.text, marginBottom: 3 }}>Secure Payment — Coming Soon</div>
                    <p style={{ fontSize: ".77rem", color: T.textMd, lineHeight: 1.65 }}>
                      Razorpay integration is being set up. For now, your coordinator will share payment details via WhatsApp after confirming your slot. No payment is taken at this stage.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <button className="btn btn-ghost" onClick={() => setStep(3)}>← Back</button>
                  <button className="btn btn-gold" onClick={submit} style={{ opacity: form.slot ? 1 : .35, display: "flex", alignItems: "center", gap: 8 }}>
                    <span>💬</span> Send Booking via WhatsApp
                  </button>
                </div>
                <p style={{ marginTop: 12, fontSize: ".69rem", color: T.textLt, textAlign: "center" }}>
                  No payment taken now. Confirmation within 2 hours. 🔒 Fully confidential.
                </p>
              </div>
            )}
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: 20, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { ico: "🔒", n: "256-bit SSL", s: "End-to-end encrypted" },
              { ico: "💬", n: "WhatsApp", s: "Instant confirmation" },
              { ico: "🎭", n: "Anonymous Option", s: "No identity required" },
              { ico: "💳", n: "Razorpay", s: "Secure payments (soon)" },
            ].map(it => (
              <div key={it.n} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 13px", background: T.white, borderRadius: 100, border: `1px solid ${T.border}`, boxShadow: T.shSm }}>
                <span style={{ fontSize: ".84rem" }}>{it.ico}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: ".67rem", color: T.text }}>{it.n}</div>
                  <div style={{ fontSize: ".59rem", color: T.textLt }}>{it.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────── */
export default function App() {
  const [content, setContent]       = useState(defaultContent);
  const [editMode, setEditMode]      = useState(false);
  const [hasChanges, setHasChanges]  = useState(false);
  const [page, setPage]              = useState("home"); // "home" | "book"

  const getValue = (path) => String(getByPath(content, path) ?? "");
  const setValue = (path, value) => {
    setContent(prev => setByPath(prev, path, value));
    setHasChanges(true);
  };

  const saveAndDownload = () => {
    const json = JSON.stringify(content, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "content.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setHasChanges(false);
    alert("✅ content.json downloaded!\nSend this file to your developer to update the site.");
  };

  const goBook  = () => { setPage("book"); window.scrollTo(0, 0); };
  const goHome  = () => { setPage("home"); window.scrollTo(0, 0); };

  const ctxValue = { editMode, content, getValue, setValue };

  return (
    <EditCtx.Provider value={ctxValue}>
      <div className={editMode ? "edit-active" : ""} style={{ marginTop: editMode ? 48 : 0, transition: "margin-top .2s" }}>
        <GlobalStyles />

        <EditToolbar
          editMode={editMode}
          setEditMode={setEditMode}
          onSave={saveAndDownload}
          hasChanges={hasChanges}
        />

        {page === "book" ? (
          <>
            <Navbar onBookNow={goBook} editMode={editMode} />
            <BookingPage onBack={goHome} />
          </>
        ) : (
          <>
            <Navbar onBookNow={goBook} editMode={editMode} />
            <Hero onBookNow={goBook} />
            <TrustBar />
            <About />
            <Services />
            <SessionFormats />
            <HowItWorks onBookNow={goBook} />
            <Specialists />
            <Testimonials />
            <CTASection onBookNow={goBook} />
            <Footer />
            <StickyCTA onBookNow={goBook} />
          </>
        )}
      </div>
    </EditCtx.Provider>
  );
}