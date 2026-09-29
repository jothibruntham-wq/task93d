import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../assets/style/style.css";

import model1 from "../assets/images/model1.png";
import model2 from "../assets/images/model2.png";
import model3 from "../assets/images/model3.png";
import model4 from "../assets/images/model4.png";
import model5 from "../assets/images/model5.png";

const slides = [
  {
    id: 0,
    image: model1,
    title: "Cozy Knitwear",
    season: "01 · WINTER",
    heading: "Cozy Knitwear",
    description: "Soft forms, warm textures and effortless winter style."
  },
  {
    id: 1,
    image: model2,
    title: "The White Wave",
    season: "02 · ELEGANCE",
    heading: "The White Wave",
    description: "Minimal silhouettes created for a timeless look."
  },
  {
    id: 2,
    image: model3,
    title: "Active Edit",
    season: "03 · ACTIVE",
    heading: "Active Edit",
    description: "Modern movement meets effortless everyday fashion."
  },
  {
    id: 3,
    image: model4,
    title: "Evening Gown",
    season: "04 · EVENING",
    heading: "Evening Gown",
    description: "Elegant evening pieces with a refined silhouette."
  },
  {
    id: 4,
    image: model5,
    title: "Street Layers",
    season: "05 · STREET",
    heading: "Street Layers",
    description: "Edgy denim and modern cuts for the urban explorer."
  }
];

function Home() {
  const [active, setActive] = useState(2);
  const [boxShape, setBoxShape] = useState("arch"); // 'arch' | 'sculpted' | 'capsule'
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") previousSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide]);

  // Auto-slide when user is not hovering
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const getPosition = (index) => {
    let position = index - active;

    if (position > 2) {
      position -= slides.length;
    }

    if (position < -2) {
      position += slides.length;
    }

    return position;
  };

  return (
    <main className="fashion-page">
      {/* HEADER */}
      <header className="top-header">
        <div className="logo">LUMIÈRE</div>

        {/* Display Box Shape Switcher */}
        <div className="shape-switcher-bar">
          <span className="shape-label">DISPLAY SHAPE:</span>
          <div className="shape-pills">
            <button
              className={`shape-pill ${boxShape === "arch" ? "active" : ""}`}
              onClick={() => setBoxShape("arch")}
              title="Architectural Arch Shape"
            >
              <span className="shape-icon">⌢</span> Arch
            </button>
            <button
              className={`shape-pill ${boxShape === "sculpted" ? "active" : ""}`}
              onClick={() => setBoxShape("sculpted")}
              title="Asymmetric Sculpted Shape"
            >
              <span className="shape-icon">⬡</span> Sculpted
            </button>
            <button
              className={`shape-pill ${boxShape === "capsule" ? "active" : ""}`}
              onClick={() => setBoxShape("capsule")}
              title="Modern Capsule Shape"
            >
              <span className="shape-icon">▢</span> Capsule
            </button>
          </div>
        </div>

        <div className="header-right">
          <span>COLLECTION 2026</span>
          <span className="menu-dot">•••</span>
        </div>
      </header>

      {/* MAIN CAROUSEL SECTION */}
      <section
        className="carousel-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* LEFT SIDE CARD CHANGE BUTTON */}
        <button
          className="side-change-btn side-prev-btn"
          onClick={previousSlide}
          aria-label="Previous card (Left side change)"
          title="Previous Model"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* 3D CAROUSEL (BOTH SIDES SHOWN) */}
        <div className="carousel">
          {slides.map((slide, index) => {
            const position = getPosition(index);

            const isActive = position === 0;
            const isLeft = position < 0;
            const isRight = position > 0;

            return (
              <motion.div
                key={slide.id}
                className={`model-card ${
                  isActive ? "active-model" : ""
                } ${isLeft ? "left-model" : ""} ${
                  isRight ? "right-model" : ""
                }`}
                animate={{
                  x:
                    position === 0
                      ? 0
                      : position === -1
                      ? -225
                      : position === 1
                      ? 225
                      : position === -2
                      ? -390
                      : 390,

                  scale:
                    position === 0
                      ? 1
                      : position === -1 || position === 1
                      ? 0.74
                      : 0.54,

                  rotateY:
                    position === 0
                      ? 0
                      : position === -1
                      ? 18
                      : position === 1
                      ? -18
                      : position === -2
                      ? 28
                      : -28,

                  opacity:
                    position === 0
                      ? 1
                      : position === -1 || position === 1
                      ? 0.82
                      : 0.5,

                  zIndex: position === 0 ? 10 : 6 - Math.abs(position)
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1]
                }}
                onClick={() => setActive(index)}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  draggable="false"
                  className="model-img"
                />
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDE CARD CHANGE BUTTON */}
        <button
          className="side-change-btn side-next-btn"
          onClick={nextSlide}
          aria-label="Next card (Right side change)"
          title="Next Model"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* RIGHT INFORMATION DISPLAY BOX */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[active].id}
            className={`info-card shape-${boxShape}`}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.94
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.94
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {/* Top decorative arch accent */}
            <div className="card-top-accent">
              <span className="accent-dot">✦</span>
              <span className="small-number">{slides[active].season}</span>
            </div>

            <h1>{slides[active].heading}</h1>

            <p>{slides[active].description}</p>

            <button className="explore-btn">
              <span>EXPLORE</span>
              <span className="btn-arrow">↗</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-navigation">
        <button
          className="arrow-btn"
          onClick={previousSlide}
          title="Previous"
        >
          ←
        </button>

        <div className="slide-buttons">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              className={active === idx ? "selected" : ""}
              onClick={() => setActive(idx)}
            >
              {s.title}
            </button>
          ))}
        </div>

        <button
          className="arrow-btn"
          onClick={nextSlide}
          title="Next"
        >
          →
        </button>
      </div>

      {/* SLIDE COUNTER */}
      <div className="counter">
        <span>0{active + 1}</span>
        <div className="counter-line"></div>
        <span>0{slides.length}</span>
      </div>
    </main>
  );
}

export default Home;