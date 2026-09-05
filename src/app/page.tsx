"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  HeartHandshake,
  Menu,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const programs = [
  [
    "Toddler Time",
    "Ages 1–3",
    "45 mins",
    "$350",
    "6ae560728aed.jpg",
    "Gentle movement and guided play for little explorers.",
  ],
  [
    "Little Explorers",
    "Ages 3–5",
    "45 mins",
    "$400",
    "cfe838ad5277.jpg",
    "Movement, balance, coordination, and playful challenges.",
  ],
  [
    "Junior Gymnastics",
    "Ages 5–8",
    "45 mins",
    "$450",
    "ef30bb111be1.jpg",
    "A fun introduction to gymnastics fundamentals.",
  ],
  [
    "Open Play",
    "Ages 2–10",
    "90 mins",
    "$300",
    "a690886a06c6.jpg",
    "Flexible supervised play in the PlayNest activity space.",
  ],
];
const sessions = [
  [
    "09:00 AM",
    "Toddler Time",
    "Ages 1–3",
    "Studio A · 45 mins · Gentle Movement & Sensory",
    "Sample: 4 spots open",
    "$350",
  ],
  [
    "10:10 AM",
    "Little Explorers",
    "Ages 3–5",
    "Studio B · 45 mins · Movement & Balance Obstacles",
    "Sample: 2 spots open",
    "$400",
  ],
  [
    "02:00 PM",
    "Open Play",
    "Ages 2–10",
    "Central Play Loft · 90 mins · Supervised Free Exploration",
    "Sample: Filling fast",
    "$300",
  ],
  [
    "04:00 PM",
    "Junior Gymnastics",
    "Ages 5–8",
    "Studio A · 45 mins · Agility, Floor Mat Basics",
    "Sample: 3 spots open",
    "$450",
  ],
];
const nav = ["Programs", "Schedule", "Benefits", "Pricing", "FAQ"];

