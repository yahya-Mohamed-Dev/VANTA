import { useEffect, useMemo, useState } from "react";

const titles = [
  {
    name: "The Quiet Orbit",
    genre: "Sci-Fi",
    year: "2026",
    colors: ["#142f43", "#6b8a9d"],
    image: "photo-1462331940025-496dfbfc7564",
    description:
      "A lone cartographer discovers a signal that redraws the edge of the known universe.",
  },
  {
    name: "Golden Hour",
    genre: "Drama",
    year: "2025",
    colors: ["#8a4d2e", "#e7a959"],
    image: "photo-1500530855697-b586d89ba3ee",
    description: "One small coastal town. One summer that changes everything.",
  },
  {
    name: "Wild Current",
    genre: "Documentary",
    year: "2026",
    colors: ["#145153", "#73c4a9"],
    image: "photo-1518837695005-2083093ee35b",
    description:
      "A breathtaking journey into the secret lives of the world's wild rivers.",
  },
  {
    name: "House of Echoes",
    genre: "Thriller",
    year: "2025",
    colors: ["#28203d", "#826eaf"],
    image: "photo-1519608487953-e999c86e7455",
    description:
      "A new caretaker finds every room in an old hotel holds a different memory.",
  },
  {
    name: "The Last Recipe",
    genre: "Drama",
    year: "2024",
    colors: ["#763638", "#e78b6d"],
    image: "photo-1517248135467-4c7edcad34c4",
    description:
      "Two estranged siblings reunite to save the family restaurant that raised them.",
  },
  {
    name: "Small Wonders",
    genre: "Documentary",
    year: "2026",
    colors: ["#355326", "#b6bd6a"],
    image: "photo-1473448912268-2022ce9509d8",
    description:
      "A fresh look at the extraordinary worlds hiding just beneath our feet.",
  },
  {
    name: "Neon District",
    genre: "Sci-Fi",
    year: "2025",
    colors: ["#35274b", "#ee658d"],
    image: "photo-1519608487953-e999c86e7455",
    description:
      "In a city that never sleeps, one night-shift courier uncovers a new reality.",
  },
  {
    name: "Northbound",
    genre: "Thriller",
    year: "2024",
    colors: ["#24394d", "#8da4b1"],
    image: "photo-1470770841072-f978cf4d019e",
    description:
      "A missing train and a town full of people who insist it never existed.",
  },
];

