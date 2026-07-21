import { useMemo, useState } from "react";

const ENVIRONMENTS = {
  earth: {
    name: "EVA Earth",
    short: "Retail and supply infrastructure for today's built environment.",
    problem:
      "Dense logistics still depend on manual movement across multifamily, retail, and campus loops. Operators need faster local orchestration.",
    icp:
      "Operators running high-frequency, short-range logistics in structured environments.",
    insight:
      "High-density corridors reward automation first and remove repetitive movement overhead.",
    solution:
      "EVA Earth unifies routing, autonomy, and telemetry into one terrestrial operating layer.",
    motif: "earth"
  },
  frontier: {
    name: "EVA Frontier",
    short: "Retail and supply infrastructure for remote and underserved regions.",
    problem:
      "Remote corridors have sparse infrastructure, dangerous movement, and low inventory visibility.",
    icp:
      "Operators in remote or off-grid regions with basic connectivity but no autonomy layer.",
    insight:
      "Autonomy is most valuable where infrastructure is weakest and movement is highest risk.",
    solution:
      "EVA Frontier extends routing, telemetry, and ruggedized orchestration into remote sites.",
    motif: "frontier"
  },
  moon: {
    name: "EVA Moon",
    short: "Mission-grade retail and supply infrastructure for extreme environments.",
    problem:
      "Lunar logistics are manual, high risk, and constrained by limited EVA windows.",
    icp:
      "NASA, CLPS, and lunar mission operators needing autonomous staging and delivery.",
    insight:
      "Mission-grade autonomy increases science output while reducing astronaut risk.",
    solution:
      "EVA Moon integrates hazard-aware planning, telemetry, and autonomous supply node logic.",
    motif: "moon"
  }
};

export default function EvaFrameworkApp() {
  const [view, setView] = useState("landing");
  const [envKey, setEnvKey] = useState("earth");
  const env = useMemo(() => ENVIRONMENTS[envKey], [envKey]);

  return (
    <main className="app-shell">
      <TopNav view={view} onNavigate={setView} />

      {view === "landing" && (
        <LandingPage
          onSelectEnvironment={(key) => {
            setEnvKey(key);
            setView("environment");
          }}
          onOpenEnvironment={() => setView("environment")}
        />
      )}

      {view === "environment" && (
        <EnvironmentPage
          env={env}
          onBack={() => setView("landing")}
          onNext={() => setView("architecture")}
        />
      )}

      {view === "architecture" && (
        <ArchitecturePage
          onBack={() => setView("environment")}
          onNext={() => setView("scaling")}
        />
      )}

      {view === "scaling" && (
        <ScalingPage
          onBack={() => setView("architecture")}
          onNext={() => setView("founder")}
        />
      )}

      {view === "founder" && (
        <FounderPage
          onBack={() => setView("scaling")}
          onNext={() => setView("contact")}
        />
      )}

      {view === "contact" && <ContactPage onBack={() => setView("landing")} />}
    </main>
  );
}

