"use client";

const heights = [28, 36, 44, 52, 60, 68, 76, 84, 90, 95, 98, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 98, 95, 90, 84, 76, 68, 60, 52, 44, 36, 28];

export default function HeroSpectrum() {
  return (
    <div className="hero-spectrum" aria-hidden="true">
      <div className="hero-spectrum__canvas">
        {heights.map((h, i) => (
          <div key={i} className="hero-spectrum__column" style={{ height: `${h}%` }}>
            <div className="hero-spectrum__band hero-spectrum__band--rose" />
            <div className="hero-spectrum__band hero-spectrum__band--orange" />
            <div className="hero-spectrum__band hero-spectrum__band--blue" />
          </div>
        ))}
      </div>
      <div className="hero-spectrum__wash" />
    </div>
  );
}