const imageUrl = (photoId, width = 900) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=85`;

const categories = ["All", "Drama", "Sci-Fi", "Thriller", "Documentary"];
const faqs = [
  [
    "What is Vanta?",
    "Vanta is a fictional streaming experience demo. Explore the collection, browse titles, and try the interactive features right here.",
  ],
  [
    "How much does a membership cost?",
    "Choose a plan that works for you: Basic at $6.99/month, Standard at $12.99/month, or Premium at $17.99/month. This demo does not process payments.",
  ],
  [
    "Where can I watch?",
    "Vanta is designed for the web and adapts to desktop, tablet, and mobile screens.",
  ],
  [
    "Can I cancel anytime?",
    "Absolutely. This is a demo experience, so there is no payment or subscription to cancel.",
  ],
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState(null);
  const [modal, setModal] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    document.body.classList.toggle("light-theme", !darkMode);
  }, [darkMode]);

  const visibleTitles = useMemo(
    () =>
      titles.filter((title) => {
        const matchesCategory = category === "All" || title.genre === category;
        const matchesQuery = `${title.name} ${title.genre} ${title.description}`
          .toLowerCase()
          .includes(query.toLowerCase().trim());
        return matchesCategory && matchesQuery;
      }),
    [category, query],
  );

  useEffect(() => {
    const elements = document.querySelectorAll("[data-scroll-reveal]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleTitles]);

  const showSignup = () => {
    setNotice("");
    setModal("signup");
  };

  const submitSignup = (event) => {
    event.preventDefault();
    setNotice("You're on the list! This demo doesn't collect or store your details.");
  };

  const openTitle = (title) => {
    setActiveTitle(title);
    setNotice("");
    setModal("title");
  };

  return (
    <>
      <header className="site-nav">
        <div className="container nav-inner d-flex align-items-center justify-content-between">
          <a className="brand" href="#home" aria-label="Vanta home">
            VANTA<span className="brand-mark">+</span>
          </a>
          <nav className="nav-links d-flex align-items-center" aria-label="Main navigation">
            <a className="active" href="#home">Home</a>
            <a href="#collection">Series &amp; Films</a>
            <a href="#membership">Plans</a>
          </nav>
          <div className="nav-actions d-flex align-items-center gap-2">
            {searchOpen && (
              <input
                autoFocus
                className="form-control form-control-sm search-input"
                placeholder="Search titles"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search titles"
              />
            )}
            <button
              className="icon-button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={searchOpen ? "Close search" : "Search"}
            >
              {searchOpen ? "×" : "⌕"}
            </button>
            <button
              className="icon-button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? "☼" : "☾"}
            </button>
            <button className="btn btn-vanta" onClick={showSignup}>Join Vanta</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-image"
            src={imageUrl("photo-1519608487953-e999c86e7455", 2000)}
            alt=""
            aria-hidden="true"
          />
          <div className="container hero-content animate__animated animate__fadeInUp">
            <div className="eyebrow">Vanta original · New series</div>
            <h1>Find your<br />next world.</h1>
            <p>Big ideas. Fresh perspectives. Stories that stay with you long after the credits roll.</p>
            <div className="hero-meta">2026 <span className="mx-2">•</span> 1 Season <span className="mx-2">•</span> Sci-Fi Adventure</div>
            <div className="hero-actions">
              <button
                className="btn btn-vanta"
                onClick={() => openTitle(titles[0])}
              >
                ▶ &nbsp; Explore the story
              </button>
              <button
                className="btn btn-quiet"
                onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse collection
              </button>
            </div>
          </div>
        </section>

        <section className="container section-wrap" id="collection">
          <div className="section-heading" data-scroll-reveal>
            <div>
              <h2>Stories for every mood</h2>
              <p>A handpicked collection, ready when you are.</p>
            </div>
            <a href="#membership" className="text-link d-none d-sm-inline">Explore membership →</a>
          </div>
          <div className="filters" aria-label="Filter by genre">
            {categories.map((item) => (
              <button
                key={item}
                className={`filter-chip ${category === item ? "selected" : ""}`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
          {visibleTitles.length ? (
            <div className="row g-3">
              {visibleTitles.map((title, index) => (
                <div className="col-6 col-md-4 col-lg-3" key={title.name}>
                  <button
                    className="title-card"
                    data-scroll-reveal
                    onClick={() => openTitle(title)}
                    style={{
                      "--card-a": title.colors[0],
                      "--card-b": title.colors[1],
                      "--reveal-delay": `${Math.min(index * 70, 350)}ms`,
                    }}
                    aria-label={`View ${title.name}`}
                  >
                    <img
                      className="title-card-image"
                      src={imageUrl(title.image)}
                      alt=""
                      loading="lazy"
                      onError={(event) => { event.currentTarget.style.display = "none"; }}
                    />
                    <span className="card-play" aria-hidden="true">▶</span>
                    <span className="card-copy">
                      <small>{title.genre} · {title.year}</small>
                      <strong>{title.name}</strong>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No titles match “{query}”. Try another search.</div>
          )}
        </section>

        <section className="container" id="membership">
          <div className="membership d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4" data-scroll-reveal>
            <div>
              <div className="eyebrow mb-3">Your next favorite is waiting</div>
              <h2>Great stories start with a single click.</h2>
              <p className="mb-0 mt-3">Get unlimited access to a world of new originals and timeless favorites. Cancel anytime.</p>
            </div>
            <button className="btn btn-vanta flex-shrink-0" onClick={showSignup}>
              See membership plans&nbsp; →
            </button>
          </div>
        </section>

        <section className="faq" data-scroll-reveal>
          <div className="container">
            <h2>Frequently asked questions</h2>
            <div className="row">
              <div className="col-lg-8">
                {faqs.map(([question, answer], index) => (
                  <div className="faq-item" key={question}>
                    <button
                      className="faq-question"
                      onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                      aria-expanded={openFaq === index}
                    >
                      {question}<span aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
                    </button>
                    {openFaq === index && <div className="faq-answer">{answer}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container d-flex flex-column flex-sm-row justify-content-between gap-3">
          <span>© 2026 Vanta+. A streaming experience concept.</span>
          <div className="d-flex gap-4">
            <a href="#membership">Plans</a>
            <a href="#collection">Browse</a>
            <button className="footer-button" onClick={() => setModal("help")}>Help</button>
          </div>
        </div>
      </footer>

      {modal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setModal("");
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {modal === "title" ? activeTitle?.name : modal === "signup" ? "Choose your Vanta plan" : "How can we help?"}
                  </h5>
                  <button className="btn-close" aria-label="Close" onClick={() => setModal("")} />
                </div>
                <div className="modal-body">
                  {modal === "title" && activeTitle && (
                    <>
                      <div
                        className="title-preview mb-3"
                        style={{ "--card-a": activeTitle.colors[0], "--card-b": activeTitle.colors[1] }}
                      >
                        <img
                          src={imageUrl(activeTitle.image, 1000)}
                          alt=""
                          onError={(event) => { event.currentTarget.style.display = "none"; }}
                        />
                        <span>{activeTitle.genre} · {activeTitle.year}</span>
                      </div>
                      <p className="modal-muted">{activeTitle.description}</p>
                      <button
                        className="btn btn-vanta"
                        onClick={() => setNotice("Preview ready — full playback is not part of this demo.")}
                      >
                        ▶ &nbsp; Play preview
                      </button>
                      {notice && <div className="alert alert-secondary mt-3 mb-0 py-2">{notice}</div>}
                    </>
                  )}
                  {modal === "signup" && (
                    <>
                      <p className="modal-muted">Pick the experience that feels right. No payment is taken in this demo.</p>
                      <form onSubmit={submitSignup}>
                        <label className="form-label" htmlFor="plan">Membership plan</label>
                        <select id="plan" className="form-select mb-3">
                          <option>Basic — $6.99 / month</option>
                          <option>Standard — $12.99 / month</option>
                          <option>Premium — $17.99 / month</option>
                        </select>
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input id="email" className="form-control mb-3" type="email" placeholder="you@example.com" required />
                        <button type="submit" className="btn btn-vanta w-100">Continue</button>
                      </form>
                      {notice && <div className="alert alert-success mt-3 mb-0">{notice}</div>}
                    </>
                  )}
                  {modal === "help" && (
                    <div className="modal-muted">
                      <p>Need a hand? This concept site is a frontend demo and does not have a support team or collect personal information.</p>
                      <button
                        className="btn btn-vanta"
                        onClick={() => {
                          setModal("");
                          document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Back to the top
                      </button>
                    </div>
                  )}
                </div>
                {modal === "signup" && (
                  <div className="modal-footer">
                    <small className="modal-muted">Cancel anytime · Watch on your favorite screen</small>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setModal("")} />
        </>
      )}
    </>
  );
}

export default App;