export default function Home() {
  const [faq, setFaq] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState(false);
  const [day, setDay] = useState("Tue");
  const triggerRef = useRef<HTMLElement | null>(null);
  const dismissRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const showNotice = (event?: React.MouseEvent<HTMLElement>) => {
    triggerRef.current = event?.currentTarget ?? null;
    setNotice(true);
  };
  const closeNotice = () => {
    setNotice(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };
  const trapNoticeFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  useEffect(() => {
    if (!notice) return;
    dismissRef.current?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNotice();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [notice]);
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">
          <img src="/images/playnest/b91dc68775b2.png" alt="" />
          <span>
            <b>PlayNest</b>
            <small>Play. Learn. Grow.</small>
          </span>
        </a>
        <nav className={menu ? "nav open" : "nav"}>
          {nav.map((x) => (
            <a
              key={x}
              href={`#${x.toLowerCase()}`}
              onClick={() => setMenu(false)}
            >
              {x}
            </a>
          ))}
        </nav>
        <button
          className="menu-button"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle navigation"
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <section id="top" className="hero wrap">
        <div className="hero-copy">
          <p className="micro-copy">Carefully curated play & learning</p>
          <h1>
            Where Kids Play, <em>Learn</em> &amp; <strong>Grow</strong>
          </h1>
          <p className="lead">
            Fun, active, and engaging experiences designed for growing kids.
            Thoughtfully structured play sessions that nurture confidence,
            coordination, and creative exploration.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#programs">
              Explore Programs <ArrowRight size={16} />
            </a>
            <Link className="quiet-button" href="/login">
              Try the booking demo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-photo">
          <img
            src="/images/playnest/6ae560728aed.jpg"
            alt="Children playing in a warm activity space"
          />
          <span className="hero-badge">Sample program preview</span>
          <div className="hero-card">
            <small>Play made</small>
            <b>Parent-first design</b>
            <span>Inclusive, active, and joy-led</span>
          </div>
          <span className="hero-age">Ages 1 to 10 years</span>
        </div>
      </section>
      <section id="programs" className="programs-section">
        <div className="wrap">
          <h2>Early Learning &amp; Play Programs</h2>
          <p className="section-intro">
            Each program is thoughtfully planned to support growing kids&apos;
            physical expression, social confidence, curiosity, and learning in
            small-group experiences.
          </p>
          <div className="program-grid">
            {programs.map(([title, ages, duration, price, image, desc]) => (
              <article className="program-card" key={title}>
                <div className="program-image">
                  <img
                    src={`/images/playnest/${image}`}
                    alt={`${title} sample activity session`}
                  />
                  <span>{ages}</span>
                  <i>{duration}</i>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <footer>
                  <b>{price}</b>
                  <a href="#schedule">View sample schedule</a>
                </footer>
              </article>
            ))}
          </div>
          <p className="booking-strip">
            Demo booking is available: choose a session, select a demo child,
            and retrieve the saved check-in pass in this browser.
          </p>
        </div>
      </section>
      <section id="benefits" className="benefits">
        <div className="wrap centered">
          <h2>Playful Restraint, Maximum Care</h2>
          <p className="section-intro">
            The children bring the energy; our programs provide the gentle care,
            calm safety, and predictable comfort.
          </p>
          <div className="benefit-grid">
            <Benefit
              icon={<ShieldCheck />}
              title="Safe Environment"
              text="A sample of the calm, age-appropriate environment PlayNest is designed to support."
            />
            <Benefit
              icon={<Sparkles />}
              title="Active Learning"
              text="Play-based experiences keep curiosity moving through joyful movement, balance, and collaboration."
            />
            <Benefit
              icon={<UsersRound />}
              title="Small Groups"
              text="A parent-focused sample experience built around clear, considered activity choices."
            />
            <Benefit
              icon={<HeartHandshake />}
              title="Easy Booking"
              text="Browse programs, choose a session, and save a parent-first demo booking."
            />
          </div>
        </div>
      </section>
      <section className="how-it-works">
        <div className="wrap centered">
          <h2>How PlayNest Works</h2>
          <p className="section-intro">
            From browsing ideas to playful time together, the path stays clear
            and simple.
          </p>
          <div className="steps">
            <Step
              n="1"
              title="Find an Activity"
              text="Browse age-appropriate development sessions suited to your child's current stage, comfort, goals, and energy level."
            />
            <Step
              n="2"
              title="Choose a Schedule"
              text="Pick your preferred studio session from the sample day. Select the child's attending age range with confidence."
            />
            <Step
              n="3"
              title="Come & Play"
              text="Arrive relaxed. PlayNest is built for a simple, considerate flow from planning to studio time."
            />
          </div>
        </div>
      </section>
      <section id="schedule" className="schedule">
        <div className="wrap">
          <h2>Sample Studio Schedule</h2>
          <p className="section-intro">
            This public preview shows all PlayNest programs together so you can
            compare example times. It is not a live calendar or a reservation.
          </p>
          <div className="day-tabs" aria-label="Sample schedule day">
            <span className="sr-only">Choose a sample schedule day</span>
            {["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((x) => (
              <button
                className={day === x ? "active" : ""}
                onClick={() => setDay(x)}
                aria-pressed={day === x}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="schedule-title">
            <span>▣ PlayNest Activity Center · {day}&apos;s example times</span>
            <small>Choose a day to compare the sample program times.</small>
          </div>
          <div className="session-list">
            {sessions.map(([time, title, ages, detail, state, price]) => (
              <article key={time}>
                <b className="time">{time}</b>
                <div>
                  <h3>
                    {title} <span>{ages}</span>
                  </h3>
                  <p>{detail}</p>
                </div>
                <span
                  className={
                    state.includes("Filling") ? "filling" : "available"
                  }
                >
                  {state}
                </span>
                <strong>{price}</strong>
              </article>
            ))}
          </div>
          <p className="schedule-foot">
            Times, instructors, and capacities are illustrative. Log in to
            PlayNest to try the interactive booking demo.
          </p>
        </div>
      </section>
      <section id="pricing" className="pricing">
        <div className="wrap centered">
          <h2>Demonstration Passes &amp; Offers</h2>
          <p className="section-intro">
            Sample offers are shown for evaluation only. Program prices vary;
            purchases and memberships are not available in this demo.
          </p>
          <div className="pricing-grid">
            <Price
              title="Single Session"
              price="$450"
              meta="/ single session"
              text="Drop-in exploration for spontaneous days of active sensory discovery."
              onClick={showNotice}
            />
            <Price
              featured
              title="5-Visit Pass"
              price="$1,800"
              meta="/ 5 credits ($360/ea)"
              text="Save 20% on multi-session visits with flexible family scheduling."
              onClick={showNotice}
            />
            <Price
              title="Monthly Membership"
              price="$1,499"
              meta="/ month"
              text="Unlimited weekday open play & milestone developmental tracking."
              onClick={showNotice}
            />
          </div>
        </div>
      </section>
      <section id="faq" className="faq">
        <div className="wrap narrow centered">
          <h2>Frequently Asked Questions</h2>
          <p className="section-intro">
            Everything families need to know about preparing for their studio
            visit.
          </p>
          {[
            [
              "What ages does PlayNest cater to?",
              "Programs span ages 1–10. Each sample program shows its specific age range.",
            ],
            [
              "How do I book a session?",
              "Explore Programs shows the public program overview. Log in to PlayNest when you are ready to try the booking demo.",
            ],
            [
              "Do parents need to attend?",
              "Please confirm attendance requirements directly with the venue before visiting.",
            ],
            [
              "Can I reschedule or cancel?",
              "Rescheduling and cancellation are not offered in this demo.",
            ],
          ].map(([q, a], i) => (
            <div className="faq-item" key={q}>
              <button
                onClick={() => setFaq(faq === i ? null : i)}
                aria-expanded={faq === i}
              >
                <span>{q}</span>
                <ChevronDown />
              </button>
              {faq === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>
      <section className="closing">
        <div className="wrap centered">
          <span className="closing-mark">✦</span>
          <h2>Ready for your next adventure?</h2>
          <p>
            Explore our programs and imagine a calm, joyful space where your
            child&apos;s natural curiosity leads the way.
          </p>
          <a className="primary-button" href="#programs">
            Explore Programs <ArrowRight size={16} />
          </a>
          <a
            className="secondary-download"
            href="/downloads/playnest-android-v1.0.0.apk"
            download
          >
            <Download size={16} /> Download Android demo
          </a>
          <small>
            PlayNest Early Development Center · Sample Movement &amp; Play
          </small>
        </div>
      </section>
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <a className="brand" href="#top">
              <img src="/images/playnest/b91dc68775b2.png" alt="" />
              <span>
                <b>PlayNest</b>
                <small>Play. Learn. Grow.</small>
              </span>
            </a>
            <p>
              Thoughtfully curated early-learning and creative play sessions
              designed for mindful parenting, collaborative social growth, and
              gentle development.
            </p>
            <span className="demo-pill">
              PlayNest Activity Center (Demo Environment)
            </span>
          </div>
          <div>
            <h3>Quick Links</h3>
            {nav.map((x) => (
              <a key={x} href={`#${x.toLowerCase()}`}>
                {x}
              </a>
            ))}
          </div>
          <div>
            <h3>Visit &amp; Care</h3>
            <p>
              PlayNest Activity Center
              <br />
              Demo location — details pending
            </p>
            <p>
              Tuesday – Sunday: 8:30 AM – 6:00 PM
              <br />
              Mondays: Closed for Studio Care
            </p>
          </div>
        </div>
        <div className="footer-bottom wrap">
          <span>
            © 2026 PlayNest. Demo showcase for a parent-first booking interface.
          </span>
          <span>Privacy Philosophy · Safety Guidelines · Terms of Service</span>
        </div>
      </footer>
      {notice && (
        <div
          className="notice-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="notice-title"
          aria-describedby="notice-description"
        >
          <div className="notice" ref={modalRef} onKeyDown={trapNoticeFocus}>
            <button onClick={closeNotice} aria-label="Close">
              <X />
            </button>
            <span>✦</span>
            <h2 id="notice-title">PlayNest demo booking</h2>
            <p id="notice-description">
              This page is a sample marketing experience. A live booking
              destination is not connected yet.
            </p>
            <button
              ref={dismissRef}
              className="primary-button"
              onClick={closeNotice}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
function Benefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article>
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <article>
      <span>{n}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <small>⌁ Find your best fit</small>
    </article>
  );
}
function Price({
  featured,
  title,
  price,
  meta,
  text,
  onClick,
}: {
  featured?: boolean;
  title: string;
  price: string;
  meta: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <article className={featured ? "featured" : ""}>
      {featured && <span className="popular">Most popular</span>}
      <small>{featured ? "Flexible value" : "Drop-in"}</small>
      <h3>{title}</h3>
      <p>{text}</p>
      <strong>{price}</strong>
      <em>{meta}</em>
      <ul>
        <li>
          <Check /> Sample offer only
        </li>
        <li>
          <Check /> No payment is collected
        </li>
        <li>
          <Check /> Demo access is included
        </li>
      </ul>
      <button onClick={onClick}>Evaluate {title}</button>
    </article>
  );
}
