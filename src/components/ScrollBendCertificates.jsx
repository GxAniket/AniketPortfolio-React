
"use client";

import { useEffect, useState } from "react";
import "./ScrollBendCertificates.css";

const certificates = [
  {
    title: "Amazon Full Stack Web Development",
    category: "WEB DEVELOPMENT",
    image: "/certificates/amazon-fullstack.png.png",
  },
  {
    title: "Amazon Fundamentals of Java",
    category: "PROGRAMMING",
    image: "/certificates/amazon-java.png",
  },
  {
    title: "IBM Machine Learning with Python",
    category: "MACHINE LEARNING",
    image: "/certificates/ibm-ml.png",
  },
  {
    title: "Infosys DSA Using Java",
    category: "DATA STRUCTURES & ALGORITHMS",
    image: "/certificates/DSA-infosys.png",
  },
  {
    title: "YBI Foundation Internship",
    category: "INTERNSHIP",
    image: "/certificates/ybi-internship.png.png",
  },
  {
    title: "ThinkNEXT Java Internship",
    category: "JAVA DEVELOPMENT",
    image: "/certificates/thinknext-java.png.png",
  },
  {
    title: "Oasis Infobyte Internship",
    category: "INTERNSHIP",
    image: "/certificates/oasis-infobyte.png",
  },
  {
    title: "Prompt and Profit AI Hackathon",
    category: "AI HACKATHON",
    image: "/certificates/prompt-profit-hackathon.png.png",
  },
  {
    title: "HackerRank Achievement",
    category: "PROGRAMMING",
    image: "/certificates/hackerrank.png",
  },
];

export default function ScrollBendCertificates() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const activeCertificate = certificates[activeIndex];

  const changeCertificate = (index) => {
    if (index === activeIndex) return;

    setImageLoaded(false);
    setImageError(false);
    setActiveIndex(index);
    setTimerKey((key) => key + 1);
  };

  const goToPrevious = () => {
    changeCertificate(
      (activeIndex - 1 + certificates.length) % certificates.length
    );
  };

  const goToNext = () => {
    changeCertificate(
      (activeIndex + 1) % certificates.length
    );
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setImageLoaded(false);
      setImageError(false);

      setActiveIndex((current) =>
        (current + 1) % certificates.length
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPlaying, timerKey]);

  return (
    <section className="cinema-certificates">

      {/* HEADER */}
      <header className="cinema-header">
        <div className="cinema-eyebrow">
          <span className="cinema-line" />
          MY ACHIEVEMENTS
          <span className="cinema-line" />
        </div>

        <h2 className="cinema-heading">
          Certificates<span>.</span>
        </h2>

        <p className="cinema-description">
          A journey of continuous learning and growth.
        </p>
      </header>

      {/* CERTIFICATE DISPLAY */}
      <div className="cinema-display">

        <div className="cinema-image-stage" key={activeIndex}>
          <div className="cinema-image-glow" />

          {!imageLoaded && !imageError && (
            <div className="cinema-loading">
              <span className="cinema-spinner" />
              Loading certificate...
            </div>
          )}

          {imageError ? (
            <div className="cinema-error">
              <span>!</span>
              <p>Certificate image could not be loaded.</p>
              <small>{activeCertificate.image}</small>
            </div>
          ) : (
            <img
              src={activeCertificate.image}
              alt={activeCertificate.title}
              className={`cinema-certificate-image ${
                imageLoaded ? "loaded" : ""
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageLoaded(false);
                setImageError(true);
              }}
            />
          )}

          {/* CORNER DETAILS */}
          <span className="cinema-corner top-left" />
          <span className="cinema-corner top-right" />
          <span className="cinema-corner bottom-left" />
          <span className="cinema-corner bottom-right" />
        </div>

        {/* CERTIFICATE DETAILS */}
        <div className="cinema-information" key={`info-${activeIndex}`}>

          <div className="cinema-info-left">
            <span className="cinema-category">
              {activeCertificate.category}
            </span>

            <h3>{activeCertificate.title}</h3>
          </div>

          <div className="cinema-number">
            <strong>
              {String(activeIndex + 1).padStart(2, "0")}
            </strong>

            <span>
              / {String(certificates.length).padStart(2, "0")}
            </span>
          </div>

        </div>
      </div>

      {/* BOTTOM CONTROLS */}
      <footer className="cinema-controls">

        <div className="cinema-navigation">

          <button
            type="button"
            className="cinema-nav-button"
            onClick={goToPrevious}
            aria-label="Previous certificate"
          >
            <span className="cinema-nav-arrow">←</span>
            <span>PREVIOUS</span>
          </button>

          <button
            type="button"
            className="cinema-nav-button"
            onClick={goToNext}
            aria-label="Next certificate"
          >
            <span>NEXT</span>
            <span className="cinema-nav-arrow">→</span>
          </button>

        </div>

        <button
          type="button"
          className="cinema-play"
          onClick={() => setIsPlaying((value) => !value)}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          <span>{isPlaying ? "Ⅱ" : "▶"}</span>
          {isPlaying ? "PAUSE" : "PLAY"}
        </button>

      </footer>

    </section>
  );
}
