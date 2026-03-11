import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { team } from '../data/teamData';

function TeamCard({ member }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      className="team-card-link"
      to={member.route}
      aria-label={`Open ${member.name} portfolio`}
    >
      <div className="card" key={member.name}>
        <div className="team-avatar team-photo-frame">
          {!imageError ? (
            <img
              className="team-photo"
              src={member.image}
              alt={member.name}
              onError={() => setImageError(true)}
            />
          ) : null}
          {imageError ? <span className="team-initials">{member.initials}</span> : null}
        </div>
        <p className="team-name">{member.name}</p>
        <p className="team-role">{member.role}</p>
        <p className="team-bio">{member.bio}</p>
        <div className="team-card-footer">
          <span className="team-card-cta">Open portfolio ↗</span>
        </div>
      </div>
    </Link>
  );
}

export default function About() {
  return (
    <div className="page">

      {/* Futuristic page header */}
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
          <p className="hero-label">// CREW_MANIFEST :: LOADED</p>
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-subtitle">
            Three people. One shared goal — build great software.
          </p>
        </div>
      </div>

      <div className="cards-grid">
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}
