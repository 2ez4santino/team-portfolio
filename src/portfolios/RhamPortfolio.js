import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const featuredProjects = [
  'Creative interface concepts with polished presentation',
  'Frontend work that balances design and usability',
  'User-friendly digital experiences with strong visual identity',
];

const coreSkills = ['Creative Development', 'Frontend Design', 'Visual Polish', 'User Experience'];

export default function RhamPortfolio() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="page portfolio-page">
      <div className="page-header">
        <div className="page-graphics" aria-hidden="true">
          <div className="page-scan-line" />
          <span className="page-shape ps1">◈</span>
          <span className="page-shape ps2">◇</span>
          <span className="page-shape ps3">⬡</span>
          <span className="page-shape ps4">▲</span>
        </div>
        <div className="page-hud">
          <span className="hud-corner top-left" />
          <span className="hud-corner top-right" />
          <span className="hud-corner bot-left" />
          <span className="hud-corner bot-right" />
          <p className="hero-label">// PERSONAL_PORTFOLIO :: RHAM</p>
          <h2 className="section-title">Rham Ponce</h2>
          <p className="section-subtitle">Creative developer blending technical skill with design-focused execution.</p>
        </div>
      </div>

      <div className="portfolio-layout">
        <section className="portfolio-main card">
          <p className="portfolio-kicker">Introduction</p>
          <h3 className="portfolio-heading">About Me</h3>
          <p className="portfolio-copy">
            This page is Rham's personal portfolio section inside the team website. You can personalize it by editing
            this file with your own projects, skills, education, and design approach.
          </p>

          <h3 className="portfolio-heading">Featured Work</h3>
          <ul className="portfolio-list">
            {featuredProjects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="portfolio-heading">Skills</h3>
          <div className="portfolio-skills">
            {coreSkills.map((skill) => (
              <span className="tag" key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <aside className="portfolio-side card">
          <div className="portfolio-photo team-photo-frame">
            {!imageError ? (
              <img
                className="team-photo"
                src="/team/rham.jpg"
                alt="Rham Ponce"
                onError={() => setImageError(true)}
              />
            ) : null}
            {imageError ? <span className="team-initials">RP</span> : null}
          </div>
          <p className="team-name">Rham Ponce</p>
          <p className="team-role">Creative Developer</p>
          <p className="portfolio-copy">
            Use this side section for quick profile details, strengths, social links, or any personal information you want to highlight.
          </p>
          <Link to="/about" className="portfolio-back-link">Back to team</Link>
        </aside>
      </div>
    </div>
  );
}
