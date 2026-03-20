import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showRsvpNotice, setShowRsvpNotice] = useState(false);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setShowRsvpNotice(true);
    e.currentTarget.reset();
    window.setTimeout(() => {
      setShowRsvpNotice(false);
    }, 2600);
  };

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

        <details className="wedding-activity-shell">
          <summary className="wedding-activity-toggle">Show wedding invitation</summary>
          <article className="wedding-invitation" aria-label="Wedding invitation RSVP">
            <span className="wedding-geo-frame frame-one" aria-hidden="true" />
            <span className="wedding-geo-frame frame-two" aria-hidden="true" />
            <span className="wedding-rose-cluster rose-top-left" aria-hidden="true" />
            <span className="wedding-rose-cluster rose-bottom-right" aria-hidden="true" />

            <p className="wedding-invitation-kicker">Wedding RSVP</p>
            <p className="wedding-invitation-hosts">Together with their families</p>
            <h2 className="wedding-invitation-title">Maria and John</h2>
            <p className="wedding-invitation-details">
              Request the honor of your presence at their wedding celebration<br />
              Saturday, June 12, 2026 at 4:00 PM<br />
              1338 Arlegui St., Quiapo, Manila
            </p>

            <form className="wedding-rsvp-form" onSubmit={handleRsvpSubmit}>
              <label className="wedding-rsvp-field">
                Full Name
                <input type="text" name="guestName" placeholder="Enter your full name" required />
              </label>

              <label className="wedding-rsvp-field">
                Email Address
                <input type="email" name="guestEmail" placeholder="you@example.com" required />
              </label>

              <fieldset className="wedding-rsvp-choice" aria-label="Attendance confirmation">
                <legend>Will you attend?</legend>
                <label>
                  <input type="radio" name="attendance" value="yes" required />
                  Yes, I will attend
                </label>
                <label>
                  <input type="radio" name="attendance" value="no" required />
                  Sorry, I cannot attend
                </label>
              </fieldset>

              <label className="wedding-rsvp-field">
                Message (Optional)
                <textarea name="guestMessage" rows="3" placeholder="Leave a short message for the couple" />
              </label>

              <button type="submit" className="wedding-rsvp-submit">Send RSVP</button>
            </form>

            {showRsvpNotice ? (
              <p className="wedding-rsvp-notice" role="status" aria-live="polite">
                Thank you. Your response has been received.
              </p>
            ) : null}
          </article>
        </details>
      </div>

    </section>
  );
}
