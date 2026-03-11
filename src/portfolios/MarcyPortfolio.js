import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const featuredProjects = [
  'Collaborative web projects with strong implementation focus',
  'Efficient solutions for interface and workflow problems',
  'Frontend development with practical team-based execution',
];

const coreSkills = ['React', 'Web Development', 'Problem Solving', 'Team Collaboration'];

export default function MarcyPortfolio() {
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
          <p className="hero-label">// PERSONAL_PORTFOLIO :: MARCY</p>
          <h2 className="section-title">Marcy Angelo Villegas</h2>
          <p className="section-subtitle">Web developer with a practical approach to efficient and collaborative solutions.</p>
        </div>
      </div>

      <div className="portfolio-layout">
        <section className="portfolio-main card">
          <p className="portfolio-kicker">Introduction</p>
          <h3 className="portfolio-heading">About Me</h3>
          <p className="portfolio-copy">
            This page is Marcy's personal portfolio section inside the team website. You can edit this file directly
            and replace the content with your personal background, experience, and achievements.
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
                src="/team/marcy.jpg"
                alt="Marcy Angelo Villegas"
                onError={() => setImageError(true)}
              />
            ) : null}
            {imageError ? <span className="team-initials">MV</span> : null}
          </div>
          <p className="team-name">Marcy Angelo Villegas</p>
          <p className="team-role">Web Developer</p>
          <p className="portfolio-copy">
            Use this area for contact details, certifications, development tools, or short professional highlights.
          </p>
          <Link to="/about" className="portfolio-back-link">Back to team</Link>
        </aside>
      </div>
    </div>
  );
}
