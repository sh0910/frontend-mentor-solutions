const cars = [
  {
    type: "Sedans",
    desc: "Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip.",
    img: "./images/icon-sedans.svg",
    color: "#e38826",
  },
  {
    type: "SUVs",
    desc: "Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures.",
    img: "./images/icon-suvs.svg",
    color: "#006970",
  },
  {
    type: "Luxury",
    desc: "Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style.",
    img: "./images/icon-luxury.svg",
    color: "#004241",
  },
];

export default function App() {
  return (
    <main>
      <Cars />
    </main>
  );
}

function Cars() {
  return (
    <div className="container">
      {cars.map((car) => (
        <div className="component" key={car.type}>
          <img src={car.img} className="icon" alt="{car.img} icon" />
          <h2>{car.type}</h2>
          <p>{car.desc}</p>
          <a href="#home" className="btn" style={{ color: `${car.color}` }}>
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
}