function TopNav({ view, onNavigate }) {
  const items = [
    ["Landing", "landing"],
    ["Environment", "environment"],
    ["Architecture", "architecture"],
    ["Scaling", "scaling"],
    ["Founder", "founder"],
    ["Contact", "contact"]
  ];

  return (
    <nav className="top-nav" aria-label="SPA navigation">
      <div className="brand">EVA Systems, LLC</div>
      <div className="nav-items">
        {items.map(([label, key]) => (
          <button
            key={key}
            className={`nav-btn ${view === key ? "is-active" : ""}`}
            onClick={() => onNavigate(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function LandingPage({ onSelectEnvironment, onOpenEnvironment }) {
  return (
    <section className="panel">
      <span className="kicker">Landing Page</span>
      <h1 className="hero-title">Adaptive retail and supply infrastructure.</h1>
      <p className="hero-sub">
        EVA responds to real-time demand across Earth, Frontier, and Moon.
      </p>
      <SelectScreen onSelectEnvironment={onSelectEnvironment} />
      <p className="cta-line">Choose an environment to continue</p>
      <button className="btn-primary" onClick={onOpenEnvironment} type="button">
        Open Environment Page
      </button>
    </section>
  );
}

function SelectScreen({ onSelectEnvironment }) {
  return (
    <div className="select-grid" aria-label="Select environment">
      <SelectCard
        name="Earth"
        subtitle="Built environment operations"
        motif="mini-earth"
        onClick={() => onSelectEnvironment("earth")}
      />
      <SelectCard
        name="Frontier"
        subtitle="Remote and underserved operations"
        motif="mini-frontier"
        onClick={() => onSelectEnvironment("frontier")}
      />
      <SelectCard
        name="Moon"
        subtitle="Extreme mission operations"
        motif="mini-moon"
        onClick={() => onSelectEnvironment("moon")}
      />
    </div>
  );
}

function SelectCard({ name, subtitle, motif, onClick }) {
  return (
    <article className="card" role="button" tabIndex={0} onClick={onClick}>
      <div className={`mini-visual ${motif}`} />
      <h3 className="card-title">{name}</h3>
      <p className="card-copy">{subtitle}</p>
    </article>
  );
}

function EnvironmentPage({ env, onBack, onNext }) {
  return (
    <section className="panel">
      <header className="cinematic-header">
        <span className="kicker">{env.name}</span>
        <h1 className="cinematic-title">{env.name} Environment</h1>
        <p className="cinematic-sub">{env.short}</p>
      </header>

      <div className="env-layout">
        <div className={`motif ${env.motif}`} aria-hidden="true" />
        <div className="structured-grid">
          <StructuredBlock label="Problem" copy={env.problem} />
          <StructuredBlock label="ICP" copy={env.icp} />
          <StructuredBlock label="Insight" copy={env.insight} />
          <StructuredBlock label="Solution" copy={env.solution} />
        </div>
      </div>

      <div className="section-actions">
        <button className="btn-secondary" onClick={onBack} type="button">
          Back to Landing
        </button>
        <button className="btn-primary" onClick={onNext} type="button">
          Next: Architecture
        </button>
      </div>
    </section>
  );
}

function StructuredBlock({ label, copy }) {
  return (
    <article className="structured-item">
      <div className="structured-label">{label}</div>
      <p className="structured-copy">{copy}</p>
    </article>
  );
}

function ArchitecturePage({ onBack, onNext }) {
  return (
    <section className="panel">
      <span className="kicker">Architecture</span>
      <h1 className="hero-title">Shared Core, Environment-Specific Execution</h1>
      <div className="diagram-placeholder">Diagram Placeholder</div>
      <p className="arch-list">
        Shared microservices run identity, orchestration, inventory, and policy.
        Environment adapters translate this core for Earth, Frontier, and Moon.
        Routing engines optimize pathing by terrain while telemetry engines unify
        operational visibility.
      </p>
      <div className="section-actions">
        <button className="btn-secondary" onClick={onBack} type="button">
          Back: Environment
        </button>
        <button className="btn-primary" onClick={onNext} type="button">
          Next: Scaling
        </button>
      </div>
    </section>
  );
}

function ScalingPage({ onBack, onNext }) {
  return (
    <section className="panel">
      <span className="kicker">Scaling Path</span>
      <h1 className="hero-title">Earth to Frontier to Moon</h1>
      <div className="progression" aria-label="Scaling progression graphic">
        <ProgressStep
          title="Earth"
          copy="Prove throughput and repeat demand in structured zones."
        />
        <ProgressStep
          title="Frontier"
          copy="Expand autonomy where infrastructure is sparse and risk is higher."
        />
        <ProgressStep
          title="Moon"
          copy="Deploy mission-grade logistics for planetary operations."
        />
      </div>
      <div className="section-actions">
        <button className="btn-secondary" onClick={onBack} type="button">
          Back: Architecture
        </button>
        <button className="btn-primary" onClick={onNext} type="button">
          Next: Founder
        </button>
      </div>
    </section>
  );
}

function ProgressStep({ title, copy }) {
  return (
    <article className="step">
      <div className="step-dot" />
      <h2 className="step-title">{title}</h2>
      <p className="step-copy">{copy}</p>
    </article>
  );
}

function FounderPage({ onBack, onNext }) {
  return (
    <section className="panel">
      <span className="kicker">Founder</span>
      <h1 className="hero-title">Founder-Led Execution</h1>
      <p className="founder-bio">
        Thomas J. Fanara is founder and CEO of EVA Systems, LLC, building an
        infrastructure-first platform that unifies retail, supply, and autonomy.
      </p>
      <div className="section-actions">
        <button className="btn-secondary" onClick={onBack} type="button">
          Back: Scaling
        </button>
        <button className="btn-primary" onClick={onNext} type="button">
          Next: Contact
        </button>
      </div>
    </section>
  );
}

function ContactPage({ onBack }) {
  return (
    <section className="panel">
      <span className="kicker">Contact</span>
      <h1 className="hero-title">Contact EVA</h1>
      <p className="contact-copy">
        For investor and deployment conversations, contact EVA directly.
      </p>
      <div className="section-actions">
        <a className="btn-primary" href="mailto:tom.fanara@eva-systems.net">
          Contact EVA
        </a>
        <button className="btn-secondary" onClick={onBack} type="button">
          Back to Landing
        </button>
      </div>
    </section>
  );
}
