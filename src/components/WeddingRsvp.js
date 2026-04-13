import React, { useEffect, useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';

const scheduleItems = [
  {
    time: '3:00 PM',
    title: 'Guest Arrival',
    description: 'Welcome drinks, soft music, and seating for the ceremony.',
  },
  {
    time: '4:00 PM',
    title: 'Ceremony',
    description: 'Exchange of vows in a candlelit garden setting.',
  },
  {
    time: '5:00 PM',
    title: 'Cocktail Hour',
    description: 'Canapés, signature drinks, and family portraits.',
  },
  {
    time: '6:30 PM',
    title: 'Dinner & Dancing',
    description: 'Reception dinner, speeches, and dancing under the lights.',
  },
];

const faqItems = [
  {
    question: 'What is the dress code?',
    answer: 'Formal garden attire. Elegant and comfortable works best for the evening.',
  },
  {
    question: 'Can I bring a guest?',
    answer: 'Please check the invitation details. The RSVP form will capture your guest count.',
  },
  {
    question: 'What API is used?',
    answer: 'This page uses EmailJS from the frontend to send RSVP submissions without a backend.',
  },
];

const travelNotes = [
  'Complimentary parking is available inside the campus grounds.',
  'Please arrive 30 minutes early for seating and check-in.',
  'The ceremony will begin promptly at 4:00 PM.',
];

const photoMoments = [
  'Welcome cocktails on the lawn',
  'Ceremony beneath the garden arch',
  'Dinner and toasts at sunset',
];

const weddingDate = new Date('2026-06-12T16:00:00+08:00');
const venueQuery = 'Technological Institute of the Philippines Manila, 938 Arlegui St., Quiapo, Manila, Philippines';
const fallbackVenueCoords = { lat: '14.60016', lon: '120.98757' };

function buildEmbedMapUrl(lat, lon) {
  const latitude = Number.parseFloat(lat);
  const longitude = Number.parseFloat(lon);
  const delta = 0.0045;
  const left = longitude - delta;
  const right = longitude + delta;
  const top = latitude + delta;
  const bottom = latitude - delta;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latitude}%2C${longitude}`;
}

const defaultFormState = {
  fullName: '',
  email: '',
  guestCount: '1',
  attendance: 'attending',
  dietaryNeeds: '',
  message: '',
};

export default function WeddingRsvp() {
  const [formState, setFormState] = useState(defaultFormState);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [mapState, setMapState] = useState({
    status: 'ready',
    lat: fallbackVenueCoords.lat,
    lon: fallbackVenueCoords.lon,
    label: venueQuery,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = Math.max(weddingDate.getTime() - now.getTime(), 0);

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);

      setTimeLeft({ days, hours, minutes });
    };

    updateCountdown();
    const timerId = window.setInterval(updateCountdown, 60000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadVenueMap = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(venueQuery)}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error('Map lookup failed');
        }

        const results = await response.json();
        if (!results.length) {
          throw new Error('No venue result');
        }

        const { lat, lon, display_name: displayName } = results[0];
        if (!cancelled) {
          setMapState({
            status: 'ready',
            lat,
            lon,
            label: displayName,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setMapState((current) => ({
            ...current,
            status: 'ready',
            label: venueQuery,
          }));
        }
      }
    };

    loadVenueMap();

    return () => {
      cancelled = true;
    };
  }, []);

  const dateLabel = useMemo(() => {
    return weddingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  const mapEmbedUrl = useMemo(
    () => buildEmbedMapUrl(mapState.lat, mapState.lon),
    [mapState.lat, mapState.lon],
  );

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'success',
        message: 'Your response has been recorded. We will follow up with the next steps soon.',
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          guest_name: formState.fullName,
          guest_email: formState.email,
          guest_count: formState.guestCount,
          attendance: formState.attendance,
          dietary_needs: formState.dietaryNeeds || 'None',
          message: formState.message || 'No additional message',
        },
        publicKey,
      );

      setStatus({
        type: 'success',
        message: 'Thank you. Your RSVP has been sent successfully.',
      });
      setFormState(defaultFormState);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'The RSVP could not be sent right now. Please try again later.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="wedding-page">
      <div className="wedding-page-backdrop" aria-hidden="true">
        <span className="wedding-orb orb-one" />
        <span className="wedding-orb orb-two" />
        <span className="wedding-orb orb-three" />
      </div>

      <div className="wedding-shell">
        <header className="wedding-hero card">
          <div className="wedding-hero-copy">
            <p className="wedding-kicker">You are invited</p>
            <h1>Maria &amp; John</h1>
            <p className="wedding-lead">
              We would be honored to celebrate our wedding day with you on a
              warm evening of vows, dinner, music, and dancing.
            </p>

            <figure className="wedding-hero-photo">
              <img
                src={`${process.env.PUBLIC_URL}/wedding/photo.jpg`}
                alt="The couple walking together outdoors in wedding attire"
              />
              <figcaption>
                A quiet moment from our engagement shoot.
              </figcaption>
            </figure>

            <div className="wedding-hero-meta">
              <span>{dateLabel}</span>
              <span>4:00 PM Ceremony</span>
              <span>TIP Manila, 938 Arlegui St., Quiapo, Manila</span>
            </div>

          </div>

          <aside className="wedding-countdown card-shell" aria-label="Countdown to wedding day">
            <p className="wedding-countdown-label">Countdown</p>
            <div className="wedding-countdown-grid">
              <div>
                <strong>{timeLeft.days}</strong>
                <span>Days</span>
              </div>
              <div>
                <strong>{timeLeft.hours}</strong>
                <span>Hours</span>
              </div>
              <div>
                <strong>{timeLeft.minutes}</strong>
                <span>Minutes</span>
              </div>
            </div>
            <p className="wedding-countdown-note">A garden evening at Technological Institute of the Philippines Manila.</p>
          </aside>
        </header>

        <div className="wedding-content-grid">
          <section className="wedding-panel card" id="details">
            <p className="wedding-section-label">The celebration</p>
            <h2>Event details</h2>
            <p>
              Join us for an intimate ceremony followed by dinner, live music,
              and dancing. The venue opens at 3:00 PM for guests arriving early.
            </p>

            <div className="wedding-info-list">
              <div>
                <span>Location</span>
                <strong>TIP Manila, 938 Arlegui St., Quiapo, Manila</strong>
              </div>
              <div>
                <span>Reception</span>
                <strong>Campus celebration hall</strong>
              </div>
              <div>
                <span>Photography</span>
                <strong>Unplugged ceremony, phones away</strong>
              </div>
            </div>

            <div className="wedding-map-block">
              <p className="wedding-map-caption">Venue map (API powered)</p>
              <div className="wedding-map-frame" role="img" aria-label={`Map preview of ${mapState.label}`}>
                {mapState.status === 'ready' ? (
                  <iframe
                    src={mapEmbedUrl}
                    title="TIP Manila location map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="wedding-map-fallback">Loading map...</div>
                )}
              </div>
              <a
                className="wedding-map-open"
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(venueQuery)}`}
                target="_blank"
                rel="noreferrer"
              >
                Open larger map
              </a>
            </div>
          </section>

          <section className="wedding-panel card">
            <p className="wedding-section-label">Schedule</p>
            <h2>Wedding day timeline</h2>
            <div className="wedding-timeline">
              {scheduleItems.map((item) => (
                <article key={item.time} className="wedding-timeline-item">
                  <span className="wedding-timeline-time">{item.time}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="wedding-story card">
          <div className="wedding-story-copy">
            <p className="wedding-section-label">Our note to guests</p>
            <h2>How we want the evening to feel</h2>
            <p>
              We are keeping the celebration warm, elegant, and relaxed. Think
              soft light, heartfelt speeches, and a dance floor that stays open
              late.
            </p>
          </div>

          <div className="wedding-story-grid">
            {photoMoments.map((moment) => (
              <div key={moment} className="wedding-story-item">
                <span className="wedding-story-tag">Moment</span>
                <strong>{moment}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="wedding-logistics card">
          <div>
            <p className="wedding-section-label">Travel notes</p>
            <h2>Getting there</h2>
            <p>
              We recommend arriving a little early so you can settle in before
              the ceremony starts.
            </p>
          </div>

          <ul className="wedding-logistics-list">
            {travelNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="wedding-rsvp card" id="rsvp-form">
          <div className="wedding-rsvp-copy">
            <p className="wedding-section-label">RSVP</p>
            <h2>Please reply by May 15, 2026</h2>
            <p>
              Let us know if you will attend, who you are bringing, and any
              dietary needs so we can plan the evening properly.
            </p>
          </div>

          <form className="wedding-form" onSubmit={handleSubmit}>
            <div className="wedding-field-grid">
              <label className="wedding-field">
                Full name
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={updateField}
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="wedding-field">
                Email address
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="wedding-field">
                Guest count
                <input
                  type="number"
                  name="guestCount"
                  min="1"
                  max="6"
                  value={formState.guestCount}
                  onChange={updateField}
                  required
                />
              </label>
              <label className="wedding-field">
                Dietary needs
                <input
                  type="text"
                  name="dietaryNeeds"
                  value={formState.dietaryNeeds}
                  onChange={updateField}
                  placeholder="Vegetarian, halal, none, etc."
                />
              </label>
            </div>

            <div className="wedding-attendance-group">
              <fieldset className="wedding-attendance">
                <legend>Will you attend?</legend>
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="attending"
                    checked={formState.attendance === 'attending'}
                    onChange={updateField}
                  />
                  Joyfully attending
                </label>
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="not-attending"
                    checked={formState.attendance === 'not-attending'}
                    onChange={updateField}
                  />
                  Sorry, cannot attend
                </label>
              </fieldset>

              <div className="wedding-attendance-summary">
                <strong>What we need from you</strong>
                <p>
                  Name, email, guest count, and a short note if you have
                  dietary needs or travel concerns.
                </p>
              </div>
            </div>

            <label className="wedding-field">
              Message for the couple
              <textarea
                name="message"
                rows="4"
                value={formState.message}
                onChange={updateField}
                placeholder="Leave a note, memory, or well wishes"
              />
            </label>

            <div className="wedding-form-actions">
              <button type="submit" className="wedding-submit-button" disabled={isSending}>
                {isSending ? 'Sending RSVP...' : 'Send RSVP'}
              </button>
              <Link to="/" className="wedding-back-link">Back to homepage</Link>
            </div>

            {status.type === 'success' ? (
              <p className="wedding-confirmation" role="status" aria-live="polite">
                {status.message}
              </p>
            ) : null}

            {status.type === 'error' ? (
              <p className="wedding-error" role="alert">
                {status.message}
              </p>
            ) : null}
          </form>
        </section>

        <section className="wedding-faq card">
          <p className="wedding-section-label">Helpful notes</p>
          <h2>Frequently asked questions</h2>
          <div className="wedding-faq-list">
            {faqItems.map((item) => (
              <article key={item.question} className="wedding-faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}