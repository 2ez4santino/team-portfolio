import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const strengthCards = [
  {
    title: 'Interface Design',
    text: 'I enjoy building layouts that feel clear, structured, and easy to explore on both desktop and mobile.',
  },
  {
    title: 'Frontend Development',
    text: 'My focus is turning ideas into responsive, functional interfaces using modern web tools and clean code.',
  },
  {
    title: 'User Experience',
    text: 'I pay attention to how people move through a page so the experience stays smooth, readable, and intuitive.',
  },
];

const featuredWork = [
  {
    name: 'Team Portfolio Website',
    description: 'A collaborative web portfolio with a futuristic visual style, team showcase, and personal profile routing.',
  },
  {
    name: 'Responsive Frontend Concepts',
    description: 'Interface experiments centered on clean layouts, readable content, and adaptable components.',
  },
  {
    name: 'Creative React Pages',
    description: 'Interactive pages built to balance strong visual presentation with practical user experience.',
  },
];

const tools = ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Design', 'UI Development'];

export default function AlfonsoPortfolio() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="page portfolio-page alfonso-portfolio">
      <section className="alfonso-hero">
        <div className="alfonso-hero-copy">
          <p className="portfolio-kicker">Alfonso Ragadio</p>
          <h1 className="alfonso-title">
            Frontend developer creating
            <span> clean digital experiences.</span>
          </h1>
          <p className="alfonso-lead">
            I build interfaces that are readable, responsive, and visually polished. My goal is to create
            web experiences that feel modern while staying easy to use.
          </p>

          <div className="alfonso-stats">
            <div className="alfonso-stat card">
              <span className="alfonso-stat-value">UI</span>
              <span className="alfonso-stat-label">Interface-driven work</span>
            </div>
            <div className="alfonso-stat card">
              <span className="alfonso-stat-value">React</span>
              <span className="alfonso-stat-label">Preferred frontend stack</span>
            </div>
            <div className="alfonso-stat card">
              <span className="alfonso-stat-value">Clean</span>
              <span className="alfonso-stat-label">Readable structure first</span>
            </div>
          </div>
        </div>

        <aside className="alfonso-profile card">
          <div className="alfonso-profile-photo team-photo-frame">
            {!imageError ? (
              <img
                className="team-photo"
                src={`${process.env.PUBLIC_URL}/team/alfonso.jpg`}
                alt="Alfonso Santino P. Ragadio"
                onError={() => setImageError(true)}
              />
            ) : null}
            {imageError ? <span className="team-initials">AR</span> : null}
          </div>
          <p className="team-name">Alfonso Santino P. Ragadio</p>
          <p className="team-role">Frontend Developer</p>
          <p className="portfolio-copy">
            Focused on building responsive layouts, clean presentation, and user-friendly web interfaces.
          </p>
          <Link to="/about" className="portfolio-back-link">Back to team</Link>
        </aside>
      </section>

      <section className="alfonso-grid">
        <div className="alfonso-panel card">
          <p className="portfolio-kicker">About Me</p>
          <h3 className="portfolio-heading">Who I Am</h3>
          <p className="portfolio-copy">
            I am Alfonso Santino P. Ragadio, a frontend developer who enjoys building modern interfaces with
            structure, clarity, and visual consistency. I like turning ideas into working pages that feel simple,
            clean, and purposeful.
          </p>
          <p className="portfolio-copy">
            In projects, I value readable code, strong layout decisions, and an experience that feels intuitive
            from the first interaction.
          </p>
        </div>

        <div className="alfonso-panel card">
          <p className="portfolio-kicker">Strengths</p>
          <div className="alfonso-strength-list">
            {strengthCards.map((item) => (
              <div className="alfonso-strength-item" key={item.title}>
                <h3 className="portfolio-heading">{item.title}</h3>
                <p className="portfolio-copy">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="alfonso-panel card alfonso-panel-wide">
          <p className="portfolio-kicker">Featured Work</p>
          <div className="alfonso-project-list">
            {featuredWork.map((project) => (
              <article className="alfonso-project-item" key={project.name}>
                <h3 className="portfolio-heading">{project.name}</h3>
                <p className="portfolio-copy">{project.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="alfonso-panel card alfonso-panel-wide">
          <p className="portfolio-kicker">Tools & Skills</p>
          <div className="portfolio-skills">
            {tools.map((skill) => (
              <span className="tag" key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="alfonso-contact card">
        <p className="portfolio-kicker">Next Step</p>
        <h3 className="portfolio-heading">Let&apos;s Build Something Better</h3>
        <p className="portfolio-copy">
          This area can later hold your contact details, email address, social links, or a short message for recruiters and collaborators.
        </p>
        <p className="alfonso-contact-note">You can now edit this file directly and make it fully your own.</p>
      </section>
    </div>
  );
}
