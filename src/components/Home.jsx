import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../assets//style/style.css";

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

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, []);

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

        <div className="header-right">
          <span>COLLECTION 2026</span>
          <span className="menu-dot">•••</span>
        </div>
      </header>

      {/* MAIN CAROUSEL */}
      <section className="carousel-section">

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
                      ? -245
                      : position === 1
                      ? 245
                      : position === -2
                      ? -430
                      : 430,

                  scale:
                    position === 0
                      ? 1
                      : position === -1 || position === 1
                      ? 0.68
                      : 0.48,

                  rotateY:
                    position === 0
                      ? 0
                      : position < 0
                      ? 18
                      : -18,

                  opacity:
                    position === 0
                      ? 1
                      : position === -1 || position === 1
                      ? 0.75
                      : 0.35,

                  zIndex: position === 0 ? 10 : 5 - Math.abs(position)
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
                />
              </motion.div>
            );
          })}

        </div>

        {/* RIGHT INFORMATION CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[active].id}
            className="info-card"
            initial={{
              opacity: 0,
              x: 50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -30
            }}
            transition={{
              duration: 0.45
            }}
          >
            <span className="small-number">
              {slides[active].season}
            </span>

            <h1>{slides[active].heading}</h1>

            <p>{slides[active].description}</p>

            <button>
              EXPLORE
              <span>↗</span>
            </button>
          </motion.div>
        </AnimatePresence>

      </section>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-navigation">

        <button
          className="arrow-btn"
          onClick={previousSlide}
        >
          ←
        </button>

        <div className="slide-buttons">

          <button
            className={active === 0 ? "selected" : ""}
            onClick={() => setActive(0)}
          >
            Cozy Knitwear
          </button>

          <button
            className={active === 1 ? "selected" : ""}
            onClick={() => setActive(1)}
          >
            The White Wave
          </button>

          <button
            className={active === 2 ? "selected" : ""}
            onClick={() => setActive(2)}
          >
            Active Edit
          </button>

          <button
            className={active === 3 ? "selected" : ""}
            onClick={() => setActive(3)}
          >
            Evening Gown
          </button>

          <button
            className={active === 4 ? "selected" : ""}
            onClick={() => setActive(4)}
          >
            Street Layers
          </button>

        </div>

        <button
          className="arrow-btn"
          onClick={nextSlide}
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