import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">

      {/* Background graphics */}
      <div className="hero-graphics" aria-hidden="true">
        <div className="radar-ring ring-1" />
        <div className="radar-ring ring-2" />
        <div className="radar-ring ring-3" />
        <div className="scan-line" />
        <span className="float-shape s1">◈</span>
        <span className="float-shape s2">⬡</span>
        <span className="float-shape s3">◇</span>
        <span className="float-shape s4">▲</span>
        <span className="float-shape s5">◆</span>
        <span className="float-shape s6">⬟</span>
      </div>

      {/* HUD framed content */}
      <div className="hud-frame">
        <span className="hud-corner top-left" />
        <span className="hud-corner top-right" />
        <span className="hud-corner bot-left" />
        <span className="hud-corner bot-right" />

        <p className="hero-label">// TEAM_PORTFOLIO :: ONLINE</p>
        <h1>
          We build things<br />
          <span>that matter.</span>
        </h1>
        <p>
          We are a passionate team of developers and designers creating
          modern web experiences — from concept to deployment.
        </p>
        <div className="hero-buttons">
          <Link to="/about" className="cta-loader" aria-label="Click here to meet the team">
            <span className="cta-loader-top">
              <span className="cta-loader-label">Click here to meet the team</span>
            </span>
            <span className="cta-loader-track">
              <span className="cta-loader-fill" />
            </span>
          </Link>
        </div>
      </div>

    </section>
  );
}
