import Image from "next/image";
import { Clock3 } from "lucide-react";
import { site } from "@/lib/site";

const particles = [
  { className: "particle particle-one" },
  { className: "particle particle-two" },
  { className: "particle particle-three" },
  { className: "particle particle-four" },
  { className: "particle particle-five" },
];

function InstagramIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.862 21.07 9.75 14.25 21 3 3 10.5l5.25 1.875L18 6.75l-8.25 9.75.375 4.875 2.625-3.375Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85.01 1.71.12 2.51.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.65.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function ProfileCard() {
  return (
    <article className="profile-card">
      <div className="card-noise" aria-hidden="true" />

      <div className="profile-content">
        <div className="profile-photo-wrap">
          <div className="photo-ring" />
          <Image
            src={site.photo}
            alt={site.name}
            width={104}
            height={124}
            className="profile-photo"
            priority
          />
        </div>
        <div className="profile-heading">
          <p className="eyebrow">{site.role}</p>
          <h2>{site.name}</h2>
          <p className="profile-subtitle">{site.subtitle}</p>
        </div>
        <p className="profile-bio">{site.bio}</p>
        <p className="profile-projects">{site.projectsNote}</p>
      </div>

      <div className="card-footer">
        <span>{site.cardFooter}</span>
        <div className="social-links" aria-label="لینک‌های اجتماعی">
          <a
            href={site.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`تلگرام ${site.name}`}
          >
            <TelegramIcon />
          </a>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`گیت‌هاب ${site.name}`}
          >
            <GitHubIcon />
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`اینستاگرام ${site.name}`}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <main className="coming-soon-page">
      <div className="aurora aurora-blue" aria-hidden="true" />
      <div className="aurora aurora-red" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      {particles.map((particle) => (
        <span key={particle.className} className={particle.className} aria-hidden="true" />
      ))}

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <h1 id="page-title">
            {site.headline.map((line, index) => (
              <span key={line.text}>
                {index > 0 ? <br /> : null}
                {"accent" in line && line.accent ? <em>{line.text}</em> : line.text}
              </span>
            ))}
          </h1>
          <p className="hero-description">{site.description}</p>
          <div className="launch-note">
            <Clock3 size={16} />
            <span>{site.launchNote}</span>
          </div>
        </div>
        <ProfileCard />
      </section>

      <footer className="site-footer">
        <span>{site.copyright}</span>
      </footer>
    </main>
  );
}
