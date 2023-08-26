import React from "react";

const featuresArr = [
  {
    feature: "Supervisor",
    desc: "Monitors activity to identify project roadblocks",
    icon: "icon-supervisor.svg",
  },
  {
    feature: "Team Builder",
    desc: "Scans our talent network to create the optimal team for your project",
    icon: "icon-team-builder.svg",
  },
  {
    feature: "Karma",
    desc: "Regularly evaluates our talent to ensure quality",
    icon: "icon-karma.svg",
  },
  {
    feature: "Calculator",
    desc: "Uses data from past projects to provide better delivery estimates",
    icon: "icon-calculator.svg",
  },
];

export default function App() {
  const data = featuresArr;

  return (
    <div className="container">
      <Header />
      <Features data={data} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>
        Reliable, efficient delivery<span>Powered by Technology</span>
      </h1>
      <p>
        Our Artificial Intelligence powered tools use millions of project data
        points to ensure that your project is successful
      </p>
    </header>
  );
}

function Features({ data }) {
  return (
    <section className="features-container">
      <Feature data={data} />
    </section>
  );
}

function Feature({ data }) {
  return (
    <ul className="features">
      {data.map((feature, i) => (
        <li key={feature.feature} className={`feature feature-${i + 1}`}>
          <h2>{feature.feature}</h2>
          <p>{feature.desc}</p>
          <img src={`images/${feature.icon}`} alt={`${feature.feature} icon`} />
        </li>
      ))}
    </ul>
  );
}

function Footer() {
  return (
    <footer class="attribution">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noopener noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="https://github.com/sh0910">sh0910</a>.
    </footer>
  );
}
